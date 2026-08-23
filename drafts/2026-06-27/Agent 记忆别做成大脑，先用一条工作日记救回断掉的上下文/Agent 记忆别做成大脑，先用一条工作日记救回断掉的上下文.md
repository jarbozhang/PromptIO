---
title: Agent 记忆别做成大脑，先用一条工作日记救回断掉的上下文
status: draft
date: '2026-06-27'
source: manual
source_url: https://x.com/chenchengpro/status/2070140030585356725
angle: >-
  把 agent memory 从“永久记住一切”改成“重置前写清楚决策、文件、命令和下一步”，对经常用 Claude Code、Codex、Cursor
  做长任务的读者很实用。读者关心的是：少丢上下文，少在半路重开项目。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: >-
  same_entity_in_batch,title_pattern_repeat_in_batch,checklist_daily_cap,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Agent记忆
  - Claude Code
  - Codex
  - Cursor
  - 开发工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Agent 记忆别做成大脑，先用一条工作日记救回断掉的上下文
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.036
reach_note: Agent 记忆是高关注主题，Obsidian/Markdown 路径可立刻照做，直接解决长任务断档痛点。
selection_reason: 相比抽象 memory 架构，这个题目能落到 Daily Log、Session Log、reset 前笔记和夜间整理，适合做成可执行的个人开发流程。
---

# Agent 记忆别做成大脑，先用一条工作日记救回断掉的上下文

我现在对 agent memory 的看法变得很朴素，别急着让它永久记住一切，先让它在重置前把工作日记写明白。

如果你经常用 Claude Code、Codex、Cursor 跑长任务，真正折磨人的不是 agent 完全失忆，而是你半路切走、context window 满了、session 重开以后，刚才的判断、文件、命令和坏掉的地方全散了。

cobi 在《Agents Need a Diary》里给了一个很实用的角度，把 memory 当日记，不当大脑。这个思路不炫，但很救命，因为它处理的是长任务里最常见的断点。

## 把记忆目标缩到一个工作块

我以前也容易把 memory 想大，项目背景、个人偏好、长期规则、历史讨论，最好全能记住。

但写代码时最先掉链子的，往往不是这些宏大背景，而是一个很小的工作块。

比如刚才为什么放弃方案 A，哪个文件已经改过，哪个命令跑失败了，下一步是真的要做，还是 agent 自己从残留线索里猜出来的。

所以这个配方的最小场景很明确，给每次重置前的 session 留一页能接上的工作日记。

这页日记不需要漂亮，也不需要像知识库。它只要回答一个问题，下一次打开项目的人，能不能少花二十分钟重新侦查现场。

## 在 reset 前强制写一页交接

cobi 的核心命令是 `/prepforreset`，作用不是继续干活，而是让 agent 停下来整理。

这一步要写的不是聊天记录摘要，而是结构化交接。

可以按这个顺序收，别贪多。

- 发生了什么，当前 session 的目标和实际推进到哪里
- 做了哪些决策，为什么这么选
- 否决了哪些选项，别让下个 session 又绕回去
- 改了哪些文件，哪些只是看过没动
- 跑过什么命令，结果是通过、失败还是没完成
- 什么地方坏了，报错、阻塞、未验证点分别是什么
- 下一步动作，明确区分已确认任务和推断任务

我认为最后一条最关键。agent 很爱把模糊残留包装成自信的 todo list，看起来很勤奋，其实会把下个 session 带偏。

好的工作日记应该承认不确定。它可以写“看起来需要检查 X”，但不要把它伪装成“下一步必须重构 X”。

## 用两类笔记接住上下文

这个方案落地到 Obsidian 里是两份 Markdown，Daily Log 和 Session Log。

Daily Log 是天级视图，适合看今天围绕哪些任务转过。Session Log 是工作块深度页，记录 goal、decisions、alternatives、gotchas、artifacts、blockers、next actions。

这两个名字不重要，重要的是粒度分开。

如果所有东西都塞进一页，日记会变成第二份聊天记录。以后真要接手时，还是得从一堆文本里翻线索。

我会把 Daily Log 当索引，把 Session Log 当现场交接单。一个负责告诉我今天有哪些坑，一个负责告诉我某个坑怎么走到这里。

## 不要保存一切，保留能继续工作的证据

这里有个很反直觉的点，transcript dump 不是 memory。

40000 tokens 的工具输出、半成品推理、临时猜测，看起来信息量很大，但未来的你不一定用得上。保存一切很容易，写出有用那一页才难。

我的判断是，agent memory 先别追求完整，先追求可恢复。

可恢复的标准很简单。

- 新 session 能说清当前目标
- 不会重复已经否决的方案
- 能找到相关文件和产物
- 知道哪些命令跑过，哪些还没验证
- 能区分 blocker、gotcha 和真正的 next action

这套标准比“记住所有上下文”窄很多，但对长任务更有效。

## 给混乱收尾留一个清理工

cobi 还提到一个夜间 wikijanitor cron，我觉得这是整套方案里最像工程纪律的部分。

它不是帮你补一份完美记录，而是审查近期 session，做 consolidation pass。看到 gap 就标 gap，发现忘了运行命令就把缺口留下。

这点很重要。很多 memory 系统一旦开始自动整理，就容易事后合理化，好像每一步都有清晰计划。

但真实开发不是这样。真实开发里经常有没跑完的命令、没验证的假设、临时绕开的错误。日记的价值不是把它们抹平，而是把断点留下来。

## 我的最小用法

如果你想把这个思路搬到自己的 Claude Code、Codex 或 Cursor 流程里，我会从一个命令开始，而不是先搭完整系统。

在每次准备 reset、切任务、下班或 context 快满时，让 agent 写一条 session note。先存 Markdown，放在哪里都行，Obsidian 只是一个顺手的容器。

这条 note 必须短，但要硬。

- 当前任务，用一句话写清
- 已改文件，列路径
- 已跑命令，写结果
- 已做决策，写理由
- 未验证点，单独列
- 下个动作，只写确认过的动作

等这件事稳定了，再加 Daily Log，再加定时整理。顺序反了，就会很快变成维护 memory 系统本身，而不是减少工作中断。

下一次长任务跑到一半，别先问 agent 还能不能记住你。让它在忘掉刚发生的事之前，写好那一条工作日记。

## 相关链接

- Source，https://x.com/chenchengpro/status/2070140030585356725
- Agents Need a Diary，https://cobi.dev/agents-need-a-diary/

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
