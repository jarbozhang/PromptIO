---
title: >-
  阿里开源 Open Code Review，内部跑了两年，服务数万开发者，揪出几百万缺陷后放出来的。 不是纯靠 LLM 瞎聊，而是确定性流水线 +
  Agent 混合：精准选文件、打包关联代码、匹配规则、行级定位。覆盖不全、位置漂移、质量飘这些通用 Agent 的老毛病，它用工程约束直接压住。 支持
  diff 审查和全量扫描，兼容 OpenAI/Anthrop
source: X @IndieDevHailey
url: 'https://x.com/IndieDevHailey/status/2080556772633567511'
date: 'Fri Jul 24 07:32:44 +0000 2026'
likes: 580
reposts: 84
replies: 38
source_type: x
language: zh
account_name: IndieDevHailey
fetched_at: '2026-07-27T11:13:32.526Z'
---
阿里开源 Open Code Review，内部跑了两年，服务数万开发者，揪出几百万缺陷后放出来的。

不是纯靠 LLM 瞎聊，而是确定性流水线 + Agent 混合：精准选文件、打包关联代码、匹配规则、行级定位。覆盖不全、位置漂移、质量飘这些通用 Agent 的老毛病，它用工程约束直接压住。

支持 diff 审查和全量扫描，兼容 OpenAI/Anthropic，token 只吃通用方案的 1/9 左右。

配置个模型就能用。
