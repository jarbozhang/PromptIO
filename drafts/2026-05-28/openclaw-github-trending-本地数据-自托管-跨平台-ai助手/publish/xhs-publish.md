# 小红书发布包

## 标题
OpenClaw 跨平台个人 AI 助手，我最关心本地数据和自托管

## 正文
OpenClaw 出现在 GitHub Trending 里时，我第一反应不是又一个聊天壳，而是这三个词放在一起有点少见，本地数据、自托管、跨平台。

源材料给它的定位很直白，Your own personal AI assistant. Any OS. Any Platform. 项目是 TypeScript，仓库信息里显示 star 375123、fork 78221，创建于 2025-11-24，2026-05-28 还有 push。数字很夸张，所以我没有把它当成成熟度证明，只把它当成一个信号，很多人正在盯这类个人助手。

先把边界说清楚。本文为 AI 辅助整理，关键事实已按 GitHub 仓库和官方文档核对。我没有把 OpenClaw 接到真实个人聊天账号，也没有把它挂在手机上连续跑几天。这里的“我试了”，只指我把安装入口、Gateway 启动链路、渠道说明和安全文档逐项核了一遍。

所以，下面凡是我说“实测”，都是公开文档链路核验。凡是微信、QQ、飞书、语音、Live Canvas、multi-agent routing 这些能力，我都标成项目说明，不写成亲测体验。

我最关心的第一个点是本地数据。OpenClaw 不是简单做一个网页登录页，它的 README 说自己是运行在你自己设备上的 personal AI assistant，核心是一个 Gateway。官方文档里的 QuickStart 默认是 local gateway，loopback，端口 18789，并且 Gateway auth 会自动生成 token。

这一点来自项目说明，不是我长时间运行后的安全结论。我的判断是，对中国用户来说，这比纯网页聊天机器人多了一层可控性，因为会话入口、workspace、channel 配置和 daemon 都能落在自己的机器或主机上。

但别误会成本地离线大模型。Getting started 明确写了你需要一个模型供应商的 API key，onboarding 会让你选择 provider 和默认模型。也就是说，OpenClaw 更像本地控制台加多渠道入口，不等于所有推理都在本机完成。

第二个点是自托管。官方推荐路径很短，Node 24 优先，Node 22.19+ 也支持。macOS 和 Linux 可以用安装脚本，Windows 有 PowerShell 脚本，也支持原生 Windows 和 WSL2，文档更推荐 WSL2 来拿完整体验。

如果你已经有 Node，README 还给了 npm 路径，`npm install -g openclaw@latest`，然后跑 `openclaw onboard --install-daemon`。Onboarding 会配置 Gateway、workspace、channels、skills 和 daemon。daemon 在 macOS 走 launchd，在 Linux 或 WSL2 走 systemd user unit，在 Windows 走 Scheduled Task 或 Startup-folder fallback。

我核验到的最小链路是这样，安装 CLI，跑 onboarding，检查 `openclaw gateway status`，再打开 `openclaw dashboard`。如果只是想先确认它是不是自己需要的东西，不必一上来接聊天渠道，在 Control UI 里先聊一轮就够了。

第三个点才是它和普通聊天机器人的差别。普通聊天机器人通常是你打开一个 app 或网页，输入问题，拿到答案。OpenClaw 的项目说明里，assistant 不是只待在一个窗口里，而是通过 Gateway 接到你本来就在用的渠道。

官方列出的渠道很多，WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、Matrix、Feishu、LINE、WeChat、QQ、WebChat 都在 README 里。Channels 文档还把 WeChat 标成 Tencent iLink Bot plugin，经 QR 登录，私聊可用，QQ Bot 和 Feishu 也被列在区域平台里。

这部分我没有亲测接入。对中国用户，我的建议反而保守，先用 dashboard 或 WebChat，最多再测一个低风险的工作渠道。不要把个人聊天、公司群、带文件读写权限的工具一次性都交给同一个 agent。

安全文档写得很直接，OpenClaw 假设的是 personal assistant trust model，一台 gateway 对应一个可信操作边界。它不是给互不信任的多人共用一个 agent 的隔离系统。多个不可信用户如果都能消息触发一个带工具权限的 agent，他们共享的就是那套 delegated tool authority。

这也是我觉得它值得写的地方。它不是在承诺比普通聊天机器人更聪明，而是在把“AI 助手”这件事从单轮对话，推进到设备、渠道、workspace、工具权限的组合。

适合它的日常任务，我会从轻的开始。比如在 dashboard 里让它整理一个发布 checklist，用 `openclaw agent --message` 触发一次命令式请求，把某个 agent 绑定到独立 workspace，或者把一个低敏渠道接进来做状态提醒和待办转写。

不适合它的任务也要写清楚。不要让它一开始就碰你的全量个人聊天记录，不要把敏感文件目录直接交给默认工具策略，不要把公开群消息接到可执行命令的 agent 上。项目安全文档也建议从最小访问开始，再逐步放宽。

我的结论很简单，OpenClaw 对普通用户不是“下载即爽”的聊天软件，它更像给愿意折腾的个人 AI operator 准备的一套底座。你如果只想问答，普通聊天入口更省心。你如果想把 AI 放进自己设备和常用渠道里，又愿意为权限、安全和配置负责，那它值得单独开一个周末试。

我下一步会做的事不是急着接满所有平台，而是先跑 dashboard，再建一个只处理低敏任务的 agent，确认 workspace、日志、工具权限都看得懂，再考虑渠道。个人助手这条路，真正难的不是会不会回答，而是你敢不敢让它替你做事。

## 相关链接

- GitHub 仓库 [openclaw/openclaw](https://github.com/openclaw/openclaw)
- Getting started [docs.openclaw.ai/start/getting-started](https://docs.openclaw.ai/start/getting-started)
- Onboarding CLI [docs.openclaw.ai/start/wizard](https://docs.openclaw.ai/start/wizard)
- Channels 文档 [docs.openclaw.ai/channels](https://docs.openclaw.ai/channels)
- Gateway runbook [docs.openclaw.ai/gateway](https://docs.openclaw.ai/gateway)
- Security 文档 [docs.openclaw.ai/gateway/security](https://docs.openclaw.ai/gateway/security)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->

## 标签
#OpenClaw #GitHubTrending #个人AI助手 #自托管 #本地优先

## 发布入口
https://creator.xiaohongshu.com/
