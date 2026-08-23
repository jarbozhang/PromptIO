---
title: Can I realistically get close to Claude/Codex capabilities locally?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubpdyn/can_i_realistically_get_close_to_claudecodex/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T12:56:30.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
For context, I have a modest 32Gb rig running Nvidia GPUs (5070 Ti + 5060 Ti, the latter over an adapted x4 NVME slot so not as fast as if I had a motherboard with multiple proper CPU connected PCIe lanes).
 I can run the 27B models on it nicely enough, but the bottleneck is context.
 I’m a software engineer so I work on very large code bases and my sessions are often long, touching many components.
 I use Opus 4.8 almost exclusively, and that 1m context window means I can work efficiently.
 The recent Fable ban and the news that Anthropic are introducing identity verification via Peter Thiel’s company has increased my desire for token independence. I’m not looking to start a political discussion here, but the reason I avoid hosted Chinese models for work is privacy, and it no longer feels like American providers offer that either.
 So, my questions are:
 Are there any open weight models that can get close to the Opus experience in terms of context and coding ability that can realistically be run at home? I’m sure we’d all love to be able to run GLM 5.2, Qwen3.7 and Kimi K2.7 but barring a sudden breakthrough in affordable hardware or a new hyper efficient model architecture, those are out of reach for me.
 Assuming the answer to the first question is yes, what is my best route? I have a rough max figure of $3.5K in mind. I suppose the options are to replace my motherboard, CPU, PSU etc and buy more GPUs or go for a unified memory system. A Mac Studio M3 Ultra with 96Gb would be at the limit of my resources but I’m not sure how much Metal limits model choice.
 And I really don’t want to spend that kind of money to run a 70 - 80B model if it only offers marginal improvement in real use over what I can run today.
 If you are running models of that size, could you please share your experience? How do they compare to something like Q3.6-27B with 256K context?
 Thanks for any advice, I’m spinning a bit here and I’m sure I’m not the only one.
    submitted by    /u/mrgrea
