---
title: Agent 的 loop 不是玄学，用 GitHub Issue 让 Skill 自我进化
status: draft
date: '2026-06-26'
source: manual
source_url: https://x.com/chenchengpro/status/2067265619159081028
angle: >-
  从 Warp CEO 的 oz-for-oss 案例切入，讲清楚内循环如何处理每个 issue、外循环如何把反馈写回 Skill。读者可以直接把这个思路迁移到 bug triage、code
  review 或客服工单。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: recent_title_pattern_saturation
reach: 8
tags:
  - Agent
  - GitHub Issue
  - Skill
  - 开发者工具
  - 自动化工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Agent 的 loop 不是玄学，用 GitHub Issue 让 Skill 自我进化
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.034
reach_note: GitHub、Agent、Skill 都有明确开发者认知，且能直接改造现有仓库流程。
selection_reason: 这是当天少数把 Agent loop 讲成可执行工程机制的来源，比泛泛谈趋势更适合公众号和小红书做成实操型选题。
---

# Agent 的 loop 不是玄学，用 GitHub Issue 让 Skill 自我进化

我最近看到一个很适合落地的 agent loop 案例。

不是让 agent 自己反思一通，也不是写一段看起来很聪明的系统提示词，而是把 GitHub Issue 当成反馈入口，让一个 Skill 在真实工单里慢慢变准。

这个思路来自 Warp CEO Zach Lloyd 提到的 oz-for-oss 案例。它最有用的地方在于，读完你不必重做一套平台，直接可以迁移到 bug triage、code review、客服工单，甚至团队里的事件响应。

## 选一个会反复出现的分类场景

如果你想让 Skill 自我进化，别从“大模型怎么学会工程判断”这种大问题开始。

我会先挑一个足够窄、但每天都会重复出现的任务。oz-for-oss 里的例子是 GitHub issue triage，也就是把新 issue 分成三类。

- ready-to-implement，信息够了，可以进入实现
- needs-info，缺关键信息，需要追问
- duplicate，重复问题，需要合并视角

这个场景好用，是因为它天然有反馈。

开发者会改标签，维护者会回复纠正，用户会对 agent 评论点赞或点踩。也就是说，你不需要额外搭一套标注系统，反馈已经藏在仓库协作流程里。

我认为这是这个案例最关键的一点。很多 agent loop 做不起来，不是因为模型不够聪明，而是因为反馈太贵。没人愿意为了训练一个工作流，再专门打开一个后台给它打分。

GitHub Issue 不一样。人在正常工作时留下的动作，本来就能变成训练信号。

## 让内循环只处理一个 issue

内循环的职责很克制。

每来一个新 issue，GitHub Action 触发一个云端 agent，跑 triage Skill。这个 Skill 只做几件事，读 issue，判断分类，打标签，发一条评论。

那条评论里会带一个隐藏标记，类似 oz-triage v:N。这个版本号很重要，因为后面你要知道是哪一版 Skill 做出的判断。

评论还会请求用户给 👍 或 👎。

这里不要把内循环做得太复杂。它不是要马上学会所有维护者偏好，也不是要在一个 issue 里自我修改。它只负责稳定地产生一次可追踪判断。

我会把内循环拆成这样：

- 输入，一个新 GitHub issue
- 动作，运行 triage Skill
- 输出，三档之一的标签
- 留痕，评论里写入 Skill 版本标记
- 反馈入口，允许人用赞踩、回复、改标签来纠正

这套东西迁移到 code review 也很自然。比如每个 PR 来了以后，agent 先判断“可合并 / 需要修改 / 缺测试”。它不急着改规则，只留下判断和版本号。

客服工单也一样。先分成“可直接回复 / 需要人工 / 重复问题”，再让后续反馈回到规则文件。

内循环最忌讳的是贪心。它要像一个稳定的传感器，而不是像一个马上改自己代码的实习生。

## 用外循环把反馈写回 Skill

真正的学习发生在外循环。

oz-for-oss 的做法是每天跑一个定时 agent，拉取近 14 天所有被分类过的 issue，然后收集三类信号。

- 评论赞踩，判断这次 triage 有没有被接受
- 人工纠正回复，看看维护者指出了什么
- 标签漂移，比如人把 ready-to-implement 改成 needs-info

其中最强的 ground truth 是标签漂移。

因为这不是一句模糊反馈，而是维护者用实际动作改掉了 agent 的结论。比如 agent 觉得这个 issue 可以实现，但维护者把它改成 needs-info，那大概率说明 Skill 漏掉了某个信息缺口。

重点来了，外循环不是盯着单个 issue 写补丁。

它要把反馈提炼成可泛化规则。比如不要写成“第 123 个 issue 应该归 needs-info”，而要写成“崩溃报告缺 OS 版本号时，一律归 needs-info”。

然后，这条规则被写进 Skill 的 Learned guidelines 段，Skill 版本号 +1，再开一个 PR 给人 review。

注意最后一步，永不自动改 main。

我很喜欢这个边界。Skill 是文件，改进就是对文件做 diff。agent 可以提出 diff，但主分支要不要接受，仍然交给人审。

## 给自己的仓库配一条验收线

如果我把这个方法搬到自己的项目里，不会一上来追求“全自动维护仓库”。我会先做一条很窄的验收线。

比如只验证 issue triage，连续跑两周，看三件事。

- 被人工改标签的比例有没有下降
- needs-info 的追问是否更具体
- Skill diff 是否从个案修补变成通用规则

这三个指标比“agent 看起来聪不聪明”更有用。

因为 loop 的目的不是制造一个能说会道的 agent，而是让一个流程越来越少打扰人。维护者少改一次标签，少追问一次缺失信息，少看一次重复 issue，才是真的进步。

这里有个可收藏的最小配方：

- 适合对象，有 GitHub issue、PR、工单、客服票据这类重复入口的团队
- 最小任务，只做三分类，不要同时做回复、修复、派单
- 反馈信号，优先用人已经会做的动作，比如改标签、点踩、纠正回复
- 规则沉淀，把个案改写成通用判断，不把 issue 编号写进 Skill
- 审核边界，Skill 可以自动开 PR，但不要自动合并到主分支
- 验收周期，先看 14 天，不要用一天的数据判断成败

## 别把 loop 做成自我感动

这个案例里最容易踩坑的地方，是把“自我进化”理解成 agent 可以自己改自己。

真正在工作的版本更朴素。

内循环负责稳定处理每个 issue，外循环负责从一段时间的反馈里抽规则。人负责 review 规则是否合理。

这比让 agent 在每次失败后立刻改提示词更可靠。单个失败很可能只是边界情况，连续两周的标签漂移才更像系统性问题。

还有一个坑，是反馈信号别搞得太重。

如果你要求维护者每次都填一份表，loop 很快就会死掉。更好的方式是借用已有动作。改标签、回复、赞踩，这些本来就在工作流里，agent 只是把它们读出来。

我对这个方法的判断很简单，agent loop 要先服务一个具体队列，再谈自我进化。

GitHub Issue 是一个好入口，因为它有任务、有结果、有人工纠正，也有天然版本历史。你把这个结构看懂了，再迁移到 code review 或客服工单，就不会只停在概念层。

可以从一个测试仓库开始，只接入一个三分类 Skill。让它跑 14 天，再看 Skill 的 Learned guidelines 有没有真正变厚。

如果那几条规则开始像团队经验，而不是像某次 issue 的临时补丁，这个 loop 才算跑起来。

## 相关链接

- Source，X @chenchengpro，https://x.com/chenchengpro/status/2067265619159081028
- oz-for-oss，https://github.com/warpdotdev/oz-for-oss
- GitHub Actions 文档，https://docs.github.com/actions
- GitHub Issues 文档，https://docs.github.com/issues

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
