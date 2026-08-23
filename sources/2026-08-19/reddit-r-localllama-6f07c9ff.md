---
title: 'Qwen3.8-27B on 2x 3090 + vLLM + DFlash2: 218 tok/s single request'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsccit/qwen3827b_on_2x_3090_vllm_dflash2_218_toks_single/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T04:39:19.000Z'
fetched_at: '2026-08-19T11:01:44.119Z'
---
I hacked this together so there's probably more on the table in terms of performance.
 Measured with the Club-3090 canonical bench suite (bench.sh, 3 warmups + 5 measured runs, temp 0.6 / top_p 0.95 / top_k 20).
  
Prefill: 1342 tok/s @ 10k, 628 tok/s @ 90k
 Spec-decode: 7 draft tokens, acceptance length 3.35, 47.8% acceptance
 Peak VRAM: 22.3 GB/card
 Context ceiling: 131k (DFlash2 drafter eats ~13.5 GB)
 Used Kimi K3 for all the VLLM fixes
  
 
 Metric Narrative Code 
  
 Decode TPS 120.1 218.3 
  Wall TPS 117.7 204.8 
  TTFT 168 ms 178 ms 
 
 Stack
  
2× RTX 3090 (PCIe Gen4 x16/x16, no NVLink, patched P2P)
 Power capped 220/250 W
 Bare-metal vLLM v0.26.1rc1 + AutoRound INT4 (group 128) + DFlash2 draft model
 Custom vLLM changes that made it boot cleanly: https://github.com/oceanplexian/vllm/pull/1
  
   submitted by    /u/xjx546  
 [link]   [comments]
