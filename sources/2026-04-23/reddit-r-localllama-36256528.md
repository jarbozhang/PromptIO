---
title: >-
  Qwen3.6-35B becomes competitive with cloud models when paired with the right
  agent
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ssilc3/qwen3635b_becomes_competitive_with_cloud_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T11:22:42.000Z'
fetched_at: '2026-04-23T02:21:55.373Z'
---
A short follow-up to my previous post, where I showed that changing the scaffold around the same 9B Qwen model moved benchmark performance from 19.11% to 45.56%:
 https://www.reddit.com/r/LocalLLaMA/s/JMHuAGj1LV
 After feedback from people here, I tried little-coder with Qwen3.6 35B.
 It now lands in the public Polyglot top 10 with a success rate of 78.7%, making it actually competitive with the best models out there for this benchmark!
 At this point I’m increasingly convinced that part of the performance gap to cloud models is harness mismatch: we may have been testing local coding models inside scaffolds built for a different class of model.
 Next up is Terminal Bench, then likely GAIA for research capabilities. Would love to hear your feedback here!
 EDIT: after many requests, pi.dev adaptation is up!
 Full write up: https://open.substack.com/pub/itayinbarr/p/honey-i-shrunk-the-coding-agent
 GitHub: https://github.com/itayinbarr/little-coder
 Full benchmark results: https://github.com/itayinbarr/little-coder/blob/main/docs/benchmark-qwen3.6-35b-a3b.md
    submitted by    /u/Creative-Regular6799  
 [link]   [comments]
