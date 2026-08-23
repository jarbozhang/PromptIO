---
title: 'b9967: server: accept null sampling params (#25538)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9967'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-10T20:07:29.000Z'
fetched_at: '2026-07-11T23:02:27.970Z'
---
server: accept null sampling params
Extend the schema validation to treat a null value as absent, so
Add has_field() to skip null in the field eval guards.
has_field -> has_value​
