---
title: Claude Code Artifacts 把终端结果变成网页，团队终于能看见 Agent 干了什么
status: draft
date: '2026-06-19'
source: manual
source_url: https://docs.anthropic.com/en/docs/claude-code/artifacts
angle: >-
  从团队协作痛点切入，Agent 在终端里做了很多分析，但其他人看不到。Artifacts 让 PR 走查、事故时间线、设计方案、dashboard
  变成组织内可分享的交互页面。重点写它不是应用，而是可交付的会话产物。
voice: first-person
reach: 9
tags:
  - Claude Code
  - Agent
  - 团队协作
  - Artifacts
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Claude Code Artifacts 把终端结果变成网页，团队终于能看见 Agent 干了什么
wechat_title: ''
cover:
  status: skipped
reach_note: Claude Code 新 beta 能力，适合 AI 编程团队和管理者，协作价值明确。
selection_reason: 和 06-18 Claude Cowork 不同，这篇聚焦 Claude Code 输出层和团队可见性。
---

# Claude Code Artifacts 把终端结果变成网页，团队终于能看见 Agent 干了什么

我用 Agent 做代码分析时，最烦的不是它跑得慢，而是它跑完以后，成果还困在我的终端里。

PR 走查、事故排查、方案对比、数据看板，Agent 明明已经把证据和判断整理出来了，但我要给同事看，还是只能复制一大段终端输出，或者截图发过去。别人看到的是结果，不一定看得到过程。

Claude Code Artifacts 解决的正是这个协作断点。它不是把 Claude Code 变成一个应用平台，而是把一次会话里的交付物发布成团队能打开的交互页面。

## 先把终端输出变成可交付页面

官方文档里，Artifact 的定义很克制。它是一页自包含的交互页面，可以从 Claude Code 会话发布到一个私有 URL，团队成员在浏览器里查看。

它现在处于 beta，需要 Team 或 Enterprise plan，并且会话要通过 `/login` 登录。可用入口包括 Claude Code CLI，以及 Claude desktop app 1.13576.0 或更高版本。

我觉得这里最关键的一句话是，它不是长期运行的应用。

这会把很多误解先挡住。Artifacts 不是让你在 Claude Code 里部署一个产品，也不是把 agent 输出直接包装成正式系统。它更像一次会话结束前交出去的工作台，里面放着 agent 已经整理好的证据、比较、时间线和可视化结果。

对团队来说，这个差别很重要。因为我们真正缺的，常常不是又一个 app，而是一个能被同事打开、审阅、追问、复盘的会话产物。

## 把协作场景压到四种交付物

如果你在团队里用 Claude Code，我会先把 Artifacts 放进这几个场景，而不是一上来想做复杂页面。

可收藏的用法清单

- PR 走查，把带注释的 diff 和修改理由放到同一页，reviewer 不用在终端日志里找线索
- 事故复盘，把长任务排查过程整理成时间线，谁看都能知道 agent 查过什么、排除了什么
- 方案比较，把多个设计或实现方案并排展示，减少会议里反复口头解释
- 数据看板，把会话中已有数据渲染成 dashboard，让讨论聚焦在指标和判断上
- 异步交接，把页面链接发给同事，而不是复制粘贴一大段输出

这些场景有一个共同点，信息已经在会话里了，只是原本没有一个适合分享的形态。

过去 agent 的工作过程很容易变成操作者的个人记忆。谁发起了任务，谁知道它为什么这么判断。Artifacts 把这段个人记忆搬到页面上，让其他人可以按自己的节奏看。

## 别把它当成正式系统来设计

这里最容易踩坑。

如果你把 Artifact 当成一个可长期运营的应用，就会自然开始问登录怎么做、数据怎么持续更新、用户状态怎么保存、页面怎么迭代发布。可官方文档已经把边界画清楚了，它是一页自包含交互页面，不是长期运行的应用。

所以我更愿意把它放在交付链路里，而不是产品链路里。

一个合适的 Artifact 应该回答三个问题。

- 这次 agent 查到了什么
- 它为什么得出这个判断
- 团队接下来该看哪里、改哪里、确认哪里

如果一个页面离开这次会话以后就失去上下文，它仍然可以是好 Artifact。反过来，如果你希望它承载长期业务状态，那应该另找正式系统，不要把会话产物硬拧成应用。

## 分享前先检查权限和留存

官方文档提到，Artifact 内容存储在 Anthropic 运营基础设施中，并且只对发布组织内认证成员可见。页面可以从头部分享给团队成员。

这对公司团队是好事，也带来一个很现实的动作，别只盯着页面能不能打开，还要让管理员提前把治理项看完。

Team 和 Enterprise 计划里，管理员可以启用或关闭 Artifacts、按角色控制权限、设置保留策略、查看审计日志，也可以通过 Compliance API 列出或删除 artifact。

我的判断是，Artifacts 最适合先从低风险协作材料开始用，比如 PR 注释、方案对比、排查时间线。等团队确认权限、留存和审计都符合要求，再把它放进更正式的工作流。

不要一上来就把敏感数据、长期留存材料、跨团队审批内容塞进去。交付形态变轻了，不代表治理可以省掉。

## 用一个真实任务验证它有没有价值

我会这样开始。

选一个最近最容易丢上下文的任务，比如一次复杂 PR review，或者一次持续很久的 bug 排查。让 Claude Code 在会话里整理证据、判断和下一步建议，然后发布成 Artifact。

发给同事时，不要只问页面好不好看，问三个更具体的问题。

- 他能不能在 3 分钟内看懂当前结论
- 他能不能找到 agent 做判断时依赖的证据
- 他能不能直接指出下一步要改什么或确认什么

如果这三个问题有两个成立，Artifacts 就已经在替团队省沟通成本。

我喜欢这个功能，不是因为它多炫，而是因为它碰到了 agent 落地里一个很朴素的问题。个人终端里的智能，只有变成团队能审阅的材料，才真的进入协作。

下一次让 Claude Code 跑完分析，别急着复制终端输出。试着把它整理成一页 Artifact，再看团队讨论会不会少绕一圈。

## 相关链接

- Anthropic 官方文档，Claude Code Artifacts，https://docs.anthropic.com/en/docs/claude-code/artifacts
