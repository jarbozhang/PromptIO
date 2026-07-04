---
title: GLM5.2 performance.
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1umtiw4/glm52_performance/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T23:33:50.000Z'
fetched_at: '2026-07-04T23:01:32.106Z'
---
I was wondering how fast GLM5.2 (Nvidia’s 460GB nvfp4 checkpoint) is running on your rigs. I have it running at ~1tok/s in the simulation harness. The data extrapolates to 75tok/s on the real Cuda MGPU machine. So I would like to collect data from you how fast it runs for you.
 State your tok/s first so I can easily parse and then give some guidance on what inference engine and what the hardware runs on.
 Example:
 1tok/s pp and 1tok/s gen using custom ispc inference engine on 8ch DDR-6400 3175F TURIN and memory is 125% oversubscribed with disk is serving at 1GB/s etc.
    submitted by    /u/Khipu28  
 [link]   [comments]
