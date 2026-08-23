---
title: 别只让 Agent 跑任务，Warp 把 issue 反馈变成 Skill 更新
status: draft
date: '2026-06-27'
source: manual
source_url: https://x.com/chenchengpro/status/2067265619159081028
angle: 把 GitHub issue 的标签、评论赞踩和人工纠正变成可复用规则，适合有开源仓库或内部工单的团队立刻改造 triage 流程。读者关心的是：不用额外标注数据，也能让自己的自动化流程越跑越准。
voice: first-person
content_lane: developer-tooling
content_archetype: case_story
diversity_note: recent_title_pattern_saturation
reach: 8
tags:
  - Agent
  - Warp
  - GitHub issue
  - Skill
  - 开发者工具
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 别只让 Agent 跑任务，Warp 把 issue 反馈变成 Skill 更新
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.063
reach_note: GitHub 和 Warp 有品牌识别，issue triage 是明确可操作场景，还能降低人工分拣成本。
selection_reason: 这不是泛泛讲 Agent 自进化，而是把反馈闭环落到 GitHub Action、Skill 文件 diff 和 PR review 上，适合写成一个可复刻的团队工作流案例。
---

# 别只让 Agent 跑任务，Warp 把 issue 反馈变成 Skill 更新

如果你的团队已经让 Agent 帮忙处理 GitHub issue，但结果还是要人反复改标签、补规则、修提示词，我会建议先看 Warp 这个思路。

它有意思的地方不是“让 Agent 自动 triage”，而是把 GitHub issue 里本来就会发生的反馈，变成 Skill 的下一次更新。

对有开源仓库、内部工单、客服缺陷池的团队来说，这个方法最省的一点是，不用额外拉一套标注系统。标签改动、评论赞踩、人工纠正，本来就在流程里，只是以前没人把它们认真收回来。

## 从一个三分类队列开始改

我第一次看到这个案例，脑子里浮现的不是宏大的 Agent 平台，而是一个很普通的 issue 收件箱。

每天都有新 issue 进来，有些已经足够清楚，可以直接进入开发。有些缺环境信息、复现步骤、版本号，只能先问更多信息。还有一部分其实是重复问题。

Warp CEO Zach Lloyd 给的例子，就是把 GitHub issue 分成三档。

ready-to-implement，已经可以开工。

needs-info，还缺关键信息。

duplicate，重复问题。

这件事看上去很小，但很适合作为 Agent 流程的第一块试验田。因为目标明确，反馈频繁，人也容易判断错在哪里。

Warp 的内层 loop 就从这里开始。每来一个新 issue，GitHub Action 触发云端 Agent，跑一个 triage Skill。Agent 根据 Skill 判断分类，自动打标签，再发一条评论。评论里带一个隐藏标记，比如 oz-triage v:N，同时请求用户用点赞或点踩反馈。

这一步解决的是“先把任务跑起来”。但真正关键的地方，还在第二层。

## 让人工纠正留下痕迹

很多团队做 Agent 流程时，会卡在一个尴尬点。

Agent 判断错了，人改回来。下次它还是可能错。于是团队开始怀疑模型，怀疑 prompt，怀疑自动化值不值。

Warp 这个案例给我的启发是，不要只看单次任务完成率，要看错误有没有被流程吃掉。

外层 loop 每天定时跑一次。这个 Agent 会拉取近 14 天所有被分类过的 issue，收集三类信号。

一种是评论赞踩。用户觉得这次分类有用还是没用，会留下弱反馈。

一种是人工纠正回复。比如维护者指出“这个不是 duplicate，而是缺少复现环境”。

还有一种更强，是标签漂移。比如 Agent 原来打了 ready-to-implement，但人后来把标签改成 needs-info。

在这个流程里，标签漂移是很硬的 ground truth。因为人已经用实际动作告诉系统，前一次判断不对。

我认为这里最值得学的不是“收集反馈”四个字，而是反馈没有打断原来的工作流。维护者仍然只是改标签、回评论、审 PR，Agent 在旁边把这些动作整理成可复用规则。

## 规则不要追着单个 issue 跑

最容易做坏的一步，是把每个错例都写成特例。

比如某个 issue 被分错了，就在 Skill 里补一句“issue 1234 应该归 needs-info”。这当然没用，下一次换一个 issue 编号，问题又回来了。

Warp 的外层 loop 要做的是，把反馈提炼成可泛化规则。

更好的写法是，崩溃报告如果缺 OS 版本号，一律归 needs-info。

这就从“修一次错误”变成了“更新一次判断标准”。

然后 Agent 把这类规则写进 Skill 的 Learned guidelines 段，把版本号加一，开一个 PR，让人 review 后合并。

这里有个细节很重要，永不自动改 main。

我很喜欢这个限制。很多 Agent 自动化一激动，就想把从观察到修改再到上线全串起来。但 triage 规则会影响团队工作流，应该让 Agent 提建议，让人合并变更。尤其是 issue 分类这种入口动作，错了会直接改变后续优先级。

## 交付物从一次评论变成一份会长大的文件

这个案例真正把我打动的点，是它把 Skill 看得很朴素。

Skill 就是文件。

改进 Skill，就是对文件做 diff。

这样一来，Agent 的能力提升不再是一个很玄的过程。它变成了仓库里能 review、能回滚、能比较版本的变更。

原来团队交付的是一次分类结果，一条评论，一个标签。用了双层 loop 后，交付物多了一层，分类 Skill 本身也在持续变好。

这对 Agent 应用的启发很直接。不要只问“这个 Agent 能不能完成任务”，还要问“它从失败里学到的东西，会不会留下可审查的资产”。

如果答案是否定的，团队就会一直停留在人工擦屁股阶段。Agent 跑得越多，维护者越累。

如果答案是肯定的，Agent 才开始接近一个可运营系统。它不是每次从零判断，而是在团队认可过的规则上继续工作。

## 把这个思路搬到自己的队列里

我会把这个方法先放到目标清楚、反馈自然存在的流程里，而不是一上来就塞进复杂研发链路。

更合适的场景是这些。

- 开源仓库 issue triage，按可实现、需补信息、重复问题分流
- code review 初筛，识别缺测试、缺说明、风险文件改动
- bug 修复队列，判断是否缺复现路径、环境信息、影响范围
- 事件响应记录，把处置遗漏提炼成下次检查规则
- 内部工单分派，把人工改派记录变成路由规则

不适合一开始就做的，是标准模糊、责任边界不清、人工也经常争议很大的流程。Agent 在这里会把组织里的含糊放大，而不是自动变聪明。

我会按四个交付物搭第一版。

第一，一个只做三分类的 Skill，不追求覆盖所有情况。

第二，一条 Agent 评论，带版本标记，方便后续追踪。

第三，一个定时任务，只读取最近一段时间的分类结果、赞踩、人工评论和标签变动。

第四，一个 Skill 更新 PR，只改 Learned guidelines 和版本号，不直接合并。

这套结构不性感，但很稳。它把“Agent 做错了”从一次尴尬，变成下一版规则的输入。

## 我的判断，Agent 流程缺的不是更长 prompt

很多团队看到 triage 不准，第一反应是把 prompt 写得更长。

但从 Warp 这个案例看，真正该补的不是长度，而是闭环。

没有外层 loop，再长的 prompt 也只是一次性经验堆叠。有人改过标签、有人点踩过评论、有人反复指出同一种错误，这些信号如果没有进入 Skill，Agent 只是表面自动化。

我会把这个双层 loop 当成一个很实用的判断标准。

一个 Agent 流程上线前，不只检查它能不能跑通，还要检查它的错误会流向哪里。

如果错误只流向人工抱怨，流程会越来越脆。

如果错误能流向可审查的 Skill diff，这个系统才有机会越跑越准。

相关链接

- X 原帖，https://x.com/chenchengpro/status/2067265619159081028
- Warp，https://www.warp.dev/
- GitHub Actions 文档，https://docs.github.com/actions

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
