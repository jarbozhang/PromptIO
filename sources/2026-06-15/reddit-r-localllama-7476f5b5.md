---
title: >-
  Dual DGX Sparks- 40tk/s single 1M ; 350 tk/s agg. - Deepseek V4 Flash (vs RTX
  Pro 6000 vs Mac M2 Ultra 192)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u5g9pr/dual_dgx_sparks_40tks_single_1m_350_tks_agg/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T09:07:57.000Z'
fetched_at: '2026-06-14T23:18:17.962Z'
---
First of all shout out to Aiden/Antirez & geniuses at the Nvidia community threads. I'm merely claude-vibing off of their works.
 That a said, i thought i'd share recipes & learnings & benchmarks so far on running big MOE models on two dgx sparks at a reasonable speed for agent use:
 https://github.com/elsung/dgx-spark-deepseek-v4-flash
 The kicker here is that you need 2 DGX sparks to really get the speed we need, and you have to spend the $180 on that single cable for 200G/s over connectx7 in order to get this speed.
 BUT, being able to run ~40tk/s on a model that is arguably in the same playpen as the frontiers is exciting and something myself and others probably have been striving/dreaming about for some time now.
 I also put in benchmarks against the RTX Pro 6000 and the Mac M2 Ultra 192GB.
 TLDR;
  
 Machine engine / quant decode t/s prefill t/s concurrency 
  
 RTX PRO 6000 (96 GB GDDR7) ds4.c 46.9 344 single-stream only 
  2× DGX Spark vLLM FP8 ~41 ~1785 ~350 agg @ c=32 
  Mac Studio M2 Ultra (192 GB) ds4.c 29.7 389 single-stream only 
  1× DGX Spark ds4.c IQ2_XXS ~14 410 single-stream 
 
 2x DGX wins cuz FP8 & fast and can run concurrent.
 up to 350 tk/s aggregate running 32 requests at 256k context each.
 Hopefully this is useful for other folks~
 Credit links / Threads (ongoing discussions here)
  
Antirez & his awesome work 
 https://github.com/antirez/ds4
 
 Aiden thread & DGX threads i found via Nvidia Communty threads: 
 https://forums.developer.nvidia.com/t/deepseek-v4-flash-aiden-recipe-from-reddit-1m-token-session-operational-cuda-12-1-tailored-for-dgx-spark-gb10/372268/61
 https://forums.developer.nvidia.com/t/deepseek-v4-flash-official-fp8-running-across-2x-dgx-spark-tp-2-mtp-200k-ctx-recipe-numbers/370309
 
  
[EDITED TLDR for corrections / clarifications. also updated Github with longer-context benchmarks]
    submitted by    /u/elsung  
 [link]   [comments]
