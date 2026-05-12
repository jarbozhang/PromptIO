# 主题追踪：openclaw 生态

[[openclaw-org|openclaw]] 项目方维护的体系，包括 [[openclaw|openclaw]] 主助手、clawhub 扩展集散点、clawdbot 自动化机器人、moltbot 实验性 agent 组件，以及对外接入的第三方 agent（如 [[hermes-agent|Hermes Agent]]）。是 TypeScript 圈个人 AI 助手最大盘所在的生态。

## 当前状态

openclaw 生态进入"宿主 + agent + 扩展面"三层结构：

- **宿主层** — [[openclaw\|openclaw]]，TypeScript 圈最大跨平台个人 AI 助手，365k 星
- **扩展层** — clawhub（扩展/插件集散点）、clawdbot（自动化机器人）、moltbot（实验性 agent 组件）
- **外部 agent 接入层** — [[hermes-agent\|Hermes Agent]]（NousResearch 持久成长 agent，12 万星）

体量越大暴露面越大，2026-04 openclaw 主体发生扩展面 / 供应链相关安全事件，是这个生态进入主流视野后第一次正式经历"高扩展性 vs 安全边界"的拷问。

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-08 | [[openclaw-claude-codex-把ai播客一键发spotify\|openclaw 给 Claude 和 Codex 装了个一键发 Spotify 的口子]] | 内容生产工作流 / openclaw 第三条子线 |
| 2026-05-03 | [[hermes-agent-130k星-nousresearch和openclaw生态深度绑定-topics拆解\|NousResearch hermes-agent 130k 星了，topics 里写满了 openclaw / clawdbot / moltbot]] | NousResearch 主动靠拢 / topics 体系正式绑定 |
| 2026-05-03 | [[openclaw-367k星-claw-eval-live-13个前沿模型最高66-7\|openclaw 367k 星了，又一篇 arxiv 用 ClawHub Top-500 把 13 个前沿模型卡在 66.7% 过不去]] | Claw-Eval-Live 评测 / ClawHub Top-500 |
| 2026-04-28 | [[openclaw-365k星跨平台个人ai助手-4月安全事件你不能不知道\|openclaw 365k 星 + 4 月安全事件复盘]] | 宿主主体 + 安全事件首次落地 |
| 2026-04-28 | [[hermes-agent-12万星-nousresearch持久成长agent-openclaw生态\|Hermes Agent 12 万星接入 openclaw 生态]] | 外部持久成长 agent 接入 / 生态扩展 |
| 2026-04-23 | [[last30days-skill-跨reddit-x-hn自动出研报-200美元deep-research平替\|Last30Days Skill 跨平台研报]] | 文中提及 clawhub，但当时未单独立主题 |
| 2026-05-07 | [[nouscoder-14b开源-48张b200训4天-接住claude-code时刻\|NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻]] | NousResearch 编程模型 / openclaw 生态间接关联 |

## 饱和度评估

**首次正式覆盖** — 2026-04-28 一次补 2 篇正式立主题。此前 4/23 [[last30days-skill\|Last30Days Skill]] 文章中已经提到 clawhub 的存在，但没有单独立主题页。这次以"宿主主体 + 外部 agent 接入"两篇组合正式立案，主题进入观察序列。

## 潜在下一个角度

- clawhub 扩展面安全审计实操（个人 AI 助手扩展的供应链管理）
- clawdbot / moltbot 自动化场景跑通（哪些是真正可复现的 openclaw 自动化）
- openclaw vs 其他个人 AI 助手（性能 / 隐私 / 跨平台体验横评）
- 持久成长 agent 对照（Hermes Agent vs 其他长期记忆 agent 路线）
- openclaw 在国内的部署 / 合规可行性（数据落地、API 路由）
