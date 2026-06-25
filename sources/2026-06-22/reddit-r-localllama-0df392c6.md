---
title: Gemma 4 QAT seems to respond significantly better to KV cache quantization
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubl0df/gemma_4_qat_seems_to_respond_significantly_better/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T08:48:13.000Z'
fetched_at: '2026-06-22T04:12:20.730Z'
---
Results from KL Divergence on wikitext with 16k context
 I know some users, including myself, were disappointed with Gemma 4's sensitivity to KV cache quantization. Seems like Q8_0 on QAT models might be back on the menu.
 KLD measures divergence from the base (in this case, full 16-bit KV cache). 99.9% KLD is a pretty good metric for measuring how much KV quantization affects model performance, particularly how well it can keep attention on rare high-importance tokens.
 My hardware isn't up to testing 31B, if anyone else feels like investigating it would be interesting
    submitted by    /u/rima_2711  
 [link]   [comments]
