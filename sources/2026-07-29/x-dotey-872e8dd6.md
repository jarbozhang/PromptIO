---
title: >-
  一般来说没必要去省那一点 token，如果是图文、带图表的还是 pdf 最简单省事。 费力去转 Markdown + 图片，看起来省
  Token，但是导致信息损耗，本来多模态模型可以一页一页“看”内容，换成markdown+图片，图片、图标部分由于分离出去了反而不利于模型理解上下文导致信息损耗。
  再说 Token 消耗，现在 Agent 消耗 Token 的
source: X @dotey
url: 'https://x.com/dotey/status/2082148581377720467'
date: 'Tue Jul 28 16:58:00 +0000 2026'
likes: 151
reposts: 3
replies: 26
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-29T11:04:48.981Z'
---
一般来说没必要去省那一点 token，如果是图文、带图表的还是 pdf 最简单省事。

费力去转 Markdown + 图片，看起来省 Token，但是导致信息损耗，本来多模态模型可以一页一页“看”内容，换成markdown+图片，图片、图标部分由于分离出去了反而不利于模型理解上下文导致信息损耗。

再说 Token 消耗，现在 Agent 消耗 Token 的大头，不是输入的 token，而是各种 skills、反复调用工具。

而且有 Prompt Caching，输入的 Token 多一点少一点对于最终成本已经差别没那么大了。
