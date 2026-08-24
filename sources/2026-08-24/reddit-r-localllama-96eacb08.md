---
title: deepseek-v4-flash-0731 - surprisingly usable
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vwsjut/deepseekv4flash0731_surprisingly_usable/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T04:20:37.000Z'
fetched_at: '2026-08-24T11:01:49.496Z'
---
I just finished building my (relatively) low rent local inference machine: * Epyc 7663 * 256GB ECC DDR4-3200 * 1x RTX 5090 32GB
 Yeah I realize it's weird to throw a 5090 and 256GB of anything together and call it low end, but relative to ~151GB of weights it is.
 I'm running UD-Q8_K_XL and getting 23.8-24.6 tokens/sec, with pp ranging from 60 on the first prompt to 385 near the last (no doubt lots of caching) on tasks using 100-128k total context. It was slower with DFlash so I took that out. It was also slower with a 3090 I put in there temporarily.
 I'm posting this mostly because I didn't see too many other data points for this config (DDR4 Epyc + Blackwell doing cpu-moe). And also that I'm pretty surprised that a model this good can actually run in my basement without dropping $10k or running a sub-panel down there. I'm otherwise fairly new to this - would love any tips on what else to run or how to further improve it.
    submitted by    /u/IntravenusDeMilo  
 [link]   [comments]
