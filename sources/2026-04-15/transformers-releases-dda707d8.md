---
title: 'Patch release: v5.5.2'
url: 'https://github.com/huggingface/transformers/releases/tag/v5.5.2'
source: Transformers Releases
source_type: rss
language: en
published: '2026-04-09T14:05:16.000Z'
fetched_at: '2026-04-15T02:22:38.535Z'
---
Small patch dedicated to optimizing gemma4, fixing inference with use_cache=False due to k/v states sharing between layers, as well as conversion mappings for some models that would inconsistently serialize their weight names. It contains the following PRs:
Add MoE to Gemma4 TP plan (#45219) by @sywangyi and @Cyrilvallez
[gemma4] Dissociate kv states sharing from the Cache (#45312) by @Cyrilvallez
[gemma4] Remove all shared weights, and silently skip them during loading (#45336) by @Cyrilvallez
Fix conversion mappings for vlms (#45340) by @Cyrilvallez
