---
title: >-
  Follow-up: GLM-5.2 NVFP4 on four DGX Sparks — the MTP mystery is solved, and
  it's now ~24 tok/s at 128K context
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1um6pea/followup_glm52_nvfp4_on_four_dgx_sparks_the_mtp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T06:33:30.000Z'
fetched_at: '2026-07-03T23:01:09.837Z'
---
Follow-up: GLM-5.2 NVFP4 on four DGX Sparks — the MTP mystery is solved, and it's now ~24 tok/s at 128K context
 This is a follow-up to my earlier post about running GLM-5.2 NVFP4 on 4x DGX Spark at 128K context. Short version of that post: 128K worked at ~15 tok/s with MTP1, and there was a painful tradeoff where you could have 128K context OR ~23 tok/s (DCP1 at 32K), but not both. I also flagged that MTP2/MTP3 acceptance collapse at DCP4 "really looks buggy" but that 30 hours of digging hadn't cracked it.
 It was buggy. It's cracked. Tradeoff gone. Here's how it shook out: 
 TL;DR
  
 old post (DCP4/128K/MTP1) now (DCP4/128K/MTP3) now (DCP4/128K/MTP4) 
  
 decode, short codegen (hot) 14.5-15.2 tok/s 22-23 tok/s 
  MTP acceptance per position 0.74 (MTP1 only) 0.90 / 0.79 / 0.67 
  context 131,072 131,072 
  hardware 4x GB10 Spark + MikroTik RoCE unchanged 
 
 Edit: prefill still ~475 tps; bs=3 decode =~48 tps.
 Yes, MTP4 — the recursively-reused single MTP layer is still conditionally accepting at ~0.84 by position 4, which mirrors what I see on my RTX 6000 Pro box where MTP4 is also the peak. One config gotcha: MAX_CUDAGRAPH_CAPTURE_SIZE needs headroom above num_speculative_tokens + 1 (the draft derives a smaller cap than the target; exactly N+1 fails startup with "No valid cudagraph sizes"). I run 10 for MTP4. I've seen occasional runs sag when host paging churns — MTP3 is my conservative default, MTP4 the peak config.
 Same machines, same switch, same checkpoint, same 1.81 GB/rank KV budget. The entire gain is one missing line of configuration plumbing in vLLM, plus rebasing onto a newer upstream branch. The DCP1/32K compromise config is now pointless: DCP4 at full context beats it outright.
 What the bug actually was
 In my original post I wrote that acceptance looked like 0.9, 0.75^4, 0.6^4 and guessed at some rank-intersection effect. The exponent intuition was pointing at something real (the damage does scale with DCP world size), but the mechanism was bette
