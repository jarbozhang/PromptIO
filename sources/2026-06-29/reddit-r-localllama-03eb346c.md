---
title: Is Qwen3-VL-2B the only viable VLM for JSON extraction on a "potato"?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uhqc11/is_qwen3vl2b_the_only_viable_vlm_for_json/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T07:02:50.000Z'
fetched_at: '2026-06-28T23:00:58.423Z'
---
After spending countless hours testing on 3 "potato" laptops (Intel i3, 8GB RAM, Win11, integrated GPU), that's my conclusion.
 For reliably extracting data from images to JSON on low-end hardware, nothing else even comes close.
 Yet, it’s completely missing from major benchmarks like Artificial Analysis or the Open LLM Leaderboard (while the 4B version is listed).
 In my (non-scientific) testing, Qwen3-VL-2B Q4_K_M GGUF easily outperforms Qwen3-VL-4B and Qwen3.5 2B for this specific data extraction task.
 The rest aren't even near an acceptable result.
 - Why is it being ignored by benchmarks?
 - Is there any other model that can actually handle JSON extraction on potatoes, phones, or Raspberry Pis?
    submitted by    /u/ML-Future  
 [link]   [comments]
