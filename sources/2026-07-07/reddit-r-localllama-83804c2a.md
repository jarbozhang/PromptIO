---
title: 'Prefill vs. decoding and local LLM ROI: is prefill underrated?'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1up9054/prefill_vs_decoding_and_local_llm_roi_is_prefill/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T20:20:52.000Z'
fetched_at: '2026-07-06T23:01:08.259Z'
---
I'm trying to understand why, when people discuss the ROI of running LLMs locally, they almost always focus on output speed (decoding) and rarely on input speed (prefill), which seems like it could have a significant impact on hardware ROI.
 Yesterday I saw a post on X where someone was running GLM 5.2 on 4 NVIDIA DGX Spark (4bit, speculative decoding, and other optimizations), achieving around 60 output tokens/s with 6 concurrent users in batch. Those are already great numbers. Assuming a hypothetical 24/7 agentic workload, that would be about 5.18 million output tokens per day, roughly $22/day using a price of $4.40 per million output tokens.
 However, from what I read, the prefill throughput on the same setup is around 3,000 tokens/s (!)
 It's true that prefill is cheaper (around $1.40 per million input tokens for GLM 5.2), but we're talking about roughly 50× higher throughput.
 So why does almost nobody seem to consider prefill when discussing ROI?
 Even though decoding is typically 3–5× more expensive per million tokens than prefill, prefill is often 10–30× faster (and in this case, around 50× faster)... Shouldn't that have a major impact on ROI? Maybe even more than output?
 Am I missing something, or is the real input/output token ratio very different from what I'm imagining?
    submitted by    /u/GabryIta  
 [link]   [comments]
