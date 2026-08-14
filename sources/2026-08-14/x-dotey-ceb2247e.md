---
title: >-
  我最近在 ~/.claude/CLAUDE.md 里面加了一段提示词，让它多开 SubAgent（Opus）去执行，这样我默认开 Fable 5
  High，Token 消耗也不算厉害。 Fable 5 则主要做需求澄清、方案拆解、任务分发和结果验收。 之所以不用 Opus 5 是因为太太太慢了，而且
  Token 消耗巨大！ --- 注意你的主要任务是分析、编
source: X @dotey
url: 'https://x.com/dotey/status/2088099630005264748'
date: 'Fri Aug 14 03:05:21 +0000 2026'
likes: 140
reposts: 16
replies: 64
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-14T11:13:14.717Z'
---
我最近在 ~/.claude/CLAUDE.md 里面加了一段提示词，让它多开 SubAgent（Opus）去执行，这样我默认开 Fable 5 High，Token 消耗也不算厉害。

Fable 5 则主要做需求澄清、方案拆解、任务分发和结果验收。

之所以不用 Opus 5 是因为太太太慢了，而且 Token 消耗巨大！

---

注意你的主要任务是分析、编排和验证，具体任务尽可能交给 subagent（Opus）去执行。当主 agent 是 Fable 5 时尤其如此：自己只做需求澄清、方案拆解、任务分发和结果验收，实现类工作（读大量代码、写代码、跑测试、批量修改）一律用 Agent 工具派给 Opus subagent 执行。
