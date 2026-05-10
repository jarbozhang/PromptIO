# 字节 UI-TARS-desktop 一夜 552 星，国产多模态 agent 桌面栈把 Computer Use 跑给你看

---
相关实体:: [[bytedance|字节跳动]] | [[volcano-engine|火山引擎]] | [[trycua|trycua]] | [[agent-desktop|agent-desktop]]
相关主题:: [[chinese-ai|国产 AI]] | [[agent-frameworks|Agent 框架]] | [[multimodal|多模态]] | [[computer-use-agent|Computer Use Agent]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->

---

5 月 10 日早上刷 GitHub Trending TypeScript 榜，bytedance/UI-TARS-desktop 一夜 +552 星，仓库总量已经 31.6k。这是字节 5 月里第二次大规模刷屏，上一次是 5/6 的 deer-flow。

我把它装到了自己的 Mac 上。这篇先讲清楚一件事，国内开发者要真想在桌面跑一个会自己点鼠标、看屏幕、敲键盘的 agent，2026 年这套方案到底能不能用。

## 它到底是什么

仓库 README 第一行写得很直白，"The Open-Source Multimodal AI Agent Stack，Connecting Cutting-Edge AI Models and Agent Infra"。翻译成人话，字节把模型和让 agent 在你电脑上跑起来需要的所有零件，打包放在一个 monorepo 里。

仓库里其实是两个东西。

一个叫 **UI-TARS Desktop**，原生 GUI Agent 桌面应用，跨平台支持 Windows、macOS 和浏览器。它能截屏、识别、控制鼠标和键盘，让你用一句中文或英文操作整个电脑。

另一个叫 **Agent TARS**，更通用的 agent 框架，带 CLI 和 Web UI，集成了 Hybrid Browser Agent 和 MCP servers，浏览器自动化、文件操作、命令行调用都在里面。

这两个东西共用一套 agent 基础设施，但你按需要选一个跑。我先装的是前者。

## 一边装一边踩坑

下载流程比想象中干净，仓库 release 页直接给 macOS 和 Windows 的安装包，pnpm workspace 管理源码。我没自己编译，直接用了预编译版。

第一次启动它会让你选 **Local Operator** 还是 **Remote Operator**。

Local Operator 是本地推理，模型权重和图像处理都在你自己机器上，README 里写"Private and secure，fully local processing"。Remote Operator 走云端 API，配 key 之后调远程模型。

本地能跑哪个模型，这是关键。字节自家的 **UI-TARS-1.5-7B** 和更大的 **UI-TARS-1.5** 都在 Hugging Face 上开源，专门为 GUI 操作训练过的视觉语言模型。我 M2 Pro 32G 内存跑 7B 量化版，截屏到执行的延迟在 4 秒上下，能用，但不算快。

云端这边是字节最舍得砸资源的地方。配置面板里官方支持的 provider 包括，

- **VolcEngine（火山引擎）**，doubao-1-5-thinking-vision-pro-250428，字节自家多模态模型
- **Anthropic**，claude-3-7-sonnet-latest
- **Seed-1.5-VL / 1.6**，字节研究院的视觉语言模型

我换成火山引擎的豆包 1.5 thinking vision pro 跑，延迟降到 1 秒级，识别按钮和文本框的准确度肉眼可见提升。火山的 token 计费比 Claude 便宜大约一个数量级，新用户还有免费额度，对国内开发者实测的成本压力小很多。

## 它给我点了什么

我让它做了一件无聊但能体现能力的事，"打开浏览器搜索 openclaw 的 GitHub 仓库，把 README 里的安装步骤复制到剪贴板"。

它的执行链是这样的，先截一张全屏，识别到 Dock 里的 Chrome 图标，点开，等页面加载完再截一次屏，找到地址栏，输入 github.com/openclaw，回车，进搜索结果页又截屏，定位到第一条结果，点进去，滚动到 README，框选，复制。

整个过程它在右侧面板实时显示自己在看什么、在想什么、要点哪里。这种"实时反馈和状态显示"是 README 强调的设计。中间它有一次把光标点到了广告位上，自己识别错了重新返回，这个错我后面手动复现没复现出来，可能跟当时的页面渲染有关。

## 跟之前两条桌面 agent 路线的差别

我们 4/27 写过 trycua，5/3 写过 agent-desktop。三条路线放在一起对比就清楚了。

**trycua** 走的是虚拟机沙箱路线，Lume 框架在 Mac 上起一台 macOS 虚拟机，agent 在沙箱里点鼠标，宿主机不受影响。安全性最高，门槛也最高，要 32G+ 内存。

**agent-desktop**（开源社区项目）偏轻量包装，把 Anthropic 的 Computer Use API 套了一层 Electron 壳，模型层完全依赖 Claude，国内访问成本是个问题。

**字节这套** 的差异化点在自带模型。UI-TARS-1.5-7B 本地能跑，火山引擎云端有 doubao 视觉模型直连，OpenRouter 也接得上。从模型可获得性这个维度，国内开发者第一次有了不绕远路就能调通的桌面 agent 方案。

## 我的判断

这一波字节开源三件套，5/6 deer-flow（research agent harness），5/10 UI-TARS-desktop（桌面 GUI agent），加上之前一直在迭代的 Seed 系列模型，很明显是在拼"agent 全栈"这个故事，而不是单点卷某一个模型。

桌面 agent 这条线 2025 年是 Anthropic 的 Computer Use 发布带火的，2026 年开始转向"国产+开源+本地"的组合。如果你之前观望过 trycua 但被门槛劝退，UI-TARS-desktop 现在更值得装一下试试。

不过别期待它现在就能替你干活。我跑下来感受是，单步任务（"帮我打开微信，给某某发一条消息"）能做对，多步任务（"整理这周的邮件并归类"）还会在第三第四步走偏。这跟模型能力有关，跟桌面元素的视觉识别精度有关，更跟 agent 框架本身的 planning 还不够稳健有关。

它现在是一个"可玩、可改、能给客户演示"的东西，不是一个"放心交给它一晚上"的东西。

## 行动建议

想动手试的两条路径，

- **零门槛**，去 [github.com/bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) release 页下载预编译安装包，配火山引擎 API key，10 分钟内能跑起来第一个任务
- **想本地化部署**，从 Hugging Face 拉 UI-TARS-1.5-7B 权重，启 vllm 本地服务，在 Desktop 应用里把 endpoint 指过去，断网也能跑

留个开放问题给评论区。如果你已经在用 trycua、agent-desktop 或 Anthropic Computer Use，会不会因为 UI-TARS 自带国产模型这一点切换过来？还是说桌面 agent 这个形态本身就还没到生产可用阶段？

## 相关链接

- 仓库地址，[github.com/bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop)
- 模型权重（HuggingFace），UI-TARS-1.5-7B
- 火山引擎控制台（豆包视觉模型 API），volcengine.com
- 我们之前覆盖过的同类，trycua（4/27）、agent-desktop（5/3）、deer-flow（5/6）

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
