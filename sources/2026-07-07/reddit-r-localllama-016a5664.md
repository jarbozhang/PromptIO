---
title: >-
  I asked Codex to optimize DeepSeek V4 Flash 8-bit MLX on oMLX. Got ~1.6x
  prefill and ~3x decode speedup.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uogebv/i_asked_codex_to_optimize_deepseek_v4_flash_8bit/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T23:06:31.000Z'
fetched_at: '2026-07-06T23:01:08.259Z'
---
Follow-up to my earlier posts:
  
Should I sell my Mac Studio? https://www.reddit.com/r/MacStudio/s/GK7QP8Lg87
 Kimi benchmark: https://www.reddit.com/r/LocalLLaMA/s/ujBsYLYmpd
  
Short version: my Mac Studio was sitting mostly idle, and from those Reddit threads I learned about DS4 and then oMLX. DS4 got me running DeepSeek V4 locally, but I wanted the 8-bit MLX version because I worry about accuracy loss in 4-bit variants.
 So I tried mlx-community/deepseek-ai-DeepSeek-V4-Flash-8bit, the 302GB 8-bit affine MLX model, and asked Codex to optimize oMLX for the model.
 I am not an oMLX/Metal kernel expert, so I am sharing this partly to sanity-check the work. Codex claims the changes should not reduce accuracy, and my Hermes/tool-calling runs look fine so far, but I would appreciate review from people who understand this stack better.
 Base oMLX work
 DeepSeek V4 support/tool calling came from oMLX DeepSeek V4 DSML/template/parser work, especially:
 https://github.com/jundot/omlx/pull/2048
 There were also follow-up fixes for DSML/tool-call stopping, parser-side stop behavior, prompt/prefix-cache determinism, shared expert SwiGLU clamp behavior, and native DeepSeek V4 2-bit/3-bit Metal paths.
 The work below was separate: it focused on making the 8-bit affine model faster while keeping the same 302GB model format.
 What changed for 8-bit affine
 The issue was that DeepSeek V4 Flash 8-bit affine MoE was falling back to slower generic affine paths instead of using native DeepSeek MoE Metal kernels.
 Codex changed:
  
Enabled native DeepSeek affine MoE kernels for bits=8, group_size=64
 Added 8-bit affine Metal kernel instantiations
 Replaced some generic route sorting with bucket/counting route paths
 Set route_sort_min_routes=1 so the native route path is used earlier
 Added route-indexed decode kernels to avoid route sort/materialization overhead during decode
 Tuned affine8 dequant/load with a uint32 load specialization
 Verified DeepSeek V4 parser/template and OpenA
