---
title: >-
  现在的 AI agent 单兵很能打，可一旦想让团队用起来就散了：强 agent 困在某个人终端里别人看不见，换个 runtime
  上下文从头重建，凭据/工具调用/对外动作没地方审，跨天任务没人接力。港大 HKUDS 刚开源的 AgentSpace 给的解法是别把 agent
  当工具，当「数字员工」来管。 它是一套「飞书式」的人机协同工作空间，每个 agen
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2069042432394801175'
date: 'Mon Jun 22 12:58:51 +0000 2026'
likes: 51
reposts: 8
replies: 28
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-07-03T23:12:59.448Z'
---
现在的 AI agent 单兵很能打，可一旦想让团队用起来就散了：强 agent 困在某个人终端里别人看不见，换个 runtime 上下文从头重建，凭据/工具调用/对外动作没地方审，跨天任务没人接力。港大 HKUDS 刚开源的 AgentSpace 给的解法是别把 agent 当工具，当「数字员工」来管。

它是一套「飞书式」的人机协同工作空间，每个 agent 都有 role、owner、技能和权限边界；人类管方向和授权，agent 管协调和执行。四块拼到一起看：

调度靠 AgentRouter，把 Claude Code、Codex、OpenClaw、Hermes 这些 CLI 的事件、session、工具审批、诊断归一成一套执行契约，同一个 agent 不重建，自动给每个任务挑最合适的 runtime（Gemini/OpenCode/NanoBot 走 legacy 模式兜底）。

能力上有「数字员工看板」，把藏在私人账号里的 agent 变成组织资产，role/skills/knowledge/runtime 绑定全可见，能借用、能申请，owner 和 admin 双重审批。协作上 agent 跨 channel、私聊、inbox、文档、任务板干活，高风险动作进 TabTabTab 式人工审批门，人审批的同时 agent 继续推进。治理上有一整套权限控制平面，成员、channel、runtime grant、daemon token、文档、Google Workspace OAuth 委派统一治理，还能诊断「权限漂移」。

工程也很扎实：独立打包的 remote daemon 默认给 12 小时 task timeout 专门扛跨天任务，托管和自托管两种部署零功能差，TypeScript monorepo 约 15.5 万行，Apache 2.0。

说到底它解决的不是「让 agent 更聪明」，而是让一群 agent 在有边界、有记录、有 owner 的操作面上，跟人一起把真实工作做完。

https://t.co/eyiP52o0mv
