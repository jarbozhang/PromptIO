---
title: Deepseek V4 Flash on a single RTX 6000 Pro - vLLM-Moet
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usacge/deepseek_v4_flash_on_a_single_rtx_6000_pro/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T02:06:03.000Z'
fetched_at: '2026-07-10T23:01:38.135Z'
---
Wow...
 https://github.com/kacper-daftcode/vLLM-Moet
 Using this customized vllm provided as a docker, I'm able to run DS V4 Flash on a single RTX 6000 Pro (apparently it also works on a single 5090 - check his readme, but I haven't tried). Apparently this also works with GLM 5.2 (though you need at least two 6000 pros, which is still amazing).
 Setting 130K context, I needed around 150 GB of RAM to get past the safetensor sharding, but once it is fully loaded in VRAM I am able to fit it all in the GPU (If you have less than this much RAM, create/extend your swap so you can get past the loading stage, but expect to wait 20 mins for the initial load).
 I'm running some benchmarks (see below) - and as I haven't run DS V4 before, not sure which parameters I should be using with this customized engine.
 But just wanted to share - this is a very interesting feat by this developer as the magic sauce to get it this small to fit in smaller VRAM is compression of routed experts to 2 bit while keeping fp4 experts (kudos to him, a genius no doubt), but more testing required to see how usable it is (will look to do some coding sessions with it).
 Initial run - Single RTX 6000 Pro
 | model | test | t/s | peak t/s | ttfr (ms) | est_ppt (ms) | e2e_ttft (ms) | |:------------------|----------------:|------------------:|---------------:|-------------------:|-------------------:|-------------------:| | deepseek-v4-flash | tg32 | 128.58 ± 11.43 | 132.73 ± 11.80 | | | | | deepseek-v4-flash | ctx_tg @ d4096 | 103.21 ± 9.94 | 106.54 ± 10.26 | | | | | deepseek-v4-flash | tg32 @ d4096 | 111.93 ± 18.57 | 115.54 ± 19.17 | | | | | deepseek-v4-flash | ctx_pp @ d8192 | 7907.32 ± 9331.94 | | 5257.95 ± 2446.23 | 3813.06 ± 2446.23 | 5257.95 ± 2446.23 | | deepseek-v4-flash | ctx_tg @ d8192 | 110.42 ± 11.02 | 113.98 ± 11.37 | | | | | deepseek-v4-flash | tg32 @ d8192 | 129.20 ± 30.24 | 133.37 ± 31.21 | | | | | deepseek-v4-flash | ctx_pp @ d16384 | 5057.32 ± 2173.55 | | 5396.66 ± 2464.32 | 3951.77 ± 24
