---
title: >-
  llama.cpp PR reports up to 169% faster quantized-KV decode at 118K context on
  Intel Battlemage from one SYCL kernel switch
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vi6hmw/llamacpp_pr_reports_up_to_169_faster_quantizedkv/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T17:09:01.000Z'
fetched_at: '2026-08-08T11:01:01.043Z'
---
A fresh llama.cpp PR (#26689) changes what looks like a tiny SYCL FlashAttention dispatch decision.
 With a quantized KV cache ("q4_0" / "q8_0"), decode was being sent through the VEC kernel. On the author's Battlemage test system, switching that path to TILE gets much faster as context grows.
 Some of the author-reported results, MTP off:
 - Qwen3.6-35B, q4_0 KV @ 118,784: 12.99 → 29.61 t/s (+127.9%)
 - Qwen3.6-35B, q8_0 KV @ 118,784: 12.90 → 31.80 t/s (+146.5%)
 - Gemma 4 12B, q4_0 KV @ 118,784: 5.06 → 13.59 t/s (+168.7%)
 - Gemma 4 12B, q8_0 KV @ 118,784: 5.13 → 13.81 t/s (+168.7%)
 It isn't only the extreme 118K point either. At 32K, the same JIT tests show roughly +42% to +74% on the tested Qwen/Gemma configs.
 The interesting part is how small the actual idea is. The PR basically changes the dispatch gate so quantized-KV decode selects TILE instead of being forced through VEC, and adds "GGML_SYCL_FA_DECODE_KERNEL=vec|tile|auto" so it can be A/B tested.
 Big caveats:
 - PR is open, not merged
 - these are mostly author-reported benchmarks
 - the exact Battlemage GPU SKU isn't specified in the PR
 - this specifically targets quantized KV; F16 keeps the existing dispatch
 - one 118K MTP test only improved 17.65 → 20.14 t/s (+14.1%)
 - backend tests pass 4001/4001, but there isn't an independent hardware sweep yet
 The PR also relays a Laguna-S-2.1 Discord test showing +50% at 64K and +68% at 118K, but I'd still like to see proper independent results.
 Anyone with a B580 or B70 able to reproduce this at 64K/118K? I'm especially curious whether the huge gain survives with MTP enabled.
    submitted by    /u/BTA_Labs  
 [link]   [comments]
