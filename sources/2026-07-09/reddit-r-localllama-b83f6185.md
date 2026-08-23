---
title: >-
  Running GLM 5.2 on 4xGB10 with a 100G Switch, 330k ctx, ~25 t/s tg, ~650 t/s
  pp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ur022r/running_glm_52_on_4xgb10_with_a_100g_switch_330k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T17:49:06.000Z'
fetched_at: '2026-07-08T23:01:51.283Z'
---
TP4+DCP2 for a ~360k kV pool. Prefill increases to 900-1000 t/s with longer prompts. You can also run DCP4 for 660k, but prefill gets shaved to ~400. Dropping DCP raises prefil to ~750.
 I'm running 4 drafted tokens vs Z.ai's rec of 5. Decode is heavily dependent on prose. Thinking gets ~20 tok/s. Code gets 25-35. Typical turns in Pi get me ~24 tok/s.
 Pruning the model by 5-10% will probably get you to 1M ctx or more concurrency if you need that. In my daily use, a 10% data-free prune seems to preserve the model's coding capability, but it loses some adherence to instructions at the granular level.
 Hardware cost for me was ~16k. Today is probably 1-2k more.
 2x Acer GN100 at 3799 each
 2x Asus GX10 at 3499 each
 1x Mikrotik CRS504 at $650
 4x NADDOD QSFP56 DAC cables at $66 each (Can be replaced with QSFP28 for CRS504)
 It's not fast or financially smart in a general sense, but it's viable. And I think if you want to run GLM locally, this is a better bet than the 512GB Mac Studio, which probably gets 12 tok/s decode (gets compute-bound) and 50 tok/s prefill.
 Below is the benchmark result with llama-benchy, NL prose, so it's slower than a typical agentic workflow.
  
 Depth Prefill (pp2048) Decode (tg512) 
  
 0 597.9 ± 6.4 21.7 ± 0.6 
  8k 602.6 ± 0.8 21.5 ± 0.8 
  32k 597.7 ± 0.2 21.8 ± 0.6 
 
 A short-ish turn in Pi
 Patches and recipes: https://github.com/CosmicRaisins/glm-5.2-gb10
    submitted by    /u/SpaceRaisins  
 [link]   [comments]
