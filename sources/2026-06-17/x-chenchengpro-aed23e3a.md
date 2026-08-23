---
title: >-
  Perplexity 刚发了篇论文，用自家两款产品做对照，把「Agent 到底比 Chat
  强在哪」量化了出来。它的价值不在答得更快，而在把人原本要手动编排的整段活儿吃掉了。 对照组很干净：Search
  是对话式搜索助手（你问它答），Computer 是端到端自主 Agent（给目标它自己干完）。方法是把「初始 query 几乎相同」的会话配对，当作同一任务
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2064299084241051758'
date: 'Tue Jun 09 10:50:29 +0000 2026'
likes: 52
reposts: 5
replies: 2
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-17T03:16:02.868Z'
---
Perplexity 刚发了篇论文，用自家两款产品做对照，把「Agent 到底比 Chat 强在哪」量化了出来。它的价值不在答得更快，而在把人原本要手动编排的整段活儿吃掉了。

对照组很干净：Search 是对话式搜索助手（你问它答），Computer 是端到端自主 Agent（给目标它自己干完）。方法是把「初始 query 几乎相同」的会话配对，当作同一任务被两款产品分别尝试的自然实验来比。

几个数字：单次会话里，Computer 替你执行 26 分钟的自主工作，Search 只有 33 秒，差约 47 倍；配对任务上，完成时间从 269 分钟压到 36 分钟，相比「人 + 仅用 Search」，时间省 87%、成本省 94%。自主也不等于失控——Computer 每条 query 的不满意率反而比 Search 低 55%。

它还改变了人的行为。机器接管底层执行后，用户的后续动作从「下一步搜什么」转向验证和扩展，更像监工而非干活；人也开始敢做以前不会做的事，比如把多个相互依赖的子任务打包进一条 query，解锁一批在 Search 里几乎不存在的工作类型。

一条因果链：自主性 → 效率 → 广度。给做 Agent 产品的人提个醒：别再用「单轮回答好不好」这种 Chat 指标去评估 Agent，要看它接管了多长的自主工作链、把人腾出来去做多高阶的事。（数据为厂商自评，绝对数字当方向性证据看。）

https://t.co/qqJRkNXUSq
