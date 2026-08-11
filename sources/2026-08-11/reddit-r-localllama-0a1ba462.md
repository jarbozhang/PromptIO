---
title: >-
  DeepSeek V4 Flash 0731 is the ‘killer app’ that is going to sell A LOT of DGX
  Sparks
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vkpm5p/deepseek_v4_flash_0731_is_the_killer_app_that_is/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T16:25:32.000Z'
fetched_at: '2026-08-11T11:01:01.020Z'
---
Having a ‘Killer Application’ that everyone wants to use helps sell hardware, plain and simple. DeepSeek V4 Flash 0731 isn’t an app of course, but I think it’s going to be the major catalyst for getting a lot of people to buy a couple of NVIDIA GB10-based systems because:
  
It is an amazing coding / agentic use model.
 It fits perfectly on a 2x Spark Cluster
 It runs Fast AF with the right vLLM recipe. (I’m getting 60 tk/s with this one:
 https://github.com/tonyd2wild/DeepSeek-v4-Flash-0731-DSpark-1M-NVFP4-KV-2x-DGX-Spark)
 You can run it with a fairly usable 1M context window.
 
It runs very well in harnesses such as
 
Hermes.
 
 Now that solid NVFP4 support is finally here for DGX and is providing Sparks with a pretty good boost for token speeds, the Spark’s memory bandwidth limitation isn’t as big a deal as it used to be. I mean seriously, do I really give a shit about memory bandwidth when I’m getting 60 tk/s with Deepseek V4 Flash?
 I know the Strix / M4 / M5 gangs may have something to say about all this, but even they have to admit that DGX Spark beats them for prompt processing performance, which is hugely important when it comes to agentic work and how fast agents are getting work done.
 The Strix our-stuff-is-way-cheaper argument used to be very valid, but with memory and SSD prices being what they are now, that argument isn’t as strong as it once was. M5 stuff is pretty expensive and we have no idea when Apple is going to drop a new beefy Mac Studio M5 or a Mac Mini Pro with M5. We thought it was going to happen in June but they don’t appear to be in a rush to release anything.
 So what’s left out in the market worth getting? Well, you could grab a RTX Pro 6000 if you want to pay a hefty premium from the scalpers, or you could try some of the AMD offerings, but other than that, the DGX Spark is still the best bang for your buck for getting the most VRAM to run models locally.
 I didn’t even mention the low power consumption of the Spark which is another 
