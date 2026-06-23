---
title: GLM5.2 @7tg on 4x3090 + 192GB on budget motherboard + cpu
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ucknck/glm52_7tg_on_4x3090_192gb_on_budget_motherboard/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T13:30:17.000Z'
fetched_at: '2026-06-23T01:34:58.964Z'
---
I finally finished by home lab computer I started working on in May. I carefully waited and bought the 3090s in three local transactions. Every single seller was a gamer who was upgrading to 4090 or 5090 and none had any interest in AI. I bought the 192GB of 5200MHz of DDR5 and have overclocked it to 5600 MHz. I power capped the 3090s to 200W each in Linux. I used an Aegis prebuilt off eBay and replaced the PSU to a 1250W platinum. I kept the cpu and water cooling loop. I’ve probably spent 40 hours and $6000 on this rig, and I think it’s perfect for what I like to do.
 I run GLM5.2 at 7 tg as a planner. MiniMax 2.7 all on VRAM at 45tg as my coder. I use Flux2Klein for diffusion and I haven’t tried the throughput with all 4 cards but 2x was giving me about 1 image per 6 seconds when I batched. Qwen3.6 27B at q8 as my checker and testing loop model at 50 tg. 
 My purpose of keeping it on consumer hardware was for financial reasons. A server with ECC ram would double the throughput with more channels but it’s about double the price for ram and threadripper. 
 I build enterprise automated workflows as a forward-deployed engineer for more than a dozen companies. I’m a solo dev who has enjoyed automating things for years and now it’s easy to do it locally with solar power. They could block my IP from Claude and OpenAI and I wouldn’t really care anymore. Upgrade path is pretty much just upgrading GPU. Might build a dedicated server just for GLM in the future but for now I’m pretty set until data centers start dumping RTX6000 Pros.
    submitted by    /u/Important_Quote_1180  
 [link]   [comments]
