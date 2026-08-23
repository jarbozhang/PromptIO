---
title: I added MTP to local SoTA Agentic Coding Model Ornith 35B FP8 E4M3
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ul3rr2/i_added_mtp_to_local_sota_agentic_coding_model/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T01:03:05.000Z'
fetched_at: '2026-07-02T23:00:55.717Z'
---
Just wanted to share that I was looking for an optimal way to run Ornith 35B in FP8 with E4M3 and MTP with vLLM but there was no out-of-the-box model with MTP drafter support. So I grafted this new model! It's 18% faster than without MTP and the drafter acceptance rate is not bad (70% on avg).
 It should run on any RTX based setup > 80GB VRAM with full context window 256k. Might also do well on Unified Memory Systems like GB10 (for this - use my script and graft the MTP model into a target NVFP4 model!).
 I work with Hopper and Ada gen hardware, so this is the Pareto optimal for me. Have fun!
 Grafter script and vLLM high performance inference container: https://github.com/kyr0/Ornith-35B-FP8-E4M3-MTP
    submitted by    /u/kyr0x0  
 [link]   [comments]
