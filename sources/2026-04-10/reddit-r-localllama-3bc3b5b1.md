---
title: 'Planning a local Gemma 4 build: Is a single RTX 3090 good enough?'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgsl35/planning_a_local_gemma_4_build_is_a_single_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T15:18:05.000Z'
fetched_at: '2026-04-10T00:43:27.397Z'
---
Hey everyone. I am planning a local build to run the new Gemma 4 large variants, specifically the 31B Dense and the 26B MoE models.
 I am looking at getting a single used RTX 3090 because of the 24GB of VRAM and high memory bandwidth, but I want to make sure it will actually handle these models well before I spend the money.
 I know the 31B Dense model needs about 16GB of VRAM when quantised to 4-bit. That leaves some room for the context cache, but I am worried about hitting the 24GB limit if I try to push the context window too far.
 For those of you already running the Gemma 4 31B or 26B MoE on a single 3090, how is the performance? Are you getting decent tokens per second generation speeds? Also, how much of that 256K context window can you actually use in the real world without getting out of memory errors?
 Any advice or benchmark experiences would be hugely appreciated!
    submitted by    /u/LopsidedMango1  
 [link]   [comments]
