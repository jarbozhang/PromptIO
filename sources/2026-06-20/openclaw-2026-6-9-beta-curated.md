---
title: "openclaw 2026.6.9-beta.1：更稳的交付通道、恢复能力和 Codex 集成"
url: "https://github.com/openclaw/openclaw/releases/tag/v2026.6.9-beta.1"
source: "Curated official GitHub release summary"
source_type: curated
language: zh
published: "2026-06-19T05:52:39Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

openclaw 发布 2026.6.9-beta.1。相较前一天已覆盖过的 2026.6.8，这个 beta 更像一次“把 Agent 真正交出去”的稳定性更新：消息通道更稳、异常恢复更强、Codex 集成更深、插件交付更像正式产品。

官方 release highlights 包括：

1. Telegram delivery 更丰富：Telegram 发送 rich HTML，保留 rich markdown 和 sticker paths，更可靠地渲染 progress drafts 与 command output，并保持 mentions 与 spooled handlers 走正确交付路径。
2. Agent recovery 更可靠：针对 retries、terminal outcomes、usage after compaction、session history repair、reply reconciliation 做了一组修复，目标是让 interrupted 或 partial turns 更容易走向可见 final result。
3. Codex 集成增强：Codex 自动 plugin approvals、GPT-5.3 Spark OAuth routing、remote-node `exec` 作为 dynamic tool、更可靠的 app-server teardown 和 terminal outcomes。
4. 官方 provider plugins 变成独立 npm releases：external provider packages 成为一等公民，外部安装的 channel plugins 可在 Gateway startup 时加载。
5. Web/native clients 变好：Control UI 增加 session workspace rail 与 extension health，iOS 增加 Watch controls，Android 展示 chat context。
6. Search 与 skills 更有用：Codex Hosted Search 可用，key-free search providers 保持 deliberate opt-in，ClawHub skill installs 保留 verified source provenance。

Fixes 里值得关注的不是单点 bug，而是几个产品化信号：secrets 从 debug/config 输出里被 redacted，SQLite WAL 避开 network filesystems，agent 在 thinking-only / empty post-tool turns 场景会 retry，partial JSON/history artifacts 会 repair，Telegram、WhatsApp、Mattermost、Discord 的消息路径都有补强。

适合写作角度：OpenClaw 这次不是讲“个人助手能做什么”，而是讲一个 Agent 要被别人长期使用，必须先解决交付通道、异常恢复、插件来源、远程节点执行、搜索入口和敏感信息保护。读者可以按这些变化反推自己的 Agent 应用发布前 checklist。
