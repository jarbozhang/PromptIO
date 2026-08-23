---
title: 'b10121: ui: reduce per-token render cost when streaming  (#26053)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10121'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-24T20:09:46.000Z'
fetched_at: '2026-07-26T11:01:41.103Z'
---
performance harness - the empirical root
Assisted-by: Claude Opus 4.8
210.36ms -> 2.67ms per streamed token
Assisted-by: Claude Opus 4.8
11.58ms -> 0.62ms per streamed token
Assisted-by: Claude Opus 4.8
22.02ms -> 3.33ms per streamed token
Assisted-by: Claude Opus 4.8
3.07ms -> 1.36ms per streamed token at 40 messages
Assisted-by: Claude Opus 4.8
Co-authored-by: Zach Winter dmtommy@icloud.com
