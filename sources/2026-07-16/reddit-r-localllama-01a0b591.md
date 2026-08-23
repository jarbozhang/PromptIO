---
title: Recent llama.cpp updates for SYCL/Intel
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ux08xo/recent_llamacpp_updates_for_syclintel/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T08:52:17.000Z'
fetched_at: '2026-07-15T23:01:42.666Z'
---
Some fixes & boost(pp) for SYCL/Intel.
 Merged PRs:
  
[SYCL] Flash Attention with XMX engine via oneDNN graph API (SDPA) on KV f16 for Xe2 ; Qwen3.6-27b-Q8_0 prefill speed up x1.21 at p=512 and x4.26 at p=80k #25222
 sycl: Increase minimum buffer size for USM system allocations #25525
 [SYCL] Support OP XIELU #25550
 [SYCL] support conv2d_dw kernel type is fp16 #25653
 [SYCL] fix UT big error of get_rows Q2_K, Q4_K, Q5_K #25656
  
   submitted by    /u/pmttyji  
 [link]   [comments]
