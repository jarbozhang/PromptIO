---
title: >-
  ggml-hip: enable -ffast-math for HIP builds by a-huk · Pull Request #23862 ·
  ggml-org/llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uoqdxj/ggmlhip_enable_ffastmath_for_hip_builds_by_ahuk/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T07:30:02.000Z'
fetched_at: '2026-07-06T23:01:08.257Z'
---
Benchmarks
 Benchmarked on gfx1151 (RDNA3.5/Strix Halo, 40 CUs) against latest master (2f6c815). These two models cover both the FA paths.
 Qwen3.5-27B Q4_K_M — head_dim=256 (TILE path), FA=1, prompt t/s:
  
 pp upstream + fast-math delta 
  
 512 307 321 +4.6% 
  2048 302 323 +7.0% 
  4096 300 312 +4.0% 
  8192 288 307 +6.6% 
  16384 263 280 +6.5% 
  32768 233 246 +5.6% 
 
 Qwen3-0.6B BF16 — head_dim=64 (MMA path), FA=1, prompt t/s:
  
 pp upstream + fast-math delta 
  
 512 9325 9642 +3.4% 
  2048 8609 8892 +3.3% 
  4096 7485 7661 +2.4% 
  8192 5770 5846 +1.3% 
  16384 3581 3636 +1.5% 
  32768 2037 2049 +0.6% 
 
 FA=0 results were essentially the same across both builds.
    submitted by    /u/pmttyji  
 [link]   [comments]
