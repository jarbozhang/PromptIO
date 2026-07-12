---
title: Hermes Agent 刚更新：把“越用越懂你”落到本地的上手路线
status: draft
date: '2026-07-13'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从 7 月 12 日的仓库更新切入，拆解 Hermes Agent 想解决的长期个性化问题、当前新增能力和最小上手路径，帮助读者判断它是否适合成为自己的长期 AI 工具。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  title_pattern_repeat_in_batch,checklist_daily_cap,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Hermes Agent
  - NousResearch
  - 个人智能体
  - 长期记忆
  - 版本更新
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 刚更新：把“越用越懂你”落到本地的上手路线
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.053
reach_note: NousResearch 生态有品牌加成，“本地上手”和长期个性化同时提供明确利益点与行动入口。
selection_reason: 这是当天最契合 PromptIO 定位的生态更新，既能追踪 Hermes 新变化，也能给出从 README、安装到首次任务的可验证使用路线。
---

# Hermes Agent 刚更新：把“越用越懂你”落到本地的上手路线

如果你想找一个能长期接住个人习惯、重复任务和项目上下文的助手，Hermes Agent 这次仓库更新值得看。它更适合高频开发、资料整理和固定工作流，不是为了替代一次性问答。

个人智能体最恼人的旧问题，不是第一轮答得不够漂亮，而是换个会话又要重新解释目录、格式和偏好。Hermes 把自己的定位写成“The agent that grows with you”，瞄准的正是这种反复重教。

读完可以做两个决定。看懂 7 月 12 日出现了什么更新信号，再用一个跨会话任务判断，它是否适合成为你的长期工具。

## 读懂 7 月 12 日的版本信号

7 月 12 日的仓库快照记录了最新 push，项目以 Python 为主，已有 213719 个 star 和 39619 个 fork。它证明仓库仍在活跃，但 push 日期不等于新版本发布日期，star 也不是长期记忆的验收报告。

我会把这次信号和当前 Release 分开看。7 月 1 日发布的 v0.18.0 是近期功能变化的主体，7 月 7 日的 v0.18.2 是补丁，主要修正消息桥接依赖，让带标签版本的 Docker 构建和安装更可靠。

topics 里出现 openclaw、clawdbot、moltbot，只能说明项目主动进入了相关 Agent 生态语境，不能据此断言任意配置都能直接迁移。

## 看清新版补上的三个缺口

v0.18.0 最值得关注的，不是让回答更像人，而是让成长过程更可检查。

| 旧问题 | 新版能力 | 对使用者的变化 |
| --- | --- | --- |
| Agent 自己说做完了 | /goal 增加完成契约，编码任务可记录验证证据 | 完成变成可核对结果 |
| 跑通的流程还要重讲 | /learn 可把走过的工作流沉淀成 skill | 成功经验有机会复用 |
| 学到了什么不够透明 | /journey 提供学习过程的查看入口 | 错误偏好更容易被发现 |

Hermes 当前文档还把长期信息拆成两类。MEMORY.md 保存环境事实、项目约定和经验，USER.md 保存个人偏好与沟通风格。它们会在新会话开始时进入提示词，修改后的内容要到后续会话才体现。

这给 Agent 应用一个很实在的启发。个性化不是把全部聊天记录塞进上下文，而是把稳定事实、个人偏好和可执行流程分开管理，并保留查看、修改和清理入口。

我的判断落在这里。真正有用的“越用越懂你”，不是它越来越会猜，而是它少问一遍背景时，你还能指出那段信息存在哪里、为什么被复用。

## 把验证压到一个重复任务

我会从测试仓库或不含敏感信息的资料夹开始，只选一个任务。例如每次读取同一项目，输出固定格式的变更简报。

| 轮次 | 动作 | 通过标准 |
| --- | --- | --- |
| 第一次会话 | 按 Quickstart 安装，运行 hermes doctor 检查环境，再完成任务 | 交付物能核对，版本点有记录 |
| 纠正阶段 | 只补一项稳定偏好，用 /learn 保存跑通的流程 | 偏好与流程各有清楚落点 |
| 新会话复跑 | 再做同类任务，查看 MEMORY.md、USER.md 与 skill 变化 | 少解释背景，结果仍符合要求 |
| 清理测试 | 删除一项测试偏好，再开新会话 | 旧偏好不再影响输出 |

OpenClaw 用户可以再看 hermes claw migrate。当前 README 说明它能迁移设置、记忆、skills、允许列表、消息设置、部分密钥项和工作区指令，我会先在隔离环境核对范围，再决定是否搬现有配置。

## 按使用频率决定是否升级

如果你每天都在重复同类任务，已经维护 OpenClaw 工作流，或希望把一次成功流程沉淀成 skill，v0.18 值得验证。它把记忆、学习和完成证据连到了一起，收益会随着重复次数出现。

如果你主要做临时问答，很少复用上下文，也不准备检查本地记忆文件，更轻的聊天入口可能更省事。长期 Agent 会带来维护成本，保存错偏好时也要有人修正。

信息来自 GitHub 仓库、Release 和官方文档。我的动作很具体，固定 v0.18 的一个 tag，在测试目录里把同一任务跨两个会话跑完，再看它是否少问一次背景，同时保留可见的修改和清理路径。

通过这轮，再谈迁移。没有通过，就让 Hermes Agent 留在候选名单里。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.18.0 Release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [Hermes Agent v0.18.2 Release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7.2)
- [Hermes Quickstart](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)
- [Hermes Memory 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)
- [Hermes Skills 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
