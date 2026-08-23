---
title: >-
  Strix Halo (8060S / gfx1151), Qwen-3.8-27B @ Q8 and Q6 UD v3, up to 256K ctx,
  llama.cpp, DFlash2, vision, real workloads quality and steady performances,
  optimized recipes, ...
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vuqwd8/strix_halo_8060s_gfx1151_qwen3827b_q8_and_q6_ud/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T19:58:02.000Z'
fetched_at: '2026-08-22T11:01:33.613Z'
---
Hi fellows fully-local halos,
 after manually following existing guides, I decided to build an LLM API endpoint installation and optimization guide that works even when autonomously followed by my pi agent, so I can install/experiment/reinstall easily and without babysitting. 
 Q8 is my default citizen, options for Q6 and Q5. Recipes: Quality (Q8), Balanced (Q6), Speed (Q5), Vision (Q8). All with Unsloth Dynamic Quants 3.0, DFlash2 (except vision). Scripts for download the right LLMs, interactive testing, systemd `--user` install, adaptive quality and performances optimization.
 Repo: https://github.com/PieBru/Qwen-3.8-27B_Strix-Halo_gfx1151
 Humans architected, verified, sealed. AI assistants built and wrote all the delivered stuff, built with pi and Qwen-3.8-27B.
 Piero
 P.S.: constructive proposals and PR are welcome.
 P.P.S.: no speed races, please. IMO speed is useful, but quality is fundamental - one subtle bug fewer or a better codebase always pays for itself in wall-time gained.
    submitted by    /u/PieBru  
 [link]   [comments]
