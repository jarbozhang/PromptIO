# PyTorch Lightning 被 Shai-Hulud 主题恶意包污染，国内 ML 团队该跑一遍 audit

2026 年 4 月 30 日 UTC 12:45，PyPI 上的 `lightning` 包发布了 2.6.2 和 2.6.3 两个版本。包名没错，仓库地址没错，下游训练脚本里 `pip install lightning` 一行不会触发任何警报。问题出在导入阶段，`_runtime/start.py` 在被加载的瞬间执行了一个 14.8 MB 的混淆 JavaScript 载荷 `_runtime/router_runtime.js`，把当前进程能摸到的几乎所有云凭据和 token 全部外泄。

Lightning 维护者 Andy McSherry 在 Hacker News 上确认了发布时间。Semgrep 当天发布攻击链分析。包很快被下架，但这段时间窗口里完成依赖更新的 CI 任务、本地训练机器和实验集群，需要按事故响应流程走一遍 audit。

## 攻击链还原

恶意载荷分两段。Python 加载器只做一件事，把附带的 JS 载荷拉起来执行。这是 Shai-Hulud 系列攻击的标志性手法，先用宿主语言的 import-time 副作用作为脚手架，真正的 payload 写在另一个语言生态里规避静态扫描。

JS 载荷盘点凭据的范围非常完整，

- GitHub token，按 `ghp_`、`gho_` 前缀正则匹配
- npm token，按 `npm_` 前缀匹配
- AWS，扫环境变量、`~/.aws/credentials`、IMDSv2 端点、ECS 容器凭据端点，并主动调用 `sts:GetCallerIdentity` 验证
- Azure，走 DefaultAzureCredential 链，再去 Key Vault 拉 secret
- GCP，走 GoogleAuth，去 Secret Manager 拉 secret
- 通用环境变量、CI/CD pipeline secrets、GitHub Actions org secrets

外泄通道一共四条并行执行，确保至少一条能出去。一条是直连 C2，HTTPS POST 到 443 端口，这是最容易被企业出网代理拦掉的路径。第二条是 GitHub commit 搜索死信箱，把双层 base64 编码的 token 写进 commit message，C2 端用 GitHub 搜索 API 拉取，这条路径完全走 GitHub 流量，企业 firewall 通常不会拦。第三条是攻击者控制的公开 GitHub 仓库，仓库描述统一是 "A Mini Shai-Hulud has Appeared"。第四条更隐蔽，直接 push 到受害者自己已经认证过的 GitHub 仓库里，留下一个 `EveryBoiWeBuildIsAWormyBoi` 前缀的 commit。

凭据出去之后，载荷顺手装了两个持久化钩子。一个是 `.claude/settings.json` 里的 SessionStart hook，下次启动 Claude Code 时再执行一次。另一个是 `.vscode/tasks.json` 里 `runOn: folderOpen` 的任务，下次用 VS Code 打开这个 workspace 时再执行一次。两个 IDE 都是 ML 工程师工作流的核心，命中率不低。

## Shai-Hulud 主题为什么落到 PyPI

Shai-Hulud 是《沙丘》里的沙虫，2025 年下半年起被一个威胁组用作 npm 蠕虫攻击的代号，特征是横向蔓延、用 Dune 小说里的角色和咒语命名变量。Semgrep 在文章里直接判断这次 PyPI 入侵和之前的 mini Shai-Hulud 活动是同一组人，区别只是这次换了生态。

为什么换 PyPI。HN 评论里有几条值得注意的判断。`crabbone` 指出 Python 包的执行模型比 npm 更宽松，"`pip install` 阶段没人检查 setup.py，包也不在本地构建沙箱里，几乎所有人都直接在生产机上跑 `pip install`"。`petjuh` 进一步对比，npm 历史上一直需要手动 `npm install`，PyPI 在 CI 自动化普及之后被动放大了攻击面。`michaelt` 总结得更直接，"自动更新和 CI 工具已经达到临界饱和度，供应链攻击就是在押注 pipeline 无脑 auto-update"。

PyPI 至今没有强制 publisher 二步认证，这是 `lostmsu` 反复提的痛点。npm 在 2022 年之后开始推强制 2FA，PyPI 只对 top 项目做了类似要求，长尾仍然是裸账号。lightning 这个名字虽然下游用得多，但 PyPI 上由谁发布、发布权限谁管，不在大多数下游用户的视野里。

## 国内 ML 团队为什么需要立刻自查

PyTorch Lightning 在国内的渗透率不需要论证。从 Hugging Face 训练脚本、HF Trainer 的替代方案，到自研模型的 trainer loop，再到 LLM 微调（lit-gpt、lit-llama 等同源仓库），lightning 都是默认依赖。问题是大量代码并不直接 `import lightning`，而是通过 `pytorch_lightning` 老命名空间或者第三方包间接引入，pinning 不严格的项目在 4 月 30 日到下架之间的窗口内做过 `pip install -U` 都有风险。

更关键的是，lightning 的典型使用场景是训练机，训练机上通常存放 wandb token、Hugging Face token、对象存储 AK/SK、内部 GitLab/GitHub access token、模型 artifact 上传凭据。这些 token 一旦泄漏，影响范围不止本机，是整条 ML pipeline 的横向爆破入口。wandb token 可以读取整个团队的实验记录，HF token 可以读私有模型权重，对象存储 AK 可以拖全部训练数据集。

## 自查清单

下面这套动作建议按顺序跑一遍，覆盖大部分国内团队的常见环境。

第一步，确认是否拉取过受影响版本。在每台训练机和 CI runner 上执行 `pip show lightning | grep -i version`，或者 `pip freeze | grep -i ^lightning==`。命中 2.6.2 或 2.6.3 直接进入第二步。即使没命中，也建议看一眼 `~/.cache/pip` 里是否留有这两个版本的 wheel 缓存，部分依赖解析路径会从缓存复用。

第二步，检查持久化钩子是否被植入。在所有相关 workspace 根目录下检查 `.claude/settings.json` 是否有 SessionStart hook，`.vscode/tasks.json` 是否有 `runOn: folderOpen` 的可疑任务。命中即视为已感染机器，需要全凭据轮换。

第三步，扫 GitHub commit 历史。在每个相关组织和个人账号下，搜索 commit message 包含 `EveryBoiWeBuildIsAWormyBoi` 的 commit，以及描述为 "A Mini Shai-Hulud has Appeared" 的新建仓库。GitHub 的 Audit Log 能直接拉到这两类事件。

第四步，凭据全量轮换。优先级从高到低，HF token、wandb token、对象存储 AK/SK（阿里云 OSS、腾讯云 COS、AWS S3 都需要查）、GitHub PAT、内部 GitLab token、CI 服务账号 token。云厂商的临时密钥（STS）也要确认有没有被用 `sts:GetCallerIdentity` 探过，腾讯云、阿里云控制台都有 RAM/CAM 操作日志可查。

第五步，加固依赖管理。lock file 要进版本控制，`requirements.txt` 改成 `pip-compile` 生成的全 hash 锁定文件，或者迁到 `uv` 用 `uv.lock`。HN 上 `notatallshaw` 提到 pip 26.1 即将引入的 `--uploaded-prior-to=P1D` 参数，可以把"刚发布的版本"延迟一天再纳入解析候选，对供应链攻击有非常直接的缓冲效果。`uv` 的 `exclude-newer` 配置等价。

第六步，CI 层面把 import-time side-effect 当成必须扫描项。Packj、pip-audit、osv-scanner 三选一接进 CI，重点检测 setup.py 和 `__init__.py` 里的网络请求、子进程 spawn、文件系统写入。Semgrep 自带的 supply chain 规则也能直接命中这次的 IOC。

## 几条值得记住的判断

这次攻击的核心信号不在 lightning 本身，而是 Shai-Hulud 主题已经从 npm 跨过了 PyPI 的护城河。下一个目标可能是 transformers、datasets、accelerate 这些 Hugging Face 系核心包，也可能是任何 import-time 没人审计的训练辅助库。

国内 ML 团队的依赖管理普遍偏松，requirements.txt 不锁版本、不锁 hash、不带 cooldown 是常态。原因可以理解，模型迭代快、新版本性能优化频繁、锁死依赖会拖慢迭代。但这次事件给了一个非常具体的反例，4 月 30 日下午到晚上做 `pip install -U` 的成本是凭据轮换+整条 pipeline 自查。

ML 工程的安全边界正在和软件工程趋同。训练机不再是隔离的研究环境，它接着对象存储、接着 GitHub、接着 wandb、接着内部 model registry。任何一环被穿透就是横向蔓延起点。`crabbone` 那句"几乎所有人都直接在生产机上跑 pip install"是这个生态的真实写照，也是为什么这类攻击的 ROI 会持续走高。

## 相关链接

- Semgrep 攻击链分析，https://semgrep.dev/blog/2026/malicious-dependency-in-pytorch-lightning-used-for-ai-training/
- Hacker News 讨论串，https://news.ycombinator.com/item?id=47964617
- pip-audit，https://github.com/pypa/pip-audit
- osv-scanner，https://github.com/google/osv-scanner
- Packj 行为分析工具，https://github.com/ossillate-inc/packj
- uv exclude-newer 配置，https://docs.astral.sh/uv/reference/settings/#exclude-newer

---
相关实体:: [[pytorch-lightning|PyTorch Lightning]] | [[semgrep|Semgrep]]
相关主题:: [[supply-chain-security|供应链安全]] | AI 训练基础设施 | ML 工程

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
