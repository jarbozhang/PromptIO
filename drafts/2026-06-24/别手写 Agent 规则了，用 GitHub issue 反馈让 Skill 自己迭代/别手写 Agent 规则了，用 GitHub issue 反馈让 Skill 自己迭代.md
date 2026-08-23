---
title: 别手写 Agent 规则了，用 GitHub issue 反馈让 Skill 自己迭代
status: draft
date: '2026-06-24'
source: manual
source_url: https://x.com/chenchengpro/status/2067265619159081028
angle: >-
  把 Warp 的双层 loop 拆成普通开源项目可照搬的流程：GitHub Action 跑 triage Skill，收集赞踩、人工纠正和标签漂移，再定时改 Learned guidelines
  并开 PR。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: recent_title_pattern_saturation
reach: 9
tags:
  - Agent
  - GitHub
  - Skill
  - 开发者工具
  - 开源工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 别手写 Agent 规则了，用 GitHub issue 反馈让 Skill 自己迭代
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.041
reach_note: GitHub issue、Skill、自动 triage、反馈闭环都非常适合开发者收藏和转发。
selection_reason: 这是今天最强的实战工作流之一，能延续昨天 skill 逻辑但换成更具体的 GitHub issue 场景。
---

# 别手写 Agent 规则了，用 GitHub issue 反馈让 Skill 自己迭代

我现在看 Agent 项目，最怕的不是规则少，而是规则越写越像补丁墙。一次误判加一条例外，一个新维护者再加一段偏好，最后没人知道哪句真的还有效。

Warp CEO Zach Lloyd 讲的这个双层 loop，我觉得值得拆出来。它没有把 Agent 想成一个会顿悟的黑盒，而是把 Skill 当成一个普通文件，错了就收反馈，攒够证据后改 diff，再让人 review。

最适合照搬的场景，就是 GitHub issue triage。你不需要一次做成全能维护者，只要先让它把新 issue 分到三档，再用日常维护动作反向喂回规则。

## 把最小场景压成三档分流

我会先从最小任务开始，别碰修 bug、写代码、关 issue 这些重动作。第一版只做三分类。

三档分别是 `ready-to-implement`、`needs-info`、`duplicate`。这三个标签的好处是边界足够清楚，维护者也愿意纠正。Agent 判断错了，人只要改标签或回一句原因，就已经留下训练信号。

这里最关键的是别让 Skill 一上来追求聪明。它只回答一个问题，这个 issue 现在能不能进入实现队列。如果缺关键信息，就去 `needs-info`，如果已经有重复讨论，就去 `duplicate`。

## 让 GitHub Action 跑内循环

内循环可以很薄。每来一个新 issue，GitHub Action 触发云 agent，运行 triage Skill，然后做三件事。

- 打上三档之一的标签
- 发一条说明评论，里面带 `oz-triage` 版本标记
- 在评论里请求维护者给赞踩反馈

这个设计很朴素，但我喜欢它的原因也在这里。Agent 不是在仓库里乱动，它只留下可追踪的判断。版本标记能让后面复盘时知道，当时到底是哪一版 Skill 做的决定。

如果普通开源项目要抄，我建议把权限压到最小。第一阶段只允许打标签和发评论，不允许关 issue，不允许直接改主分支。这样维护者看到不对劲，改一下标签就能纠偏。

## 把人工动作收成三类反馈

外循环不是实时改规则，而是定时收证据。源材料里给的是每天跑一次，拉取近 14 天所有被分类的 issue，然后只看三类信号。

可收藏的反馈清单可以这样放进仓库说明里。

- 赞踩反馈，判断维护者是否认可这次 triage
- 人工纠正回复，记录人为什么认为它分错了
- 标签漂移，例如人把 `ready-to-implement` 改成 `needs-info`

这里最值钱的是标签漂移。赞踩有情绪，评论有表达成本，改标签通常是维护者真实工作流的一部分。它不需要额外标注，也更接近 ground truth。

## 把 Learned guidelines 改成 PR

外循环真正做的事，不是把每个错例都塞进提示词。它要把一批信号提炼成可泛化规则。

比如不要写成“第 327 个 issue 分错了”。更好的规则是，崩溃报告缺 OS 版本号时，一律归到 `needs-info`。这类规则能覆盖下一批问题，才值得进入 Skill。

源材料里最重要的一条边界是，定时 agent 只改 Skill 的 `Learned guidelines` 段，把版本号加一，然后开 PR。它不自动改 main。

我认为这一步是整个流程的保险丝。Skill 可以自己进化，但进化结果要让人看 diff。维护者审的是规则变化，而不是重新读一堆散乱 issue。

## 验收别看它像不像聪明

这个流程跑起来后，验收标准不要写成“分类更准了”这种空话。我会看四个具体信号。

- 新 issue 是否都能稳定产出标签、评论和版本标记
- 维护者纠正后，第二天的外循环是否能抓到
- 标签漂移是否被优先提炼成规则
- PR diff 是否只改 `Learned guidelines` 和版本号

如果这四项都成立，这个 Skill 就开始有了记忆。它不是一次 prompt 调优，而是把维护者的日常动作变成规则更新素材。

## 常见坑是把循环做得太满

第一个坑，是把 triage Skill 写成万能助理。它又分类、又修复、又写总结，最后每个环节出错都很难归因。最小场景只做分类，反而更容易收敛。

第二个坑，是把单个 issue 的纠正原样写回规则。这样会得到一堆碎片句子，短期看像变细了，长期看就是新的维护债。

第三个坑，是让 Agent 自动合并自己的规则更新。Warp 这套流程给我的启发正相反，自动化负责发现 diff，人负责接受 diff。

你要是有一个开源仓库，我建议先拿非核心仓库试三天。只接入三分类，只收 14 天窗口，只允许开 PR，不让它自动合并。等 PR 里的 Learned guidelines 真能让维护者点头，再扩到 code review、bug 修复或事件响应。

真正省力的 Agent 规则，不是你手写得更长，而是它能从你已经在做的反馈里长出来。

## 相关链接

- 原始讨论，https://x.com/chenchengpro/status/2067265619159081028

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
