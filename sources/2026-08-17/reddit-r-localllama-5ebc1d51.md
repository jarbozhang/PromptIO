---
title: 'Qwen3.8-27b on RTX 3090 - 82 tps single request, up to 672 tps peak'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vq6fdj/qwen3827b_on_rtx_3090_82_tps_single_request_up_to/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T19:38:07.000Z'
fetched_at: '2026-08-17T11:01:38.922Z'
---
Hi,
 After a long night of optimizations, I believe I have made the fastest inference engine for Qwen3.6-28B on a 3090.
 Quick metrics:
 - 250w power capped
 - Up to 195k context (ships with 150k for safety though)
 - 82 tps single request, 417 tps sustained with 64 concurrent
 - Between 17% to 149% faster than ninfer depending on the amount of concurrent requests.
 Quick how:
 - W4A16 quantization -> 16.8gb in vram - cache 66k
 - + fp8 KV cache -> 16.8 gb in vram - cache 155k
 - + lm_head int8 -> 15.4 gb in VRAM - cache 192k
 - + embed_tokens int8 -> 14.2 gb in VRAM - cache 200k
 Quantization loss of 0.6% in the lm head and quant embed compared to bf16.
 It runs via vLLM and needs a few patches to work perfectly, but should be easier to setup than ninfer.
 Also only tested on linux, but should work on windows too.
 https://github.com/syv-ai/qwen38-27b-rtx3090
    submitted by    /u/iamMess  
 [link]   [comments]
