---
title: 'b10380: chat : fix muse-glimmer detection of tool calls after EOM (#26879)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10380'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-11T20:15:20.000Z'
fetched_at: '2026-08-12T11:02:24.736Z'
---
chat : fix muse-glimmer swallowing a trailing tool call into content
Muse Glimmer routinely answers the user and calls a tool in a single
<prose><|eom|><|start|>assistant to=<tool><|message|><atem:function_calls>...


The final-message rule read content with until("<|eot|>"), which assumed the
Stop the answer at <|eom|> and parse what follows as tool calls.
Adds models/templates/muse-glimmer.jinja and four parser tests: a plain
address comment
