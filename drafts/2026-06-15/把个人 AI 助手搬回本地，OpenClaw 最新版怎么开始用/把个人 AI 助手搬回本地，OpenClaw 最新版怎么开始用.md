---
title: 把个人 AI 助手搬回本地，OpenClaw 最新版怎么开始用
status: draft
date: '2026-06-15'
source: manual
source_url: https://github.com/openclaw/openclaw
angle: >-
  从 6 月 14 日公开仓库最新更新切入，写清它解决个人数据、跨平台助手和本地可控工作流的什么问题，以及怎么从 README、release、issue/PR
  找到可验证入口开始使用。
voice: first-person
reach: 9
tags:
  - OpenClaw
  - 本地AI助手
  - Agent
  - 开源项目
  - 本地工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 把个人 AI 助手搬回本地，OpenClaw 最新版怎么开始用
wechat_title: ''
cover:
  status: skipped
reach_note: OpenClaw 核心生态品牌 + 个人 AI 助手利益点 + GitHub 可直接动手。
selection_reason: 命中本号核心生态，适合做成公众号的版本解读和小红书的上手清单，读者可以立刻去仓库验证与尝试。
---

# 把个人 AI 助手搬回本地，OpenClaw 最新版怎么开始用

如果你已经开始让 AI 处理提醒、资料、聊天和自动化，真正痛的不是某个模型慢半拍，而是入口太散。

一个助手在网页里，一个在聊天软件里，一段工作流在脚本里，最后你拥有的不是助手，是一堆临时会话。OpenClaw 这次值得看，是因为它把问题换成了更具体的一句，把个人助手跑在自己的设备上，再把常用渠道接回来。

这版还是 beta，更适合先按公开仓库、README、6 月 14 日的 v2026.6.8-beta.1 release、官方 Getting Started 和 Onboarding 文档做上手判断。下面重点看它解决什么问题、新版补了什么、以及从哪里开始验证，不把它当成稳定版全量推荐。

OpenClaw 的 README 对自己的定位很直接，它是你在自己设备上运行的 personal AI assistant。它可以通过你已经在用的渠道回复，也可以在 macOS、iOS、Android 上听和说，还能渲染一个可控的 Live Canvas。Gateway 不是产品本体，更像本地控制平面，负责会话、渠道、工具和事件。

这对中文读者的实际收益是三个。

一是个人数据和工作流不用默认散在多个聊天入口。OpenClaw 的默认工作区在 `~/.openclaw/workspace`，本地 Gateway 监听默认端口 `18789`，主会话的工具默认跑在宿主机上。这个设计很强，也很危险，因为它真的能碰到你机器上的东西。

二是跨平台不是只做一个聊天框。README 列出的渠道包括 Telegram、Slack、Discord、iMessage、飞书、LINE、WeChat、QQ、WebChat 等，官方还提到 Windows Hub、macOS 菜单栏应用、iOS 和 Android nodes。你可以先只用浏览器里的 Control UI，再决定要不要接聊天渠道。

三是它把 agent 应用最容易散掉的部分收进一条链路里。模型配置、认证、Gateway、daemon、skills、channels、安全策略，官方推荐用 `openclaw onboard` 一步步走完，而不是让你在一堆配置文件里猜。

6 月 14 日的更新，我认为最值得看的是它修的不是花活，而是 agent 长期运行会遇到的脏问题。

Telegram 和 WhatsApp 的发送更稳，Telegram 支持结构化富文本、表格、列表和更安全的富媒体边界，WhatsApp 会遵守配置过的 ACP 绑定。Agent 和 Gateway 的恢复路径也变多了，比如 DM 发送、生成媒体完成、reset archive fallback、restart shutdown abort、heartbeat 去重、未知 agent selector 拒绝。用人话讲，就是把长期在线助手容易卡住、漏回、误接、重启时状态丢失的地方补了一轮。

模型侧也在收口。release 写到 GLM-5.2、Claude Haiku 4.5 catalog rows、SecretRef auth、OAuth image-default routing、LM Studio binary thinking-off delivery，以及 OpenAI 和 Anthropic 系列 payload quarantine。这里不用被名字吓到，重点是 OpenClaw 不是只绑一个模型入口，而是在处理多模型、多认证、多回放和工具 schema 的边界。

还有几个小更新很像真实使用后才会补的东西。`/usage` 有了原生 full footer renderer，WebChat backscroll 在 streaming 后能保住，workspace files 可以折叠并默认折叠，iOS 会重连 stale foreground Gateway，SQLite 在 NFS state volumes 上避开 WAL。它们不适合写成大标题，但适合判断一个项目是不是在解决日常摩擦。

如果要开始验证，别急着全平台接入，先按公开入口做四步。

第一步，看 README，只确认你要的形态是不是它的形态。如果你只是想要一个网页聊天框，OpenClaw 可能太重。如果你想要本地 Gateway、多渠道消息、可控 tools、长期会话和 skills，它才对题。

第二步，看 Getting Started。官方写的前置条件是 Node 24 推荐，Node 22.19+ 也支持，还需要一个模型提供方的 API key。最短路径可以从 `npm install -g openclaw@latest`、`openclaw onboard --install-daemon`、`openclaw gateway status`、`openclaw dashboard` 这条线开始。

第三步，看 6 月 14 日 release。确认你要装的是 stable、beta 还是 dev。v2026.6.8-beta.1 是 pre-release，release verification 里写了 npm package、registry tarball、release SHA、npm smoke 等验证，也写了部分发布流程的 follow-up。这个页面比二手介绍更重要。

第四步，用 issue 和 PR 反查你的场景。比如你关心 Telegram 富文本，就点 release 里的 #92679。关心 WebChat backscroll，就找 #92622。关心 provider/model fallback，就看对应 PR。不要只看星标数，星标告诉你热度，issue 和 PR 才告诉你边界。

最大的坑，是把本地可控误解成默认安全。README 已经写得很重，OpenClaw 会连接真实消息入口，inbound DMs 要当成不可信输入。默认 DM pairing 会让未知发送者拿到配对码，bot 不会直接处理消息。公开 DM 需要显式打开，还要配置 allowlist。群组或渠道场景下，非 main session 建议放进 sandbox。

我的判断很简单，OpenClaw 对 agent 应用的启发不在于又多了一个助手名字，而在于它把助手产品拆成了更工程化的几块。本地控制平面，渠道入口，模型认证，工具权限，会话隔离，移动端节点，长期运行诊断。个人开发者要做自己的助手，小团队要交付 agent 应用，这几个模块躲不开。

但我不会建议你一上来就把所有聊天渠道、所有文件、所有自动化都接进去。更合理的第一晚，是只跑 Gateway 和 dashboard，确认 onboarding 能走通，再用一个低风险 workspace 试 skills 和 tools。等你能解释清楚 `openclaw doctor` 的输出，再考虑让它碰更重要的资料。

本文为 AI 辅助整理，关键事实已按公开来源核对。信息边界也摆在这里，公开材料能支撑的是上手路径、版本变化和风险框架，不支撑我说它已经适合所有人的日常主力助手。

## 相关链接

- [OpenClaw GitHub 仓库](https://github.com/openclaw/openclaw)
- [v2026.6.8-beta.1 release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8-beta.1)
- [Getting Started](https://docs.openclaw.ai/start/getting-started)
- [Onboarding CLI](https://docs.openclaw.ai/start/wizard)
- [Updating](https://docs.openclaw.ai/install/updating)
- [Issues](https://github.com/openclaw/openclaw/issues)
- [Pull requests](https://github.com/openclaw/openclaw/pulls)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
