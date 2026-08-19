---
title: Patch release v5.13.1
url: 'https://github.com/huggingface/transformers/releases/tag/v5.13.1'
source: Transformers Releases
source_type: rss
language: en
published: '2026-07-11T09:15:36.000Z'
fetched_at: '2026-08-19T11:02:43.367Z'
---
Patch release v5.13.1
This patch is focused on enabling transformers for the latest release of vllm!
Be more defensive with remap_legacy_layer_types for custom models (#47245) from @hmellor
Fix custom code which doesn't know about the new linear layer type names (#47174) from @hmellor
Fix case where _LazyAutoMapping.register is passed a str key (#47148) from @hmellor
