# PyTorch Lightning 中招了，国内 ML 团队赶紧跑一遍自查

4 月 30 日下午，PyPI 上的 `lightning` 包发布了 2.6.2 和 2.6.3 两个版本。包名没问题，仓库地址没问题，下游训练脚本里 `pip install lightning` 一行不会触发任何警报。

问题出在导入那一刻，包里夹带的脚本会自动执行，把当前进程能摸到的几乎所有云凭据和 token 全部外泄。包很快被下架，但这段窗口期内做过 `pip install -U` 的 CI、训练机和实验集群，需要按事故响应流程过一遍。

这次攻击的代号是 Shai-Hulud，《沙丘》里的沙虫，2025 年下半年起一直在 npm 生态里横向蔓延。Semgrep 直接判断这次 PyPI 入侵和之前的活动是同一组人，区别只是换了生态。

## 它会偷走什么

载荷盘点凭据的范围很完整。

- GitHub token、npm token，按前缀正则匹配
- AWS、Azure、GCP 三大云的环境变量、本地凭据文件、元数据端点全扫一遍
- CI/CD pipeline secrets、GitHub Actions org secrets

外泄通道并行四条，确保至少一条能出去。除了直连 C2，还会把 base64 编码的 token 写进 GitHub commit message，走 GitHub 流量绕过企业防火墙。最隐蔽的一条是直接 push 到受害者自己已经认证过的仓库里，commit 前缀 `EveryBoiWeBuildIsAWormyBoi`。

凭据偷完之后还会留两个持久化钩子。一个写在 `.claude/settings.json` 的 SessionStart 里，下次启动 Claude Code 再跑一次。另一个写在 `.vscode/tasks.json` 的 `runOn: folderOpen` 里，下次打开 VS Code workspace 再跑一次。两个 IDE 都是 ML 工程师每天都在用的，命中率不低。

## 国内团队为什么是高危人群

PyTorch Lightning 在国内训练脚本里几乎是默认依赖，HF Trainer 替代方案、自研 trainer loop、lit-gpt/lit-llama 这些同源仓库都在用。

更关键的是，训练机上通常存放的 token 含金量太高。wandb token 能读整个团队的实验记录，HF token 能拉私有模型权重，对象存储 AK 能拖全部训练数据。任何一台训练机被穿透，就是整条 ML pipeline 的横向爆破入口。

## 自查清单（按顺序跑）

第一步，确认是否拉过受影响版本。每台训练机和 CI runner 上跑 `pip show lightning` 看版本号。命中 2.6.2 或 2.6.3 直接进第二步。即使没命中，也建议看一眼 `~/.cache/pip` 里有没有这两个 wheel 缓存。

第二步，检查持久化钩子。所有相关 workspace 根目录下检查 `.claude/settings.json` 是否多了 SessionStart hook，`.vscode/tasks.json` 是否多了 `runOn: folderOpen` 的可疑任务。命中即视为已感染机器，必须全凭据轮换。

第三步，扫 GitHub commit 历史。在每个相关组织和个人账号下，搜 commit message 含 `EveryBoiWeBuildIsAWormyBoi` 的记录，以及描述为 "A Mini Shai-Hulud has Appeared" 的新建仓库。GitHub Audit Log 能直接拉到。

第四步，凭据全量轮换。优先级：HF token、wandb token、对象存储 AK/SK（阿里云 OSS、腾讯云 COS、AWS S3 都查）、GitHub PAT、内部 GitLab token、CI 服务账号。云厂商临时密钥也要看 RAM/CAM 操作日志，确认有没有被异常调用过。

第五步，加固依赖管理。lock file 进版本控制，`requirements.txt` 改成 `pip-compile` 生成的全 hash 锁定文件，或者迁到 `uv` 用 `uv.lock`。pip 26.1 即将引入的 `--uploaded-prior-to=P1D` 参数可以把"刚发布的版本"延迟一天再纳入解析候选，对供应链攻击有非常直接的缓冲效果。

第六步，CI 层加扫描。Packj、pip-audit、osv-scanner 三选一接进 CI，重点看 setup.py 和 `__init__.py` 里的网络请求、子进程 spawn、文件系统写入。

## 我的判断

核心信号不在 lightning 本身，而是 Shai-Hulud 已经从 npm 跨过了 PyPI。下一个目标可能是 transformers、datasets、accelerate 这些 Hugging Face 系核心包，也可能是任何 import-time 没人审计的训练辅助库。

国内 ML 团队的依赖管理普遍偏松，不锁版本、不锁 hash、不带 cooldown 是常态。原因可以理解，模型迭代快、新版本性能优化频繁。但这次给了一个非常具体的反例，4 月 30 日下午一次 `pip install -U` 的成本是全凭据轮换加整条 pipeline 自查。训练机不再是隔离的研究环境，它接着对象存储、接着 GitHub、接着 wandb、接着内部 model registry，任何一环被穿透就是横向蔓延的起点。依赖管理水位线得抬一抬了。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
