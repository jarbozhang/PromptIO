---
title: >-
  I did some model hacks, and got GLM5.2 from about 2.5 tok/s to >50 tok/s on my
  GH200 system.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uedlas/i_did_some_model_hacks_and_got_glm52_from_about/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T13:30:36.000Z'
fetched_at: '2026-06-25T07:40:38.228Z'
---
G'day.
 This is part 3 on my Local LLM adventures. I have a crazy system hacked server-to-desktop system: 
  
 Component Spec 
  
 GPUs 2x Hopper H100, 96 GB HBM3 each 
  CPUs 2x Grace, 72 cores each 
  Host memory 480 GB LPDDR5X per Grace, 960 GB total 
 
 So I can run technically run GLM5.2. Except the naive settings were crap, like 2.5 tok/second on vLLM. 
 Messing with NUMA got me higher, but in the end I had to do some surgery, and I grafted the MTP head from the office zai's GLM-5.2-FP8 repo to the body of CyanKiwi's AWQ quant version.
 You can do the same using these instructions. You have to pull all of CyanKiwi's weights, but only a few files from the zai repo; the script will merge the two. You also need to patch vLLM to deal with the changes.
 This bumped the speed to a best case ~55 tok/sec at 4x concurrency and ~45 tok/sec for single inference, streaming from RAM to VRAM. Hope it comes in handy!
    submitted by    /u/Reddactor  
 [link]   [comments]
