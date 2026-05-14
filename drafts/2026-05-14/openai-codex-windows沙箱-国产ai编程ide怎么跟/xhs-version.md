# OpenAI Codex on Windows 沙箱方案来了 国产 AI 编程 IDE 怎么跟

OpenAI 在 5 月 13 日发了一篇工程博客，标题朴素，叫《Building a safe, effective sandbox to enable Codex on Windows》。它解释了为什么 Codex 这套自主编程 agent 从 macOS 和 Linux 上线之后，等了几个月才登陆 Windows，以及他们为此凑出了哪些隔离原语。

这件事的意义不在功能新，而在补齐。Windows 用户终于有了官方的"安全跑 coding agent"方案，这是 Codex 第一次在主流桌面操作系统上做到三平台齐活。

对中国市场来说，这条信息的重要性被很多英文媒体低估了。国内开发者群体里，Windows 占比长期在 70% 以上。AI 编程 agent 这个赛道国产侧已经跑了一年（通义灵码、Trae、CodeBuddy、CodeGeeX），但大部分国产 IDE 还是把 agent 直接挂在用户进程里跑，并没有像 OpenAI 这次这么认真地解释"如何在 Windows 上把 agent 关进笼子里"。

## OpenAI 自己怎么说

博客里有一句话被 r/coding_agents 引用得最多。

> Windows did not hand us one primitive that cleanly maps to "safe autonomous coding agent." We composed several tools and concepts to build something coherent.

翻译，Windows 没有给我们任何一个能直接拿来当"安全 agent 沙箱"用的现成原语，我们是拼出来的。

这句话信息密度很高。它隐含承认了三件事，Codex 在 macOS 上用 Seatbelt，在 Linux 上用 Landlock + namespaces，落地都比 Windows 顺。Windows 这边他们要把 AppContainer、Job Object、文件系统过滤驱动、Server Silo 之类零件拼装起来，才能拿到等效的隔离粒度。OpenAI 在文中没有把这个组合包装成"Codex 专属沙箱框架"再开源，他们的目标只是让 agent 在 Windows 上能跑而且不会把用户的 D 盘删了。

OpenAI 另一篇配套的博客《Running Codex safely at OpenAI》在 5 月 8 日先发出来，视角是公司内部，讲的是 OpenAI 自己几千名工程师怎么把 Codex 接入日常工作流，沙箱、审批、网络策略、telemetry 是怎么编排的。两篇博客互为脚注，5 月 13 日这篇是 5 月 8 日那篇的"Windows 实施细节"。

## 沙箱到底拦了什么

把 OpenAI 的描述抽象一下，一个 coding agent 的危险动作集中在三层。

第一层，文件读写。Agent 可以写代码、删代码、改 `package.json`、覆盖 `.env`、写到系统目录、读你的浏览器 cookie。Windows 上控制这层的传统手段是 ACL，但 ACL 是给用户用的，不是给同一个用户运行的进程互相隔离用的。OpenAI 的做法是把 agent 进程限定在一个受控的命名空间，工作目录默认可写，工作目录之外默认拒绝，越界请求显式弹出审批。

第二层，网络出站。Agent 可能去 `pip install` 一个恶意包、去 `curl` 一个外部地址、把代码上传到不该上传的服务器。沙箱要做的是默认只允许列在白名单里的域名出站，对未声明的连接拦截。这一层在 Linux 上有 namespaces 加 iptables，在 Windows 上则要靠 Windows Filtering Platform 这一类内核态过滤组件，门槛比 Linux 高一个量级。

第三层，进程逃逸。Agent 起的子进程不应该有权限 fork 一个不受沙箱管的兄弟进程出来。Linux 上 cgroups 处理这层很自然，Windows 上对应的概念是 Job Object，把 agent 和它的所有子进程绑定在同一个 job 里，关一个全关。

OpenAI 没说他们具体用了哪几个 API 的组合，但行业内做这种隔离能用的原语就这么几样，AppContainer 出身于 UWP 应用模型，Job Object 是 NT 内核级的进程组，Server Silo 是 Windows 容器底层用的命名空间技术。从 Codex 既能在 Windows 11 跑、又不依赖 WSL2 来看，他们的实现是用户态用 AppContainer + Job Object 起骨架，内核态靠 WFP 类的钩子做网络拦截。

## 为什么 Windows 比 Linux 难做

这是 r/OpenAI 那条 144 赞帖子下面争论的核心。

主流情绪是，开发者圈子里 Windows 在系统编程层面长期被吐槽 API 老、文档散、抽象层次混乱。

但这件事也可以从另一个角度看。Linux 的 namespaces 和 Seatbelt 之所以能被"一个原语干一件事"地用起来，是因为 Linux 桌面的用户基础小、企业域管控诉求弱，安全模型演化路径更自由。Windows 背着上亿台企业终端、要兼容 Active Directory、要支持 EDR 厂商挂钩、要让杀毒软件能扫描进程，每一个隔离原语都要先过这些场景的兼容性测试。OpenAI 这次相当于在一个负重前行的操作系统上凿出了一条狭窄的隔离通道。

另一条评论说这有什么新鲜的。但其实有新鲜的，新鲜的是 OpenAI 把过程写出来了。过去几年 GitHub Copilot 也好、Cursor 也好，agent 在 Windows 上要么干脆不开沙箱、要么用 WSL2 兜底，没人公开拆解过"原生 Windows 上跑 coding agent"的工程方案。

## 国产 IDE 怎么跟

把视角切回国产侧。目前国内主流的 AI 编程 IDE，通义灵码、Trae、CodeBuddy、CodeGeeX，沙箱方案各自的取向不同。

通义灵码的 agent 模式是嵌入 VS Code 和 JetBrains 插件体系，agent 跑的工具调用复用宿主 IDE 的进程权限，沙箱粒度由 IDE 自身的工作目录限制提供。这条路的好处是兼容性极佳、和已有 IDE 生态零摩擦，代价是粒度粗。

Trae 走的是字节自己的全功能 IDE 路线，agent 行为有内置的工作区边界控制，但据用户反馈，对网络出站和子进程的限制还在迭代，更接近"用户工程默认行为"而不是"系统级沙箱"。CodeBuddy 和 CodeGeeX 的定位偏插件 + 云端 agent，本地侧只跑代码补全和轻工具调用，重 agent 任务一般丢到云沙箱跑。

国产 IDE 目前的隔离设计还是以"信任默认 + 工作目录边界"为主，对网络白名单和进程逃逸的拦截基本依赖云端兜底。OpenAI 这次把 Windows 本地沙箱做扎实，相当于把"本地跑 agent 才安全"这条路重新走通了一遍。如果国产 IDE 想接住 Windows 这块 70% 的盘子，本地沙箱不是一个可选项，是一个迟早要交的作业。

需要补一句，国产 IDE 的产品取向和 OpenAI 不完全一样。OpenAI 把 Codex 设计成 agent first、IDE 只是入口，所以沙箱必须做到位。国产 IDE 大多还是 IDE first、agent 是新功能，沙箱优先级低于补全质量和模型 router。这不是谁对谁错，是产品阶段不同。但等到国产 agent 也开始能自己跑测试、自己改三个文件、自己提交 PR，沙箱这一层就会被市场逼上来。

## 这条线值得继续追

短期看，Codex on Windows 这次发布对国内开发者的直接影响有限。Codex 服务在国内没有官方可访问路径，社区里能直接用上的人很少。但工程层面的意义是清楚的，它给国产 IDE 厂商立了一个可以照着抄的样板。

中期看，沙箱能力会成为 AI 编程 IDE 的分水岭。补全模型的差距正在被开源模型快速抹平（DeepSeek-V3、Qwen3-Coder、GLM-4 都在追赶），下一轮竞争会转向"我敢不敢让 agent 在你的真实工程里自己跑"。敢的前提是沙箱足够硬。

有一个观察值得留下。OpenAI 在博客最后没有把 Windows 沙箱做成一个独立产品或独立 SDK，而是直接焊在 Codex 里。这暗示着他们认为沙箱不是一个通用基础设施、而是 agent 产品的内核能力。这个判断如果是对的，那么 AI 编程 IDE 这个赛道未来的护城河之一就是"你能不能给企业客户证明你的 agent 跑起来不会把代码库搞坏"。

## 相关链接

- OpenAI 博客，Building a safe, effective sandbox to enable Codex on Windows，[openai.com/index/building-codex-windows-sandbox](https://openai.com/index/building-codex-windows-sandbox)
- OpenAI 博客，Running Codex safely at OpenAI，[openai.com/index/running-codex-safely](https://openai.com/index/running-codex-safely)
- Windows AppContainer 文档，[learn.microsoft.com](https://learn.microsoft.com/en-us/windows/win32/secauthz/appcontainer-isolation)
- Windows Filtering Platform 文档，[learn.microsoft.com](https://learn.microsoft.com/en-us/windows/win32/fwp/windows-filtering-platform-start-page)

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
