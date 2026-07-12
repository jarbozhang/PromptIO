---
title: >-
  **Your $80 Tesla P100 has been doing silently noisy math in llama.cpp for
  years. Three lines fix it, for free.**
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu6p9o/your_80_tesla_p100_has_been_doing_silently_noisy/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T05:41:12.000Z'
fetched_at: '2026-07-12T23:01:41.972Z'
---
## TLDR;
 Shipped — in turboquant v0.3.0, downloadable now. https://github.com/TheTom/llama-cpp-turboquant/releases/tag/tqp-v0.3.0
 llama.cpp's CUDA code has a flag that means "this GPU is fast at fp16, so do the math in fp16."
 The GTX 10-series and P40's (sm_61) were exempted from it long ago. The P100 (sm_60) was not, 
 ironically, because it's the one Pascal card with fast fp16 hardware. Nvidia put fast FP16
 silicon on the P100, so it makes total sense they'd want to tap into that extra performance. 
 What they didn't check, apparently, was the price.
 PR Status: TheTom (merged) https://github.com/TheTom/llama-cpp-turboquant/pull/212
 spiritbuun (edit:merged) https://github.com/spiritbuun/buun-llama-cpp/pull/80 
 GGML: Strict Policy on AI-assisted code contributions. I'll try and get around
 to hand-writing an issue for them. Highly suggest one of the forks above as an alternative.
 Edit 7/12/26: Decided to write the issue for GGML, this needs to be fixed. https://github.com/ggml-org/llama.cpp/issues/25593
 The patch is 3 lines.
 ## Body
 A few days ago I was benchmarking buun's new KV-cache codec on my quad-P100 box and comparing notes with the numbers buun was getting on his 3090 — the same model kept showing systematically different quality floors between our machines. I thought everything was the same? Normally, I'd probably just think there's way too many variables between all this code to chalk it up to any one thing… I decided it was worth chasing. It was. And it led me to a serious bug that's been sitting in llama.cpp for years.
 So I measured it. Against fp32-reference logits (KL divergence over the full distribution, Qwen3.6-27B, wikitext-2):
 Headline:
 - **Median KLD: 0.0023 → 0.000001** (~2300× tighter)
 - **Top-token agreement: 96.5% → 99.9%** — stock, about 1 in 29 of the model's next-token
 picks were different from what the math says they should be
 **What's the extra math cost me in performance?** I benchmarked prefill and decode at 8k depth o
