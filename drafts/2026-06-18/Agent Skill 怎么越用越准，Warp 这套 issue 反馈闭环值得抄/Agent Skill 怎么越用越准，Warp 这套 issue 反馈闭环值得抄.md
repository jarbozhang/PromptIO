---
title: Agent Skill 怎么越用越准，Warp 这套 issue 反馈闭环值得抄
status: draft
date: '2026-06-18'
source: manual
source_url: https://x.com/chenchengpro/status/2067265619159081028
angle: >-
  用 Warp CEO 提到的双层循环做一个可复用方法：内循环负责每次 issue triage，外循环从点赞、纠正、标签漂移里提炼规则，再把 Skill 当文件开 PR 更新。读者关心的是如何让
  Agent 技能从一次性 prompt 变成会复盘的工作流。
voice: first-person
reach: 8
tags:
  - Agent
  - Skill
  - Warp
  - GitHub
  - 工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Agent Skill 怎么越用越准，Warp 这套 issue 反馈闭环值得抄
wechat_title: ''
cover:
  status: skipped
reach_note: Agent loop 和 Skill 自我改进是开发者高关注题，GitHub issue triage 是可落地场景。
selection_reason: 这是今天 X 里最有方法论价值的中文素材，能补足 release 文章之外的工作流思考。
---

# Agent Skill 怎么越用越准，Warp 这套 issue 反馈闭环值得抄

很多 Agent Skill 失败，不是因为 prompt 写得差，而是因为它永远停在第一版。

我看到 Warp CEO Zach Lloyd 提到的这套做法，最有价值的地方不是“让 agent 自动分 issue”，而是把反馈变成 Skill 的版本更新。也就是说，Skill 不再是一次写完的提示词，而是一份会被 review、会开 PR、会留下 diff 的工作流文件。

如果你正在做 code review agent、bug triage、客服分流、事件响应，甚至团队内部的自动化助手，这套双层循环都很适合抄一遍。它不要求你一开始就做复杂平台，先从 GitHub issue 这种已有反馈场里拿信号就够了。

## 先把一次判断做稳

Warp 这套例子从 GitHub issue 三分类开始。

每来一个新 issue，GitHub Action 触发云端 agent 跑 triage Skill，把 issue 分到三档里。

- ready-to-implement，信息够了，可以进入实现
- needs-info，缺关键上下文，需要追问
- duplicate，疑似重复问题

agent 做完分类后，会打标签，并发一条评论。评论里带一个隐藏标记，例如 `oz-triage v:N`，再让维护者用 👍 或 👎 给反馈。

这个内循环解决的是“每次来一个 issue，谁先帮我判断”。它不是最难的部分，但必须先做稳。因为后面所有复盘，都依赖这些分类结果、标签变化和人工反馈。

我会把这里理解成一个很小的交付形态，先别想着 agent 能不能把整个仓库运营起来。先让它只回答一个问题，当前 issue 到底该进哪一类。

## 再让反馈自己浮上来

真正有启发的是外循环。

每天有一个定时 agent 拉取近 14 天所有被分类过的 issue，然后收集三类信号。

- 评论里的赞踩，维护者认为这次判断是否靠谱
- 人工纠正回复，维护者指出为什么分错
- 标签漂移，比如人把 `ready-to-implement` 改成 `needs-info`

这里我最看重第三类。

标签漂移比一句“这个不对”更强，因为它是维护者真实改动后的结果。维护者不一定有时间写长反馈，但他会把标签改到正确位置。这个动作天然就是 ground truth。

所以这套方法的关键不是额外建一个标注后台，而是承认反馈本来就藏在工作流里。issue 标签、评论、人工纠正，都是低成本信号。你要做的不是催人填表，而是把这些变化捞出来。

## 把错误提炼成可复用规则

外循环不能只做“这个 issue 下次别分错”。那样只是给单点打补丁，Skill 很快会变成一堆例外。

Warp 这个例子里更重要的一步，是把信号提炼成可泛化规则。

比如维护者多次把崩溃类 issue 从 `ready-to-implement` 改成 `needs-info`。外循环不应该写成“issue #1234 应该归 needs-info”，而应该抽成一条规则。

“崩溃报告缺 OS 版本号时，一律归 needs-info。”

这句话才值得进入 Skill 的 Learned guidelines 段。

我认为这正是 Agent Skill 和普通 prompt 最大的分界线。普通 prompt 追求一次写对，Skill 应该追求持续变准。一次错误如果不能沉淀成规则，它就只是客服记录。一次错误能变成 diff，它才开始有工程价值。

## 这里最容易踩坑

我会避开一个诱惑，不让 agent 自动改 main。

Warp 的做法是，外循环把规则写进 Skill 文件，版本号 +1，然后开 PR 让人 review 合并。它永远不自动改 main。

这个限制很关键。因为 Skill 的改动看起来像文本，其实是在改系统行为。你让 agent 自动把“经验”合进主分支，就等于让它在没有审查的情况下调整判断标准。

更稳的路径是让 agent 负责整理证据和提案，人负责确认规则是否真的泛化。

可收藏的落地清单可以这样写。

- 适合谁，维护 GitHub issue、代码评审、bug 修复、事件响应流程的人
- 怎么做，先选一个只有 3 到 5 个分类结果的任务
- 坑点，不要把单个错误直接写进 Skill，要抽成可复用规则
- 下一步动作，先记录赞踩、人工纠正、标签漂移三类信号
- 交付形态，让 agent 开 PR 更新 Skill 文件，而不是直接改主分支

这套方法看起来慢一点，但它保留了工程团队最需要的审查入口。

## 从一个仓库开始复刻

如果我要在自己的项目里抄这套方法，我不会先做完整平台。

我会先选一个重复、低风险、结果可验证的任务，比如 issue triage。然后只建两个循环。

第一层，来了新 issue 就跑一次 Skill，输出分类、标签和评论。

第二层，每天定时回看最近 14 天的结果，找赞踩、纠正和标签漂移，把稳定出现的错误写成 Learned guidelines，再开 PR。

这里的重点不是自动化有多酷，而是 Skill 终于进入了软件工程流程。它有版本号，有 diff，有 review，有合并记录。团队讨论的对象也从“这个 agent 怎么又乱分”变成“这条规则该不该进入 Skill”。

这就是我觉得 Warp 这套 issue 反馈闭环值得抄的原因。

不要把 Agent Skill 当成一段神奇 prompt。把它当成一份会成长的文件，然后给它配上反馈、复盘和 PR。Agent 的长期能力，很多时候就是这么一行一行长出来的。

## 相关链接

- 原始讨论，https://x.com/chenchengpro/status/2067265619159081028
- Warp，https://www.warp.dev/
