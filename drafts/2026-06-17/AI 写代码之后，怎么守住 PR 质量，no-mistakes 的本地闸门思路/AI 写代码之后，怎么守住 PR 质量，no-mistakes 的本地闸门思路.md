---
title: AI 写代码之后，怎么守住 PR 质量，no-mistakes 的本地闸门思路
status: draft
date: '2026-06-17'
source: manual
source_url: https://x.com/chenchengpro/status/2063991395543859443
angle: >-
  把 no-mistakes 拆成可复用的代码交付门禁思路：隔离 worktree、九步流水线、三态 finding、自动修复轮次和人工批准点。读者关心的是 Agent
  写得越快，越需要一个不污染工作区、能拦住低质量 diff 的检查口。
voice: first-person
reach: 8
tags:
  - AI编程
  - 代码审查
  - Agent
  - PR质量
  - 工程工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: AI 写代码之后，怎么守住 PR 质量，no-mistakes 的本地闸门思路
wechat_title: ''
cover:
  status: skipped
reach_note: Codex、Claude Code 等 coding agent 场景明确，质量闸门是痛点，开发者可照着改自己的流程。
selection_reason: 它不是单纯工具介绍，而是命中 AI 编程后的验证瓶颈，适合转成工程实践文章。
---

# AI 写代码之后，怎么守住 PR 质量，no-mistakes 的本地闸门思路

AI Agent 写代码越快，我越觉得真正危险的不是它不会写，而是它把一堆看起来能跑的 diff 推到你面前，让你用人肉注意力兜底。

no-mistakes 这类工具提醒了我一件事，AI 写代码的瓶颈已经从 produce diff 挪到了 validate diff。代码生成只是前半段，后半段要有一个不污染工作区、能拦住低质量 diff 的本地检查口。

如果你已经在用 Claude Code、Codex、OpenCode 之类的工具写代码，这篇更适合收藏。重点不是照搬某个 Go 工具，而是把它的门禁设计拆出来，用在自己的团队交付流程里。

## 先把 PR 当成需要过闸的货物

no-mistakes 的核心设计很直接，它在你的仓库和真实远端之间，塞了一个本地裸仓库。

你不是直接 push 到 origin，而是 push 到 no-mistakes 这个 remote。origin 不被劫持，普通 push 仍然照常存在，这点我很喜欢，因为它没有把团队现有 Git 习惯改成一个黑箱。

push 之后，它不会在你当前工作目录里折腾。hook 通知一个常驻 daemon 后立刻退出，真正的检查发生在一次性 worktree 里。

这就解决了我最在意的问题，门禁不能把我的工作区弄脏。

我最怕那种自动修复工具，一边说帮你改好，一边在当前目录里留下半截格式化、半截重写、半截没跑完的状态。no-mistakes 这条路更像仓库旁边开了一个临时检票口，东西先在那边拆包、检查、修补，全过了再进入正式 PR。

## 把九步流水线抄成团队规范

它的固定流水线是 intent、rebase、review、test、document、lint、push、pr、ci。

这不是随便排的。review 放在 test 前，是为了让 agent 先读原始的新代码，不要等测试失败和自动修复混在一起后再判断。lint 放到后面，是为了避免代码还会继续变的时候反复 churn。

这个顺序对团队更有参考价值。

可收藏的门禁清单可以这样拆。

- 入口，所有 AI 生成 diff 先推到门禁 remote，不直接进入正式 PR
- 隔离，检查发生在一次性 worktree，不碰开发者当前目录
- 意图，先记录这次改动到底想解决什么，再判断 bug 和设计选择
- 审查，review 先于 test，让 agent 面对干净的新代码
- 测试，失败可以进入自动修复，但轮次必须有上限
- 文档，改动影响文档时一起补，不把说明债留到合并后
- lint，放在靠后位置，减少无意义反复格式化
- PR，全过后再开干净 PR
- CI，最后用远端检查兜底，不把本地判断当作最终真理

这套东西最适合 Agent 写得很快、但团队还没建立交付边界的场景。个人项目也能用，但它真正的价值在多人协作里，因为它把“谁来为 AI diff 负责”这件事前移了。

## 用三态 finding 管住自动修复

no-mistakes 最值得抄的不是九步，而是 finding 的三态 action。

它把发现的问题分成 auto-fix、ask-user、no-op。auto-fix 自动修，ask-user 暂停问人，no-op 只提示。

这个设计很克制。

很多自动审查工具的问题是，它把所有不确定都当成“我来修”。结果就是 agent 看到一段刻意删掉的逻辑，自动给你塞回来；看到一个有意为之的架构选择，按自己的偏好重构一遍。

no-mistakes 把 ask-user 专门留给需要判断的事，比如它质疑你是不是有意做了某个设计选择。review 默认必须人工批准，其余环节默认允许 3 轮自动修。

我的判断是，自动修复最怕没有刹车。

3 轮这个数字本身不神奇，关键是团队必须明确两件事，一是 agent 可以修什么，二是什么必须停下来问人。没有这个边界，自动修复越努力，PR 越难审。

## 让意图记录帮你降误报

来源里还有一个细节，我觉得很适合做成团队实践。

no-mistakes 会从本地 Claude Code、Codex、OpenCode 的 transcript 里推断 intent，也就是这次改动原本想做什么。这个 intent 用来区分“有意为之”和“真 bug”。

比如你删除一段兼容逻辑，普通 review 很容易只看到风险。但如果 intent 里清楚写着这次就是要移除旧路径，审查就不会把它简单判成误删。

这也是 Agent 交付里常被低估的一步，代码上下文不等于任务上下文。

如果你的团队暂时不接 no-mistakes，也可以先把 intent 做起来。每次让 Agent 写代码前，留下三句话就够。

- 这次改动要解决哪个问题
- 哪些行为必须保持不变
- 哪些旧逻辑允许删除或替换

后面的 review、test、document 都围绕这三句话跑，误报会少很多，人工审查也更容易聚焦。

## 先用一个低风险仓库试门禁

我不会建议一上来就把这种门禁接到核心仓库。

更稳的做法是先拿一个低风险项目，跑完整的交付路径。不是为了证明工具多强，而是验证你的团队能不能接受这个节奏。

建议从这 4 个动作开始。

- 建一个 no-mistakes remote，保留 origin 的普通 push 路径
- 用一次性 worktree 跑检查，确认不会污染当前工作区
- 把 review 设置成人工批准点，先不要急着全自动
- 给自动修复设置轮次上限，失败后保留上下文给人处理

交付形态也别想复杂。最后只要得到一个干净 PR、清楚的检查记录、能追溯的 intent，就已经比“Agent 写完，人眼硬审”稳定很多。

信息来自 no-mistakes 的公开说明和原始讨论。真正落到团队仓库前，最值得先验证的不是 slogan，而是隔离 worktree、人工批准点和自动修复上限这三件事。

## 相关链接

- 原始讨论，https://x.com/chenchengpro/status/2063991395543859443
- no-mistakes 工具入口，https://t.co/I3Vwgq4ZLl

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
