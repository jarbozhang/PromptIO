---
title: endless-frontier/BigBang-v1 - qwen 3.5 finetunes
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vk1p9s/endlessfrontierbigbangv1_qwen_35_finetunes/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T21:22:15.000Z'
fetched_at: '2026-08-10T11:01:36.122Z'
---
table bench
 https://huggingface.co/bartowski/endless-frontier_BigBang-v1-GGUF
 I'm downloading this model only because Bartowski converted it to .gguf, so it might be interesting.
 Doubts :
 The headline number is basically meaningless. "Performance between DeepSeek Flash (old one) and Pro" okay, on what? Did they average the benchmarks? Weight them? Pick and choose? Because if you actually look at the per-benchmark scores, this thing ranges from decent (50 on HLE) to straight up bad (15.7 on BioMystery-HD). Saying "aggregate performance" without showing the math is just... marketing. Like when a startup says "we're 10x faster" and it turns out they benchmarked one very specific edge case.
 A 35B model hanging with 284B–1.6T models? Suspicious as hell. Not impossible, but the first thing that jumps to mind is benchmark contamination. And here's the kicker, their whole training setup uses critics calibrated on "held-out real research tasks." So the question becomes: how do we know the eval benchmarks weren't basically in the training distribution? The paper kind of hand-waves this. If you're gonna claim a tiny model beats much bigger ones, you need to actually prove you're not just overfitting to the test set.
 Let's est it
    submitted by    /u/LegacyRemaster  
 [link]   [comments]
