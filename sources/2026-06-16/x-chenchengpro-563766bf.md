---
title: "Cloudflare CTO 随口问了句\"大家都怎么用 loops?\"，三分钟后自己补刀\"To orchestrate agents\"，结果 245 条回复把 2026 年中 AI agent 圈最热"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2063990991627886839"
date: "Mon Jun 08 14:26:14 +0000 2026"
likes: 445
reposts: 54
replies: 47
source_type: x
---

Cloudflare CTO 随口问了句"大家都怎么用 loops?"，三分钟后自己补刀"To orchestrate agents"，结果 245 条回复把 2026 年中 AI agent 圈最热的"循环"玩法扒了个底朝天。

真正有料的就四类。CI/PR 保姆：循环盯 CI 跑绿、监控 PR 评论、改完自动同步 README 和下游文档，有人让 agent 每小时醒一次推进上百个 codemod、冲突时自动 rebase。eval 反馈循环：prompt→调工具→观察→更新状态→重复到命中停止条件，真正的难点是"何时回炉重跑 vs 何时升级交给人"。状态机：XState 作者直接降维，"给 loop 加几个节点和边就叫 state machine"，agent 在这种确定性结构里跑得最稳。orchestrator 扇出：一个高配主 agent 把活分给 2-3 个独立会话、干完汇报、再决定追问还是收工。

沉淀下来的设计共识高度一致：小而窄、带记忆、有明确停止条件的循环，远胜一个巨型自主 prompt；而停止条件绝不能是"token 烧完"——大多数 loop 不过是没有回滚的 retry，很多人还在为优雅度求解，其实该为延迟求解。

当然泼冷水的也一大片：有人说这就是 loop=goal=无尽烧 token，还会极度放大幻觉；有人讽刺这是"进大厂 + 鼓吹每几天烧 10 亿 token"的估值游戏；还有人吐槽"人人都在解释、没人给一个例子，史上最怪的 AI 趋势"。
