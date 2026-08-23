---
title: >-
  Top-N-Sigma: Remove unconditional softmax+sort by TimNN · Pull Request #22645
  · ggml-org/llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ucqs1k/topnsigma_remove_unconditional_softmaxsort_by/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T17:18:14.000Z'
fetched_at: '2026-06-23T01:34:58.966Z'
---
Overview
 Currently, the Top-N-Sigma sampler does an unconditional softmax+sort at the end.
 In the (common, I believe) case of Top-N-Sigma being followed by Dist, this expensive work is completely wasted.
 Additional information
 On my M3 Max MacBook Pro, this PR increases the t/s for google_gemma-4-E4B-it-Q8_0 by 50%, from ~30t/s to ~45t/s, reducing the time per token by 10ms.
 (I'm not sure about the exact API contract between chained samplers and don't know if this might adversely affect other sampler chains that might rely on the current behavior).
  
That's a good % & t/s. Wish this had more t/s stats with few more models.
 Somebody please give us Tiny ELI5 version for this if possible. But let us know whether this is applicable for all backends & all models? Thanks
    submitted by    /u/pmttyji  
 [link]   [comments]
