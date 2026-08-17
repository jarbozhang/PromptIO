---
title: >-
  Tibo 分享了 Codex 开启 1M
  上下文的方法。不过我不是很有动力去修改，感觉当前还挺流畅的，我相信他们已经针对这个上下文调优过，只要压缩得当，上下文短一些性能会更好也更便宜。
  具体方法很简单，只要在 ~/.codex/config.toml 中设置： ``` model = "gpt-5.6-sol"
  model_context_window = 
source: X @dotey
url: 'https://x.com/dotey/status/2089094793078952339'
date: 'Sun Aug 16 20:59:46 +0000 2026'
likes: 140
reposts: 17
replies: 23
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-17T11:05:03.176Z'
---
Tibo 分享了 Codex 开启 1M 上下文的方法。不过我不是很有动力去修改，感觉当前还挺流畅的，我相信他们已经针对这个上下文调优过，只要压缩得当，上下文短一些性能会更好也更便宜。

具体方法很简单，只要在 ~/.codex/config.toml 中设置：

```
model = "gpt-5.6-sol"
model_context_window = 1000000
model_auto_compact_token_limit = 900000
```
