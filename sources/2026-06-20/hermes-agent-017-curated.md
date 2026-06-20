---
title: "Hermes Agent v0.17.0：Reach Release 把个人 Agent 往更多入口推进"
url: "https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19"
source: "Curated official GitHub release summary"
source_type: curated
language: zh
published: "2026-06-19T19:39:06Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

NousResearch 在 GitHub 发布 Hermes Agent v0.17.0（v2026.6.19），官方称为 Reach Release。它不是只改 UI，而是把 Hermes 从桌面预览推进到更多可交付入口。

官方 release 确认的规模：自 v0.16.0 以来约 1,475 个 commits、约 800 个 merged PR、1,693 个文件变化、300+ issues closed、245 位 community contributors。

这次更新的主线有四类：

1. 入口变多。Hermes 新增 iMessage 平台插件，基于 Photon managed line pool；新增 Raft platform adapter，让 Hermes 可以作为外部 agent 通过 wake-channel bridge 接入 Raft agent network。Telegram rich messages、official WhatsApp Business Cloud API adapter 也在同一轮更新里增强。
2. 桌面端从预览走向日常使用。新增可重绑快捷键、原生系统通知、subagent watch-windows、composer model selector、VS Code Marketplace theme、可调整终端 pane、per-thread composer drafts 等。
3. 长任务更不堵人。`delegate_task(background=true)` 可以把 subagent 派到后台，立即返回 handle；子任务结束后，完整结果再作为新的 turn 回到当前对话。
4. 交付能力更完整。`image_generate` 支持 image-to-image 编辑；Automation Blueprints 用问答式配置替代手写 cron；dashboard 增加 profile builder，可在浏览器里选择模型、skills、MCP servers；Skills Hub 支持预览和安全扫描。

这次还改了记忆与成本：`memory` tool 支持 atomic batch operations，可以在一次调用里 add/replace/remove，并按最终字符预算原子提交；skill curator 默认只做 deterministic inactivity sweep，不再为 routine runs 消耗 aux-model 预算，除非显式开启 consolidate。

适合写作角度：Hermes v0.17.0 的重点不是“又多了几个功能”，而是一个个人 Agent 如何从单个聊天窗口，长到桌面、消息入口、后台子任务、自动化表单、技能市场和记忆层。读者可以按“入口、后台任务、技能、记忆、成本”做一份 Agent 发布检查清单。
