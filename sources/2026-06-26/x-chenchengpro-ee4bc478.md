---
title: >-
  最近大家都在聊 agent 的「loop」，但很少人讲清它到底是什么。Warp CEO Zach Lloyd 给了一个能落地的版本：让 Skill
  从反馈里自我进化的双层循环，以 GitHub issue 三分类为例。 内循环：每来一个新 issue，GitHub Action 触发云 agent 跑
  triage Skill，自动分到 ready-to-i
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2067265619159081028'
date: 'Wed Jun 17 15:18:26 +0000 2026'
likes: 546
reposts: 90
replies: 33
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-25T23:00:31.951Z'
---
最近大家都在聊 agent 的「loop」，但很少人讲清它到底是什么。Warp CEO Zach Lloyd 给了一个能落地的版本：让 Skill 从反馈里自我进化的双层循环，以 GitHub issue 三分类为例。

内循环：每来一个新 issue，GitHub Action 触发云 agent 跑 triage Skill，自动分到 ready-to-implement / needs-info / duplicate 三档，打标签并发一条带隐藏标记 oz-triage v:N 的评论，求 👍/👎。

外循环：每天一个定时 agent 拉取近 14 天所有被分类的 issue，收集三类信号，评论赞踩、人工纠正回复，还有「人把标签从 ready 改成 needs-info」这种标签漂移（最强 ground truth）。然后把信号提炼成可泛化规则，比如别盯着单个 issue 改，而是写成「崩溃报告缺 OS 版本号一律归 needs-info」，再塞进 Skill 的 Learned guidelines 段、版本号 +1，开 PR 让人 review 合并，永不自动改 main。

要点就一句：Skill 就是文件，改进 = 对文件做 diff；反馈天然藏在 issue 标签和评论里，零额外标注成本。同样适用于 code review、bug 修复、事件响应；目标明确时可用自动 grader 替代人工。Warp 已用它管理自家开源仓库并开源了框架（oz-for-oss）。
