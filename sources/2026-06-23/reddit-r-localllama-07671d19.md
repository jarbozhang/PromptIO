---
title: Qwen3.6-35B-A3B APEX on a Single RTX 3090 - Getting the Most Out of It
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ucjqm4/qwen3635ba3b_apex_on_a_single_rtx_3090_getting/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T12:51:56.000Z'
fetched_at: '2026-06-23T01:34:58.969Z'
---
Resources I used: - https://github.com/ikawrakow/ik_llama.cpp - as the reference llama.cpp fork - https://github.com/spiritbuun/buun-llama-cpp - to test the TurboQuant feature - https://huggingface.co/mudler - for the models - https://github.com/noonghunna/club-3090 - for speed references, benchmarking and setup guidance
 My Goal
 I recently got an RTX 3090 and tried to find the optimal configuration for running the Qwen3.6-35B-A3B model. My priorities were clear:
  
Maximum possible quality without sacrificing good speed
 Minimum 128k context to handle long documents and long agentic flows
  
Speed Benchmarks
 I tested two llama.cpp forks (ik_llama as suggested by club-3090 and the spiritbuun fork) with both main APEX model versions (I-Compact and I-Quality). Here are the generation speed results, all with 128k context.
  
 Engine APEX Model KV Cache decode_TPS (Narrative) decode_TPS (Code) 
  
 ik_llama I-Compact q8_0 / q5_0 ~146 ~146 
  spiritbuun I-Compact turbo8 / turbo4 ~142 ~141 
  spiritbuun I-Quality turbo8 / turbo4 ~137 ~137 
  ik_llama I-Quality q8_0 / q5_0 ~137 ~137 
 
 Analysis: ik_llama with I-Compact is the undisputed king of speed. However, spiritbuun with I-Quality and turbo8/turbo4 cache delivers the same speed as ik_llama with I-Quality.
 Quality Comparison
 Here's a comparison table with official data from the APEX repository for the Qwen3.5-35B-A3B. Note: these are the official APEX benchmarks. I haven't been able to find 3.6 specific benchmark data, but the relative performance between APEX tiers should be the same.
  
 Model Size PPL ↓ KL mean ↓ KL max ↓ HellaSwag ↑ tg128 (t/s) ↑ 
  
 BF16 (reference) 64.6 GB 6.537 — — 82.5% 30.4 
  APEX I-Quality 21.3 GB 6.552 0.0102 5.59 83.5% 62.3 
  UD-Q4_K_XL 20.7 GB 6.554 0.0097 3.14 83.0% 58.1 
  APEX I-Compact ~17 GB 6.857 0.0451 8.76 83.5% — 
 
 On paper, APEX I-Quality and UD-Q4_K_XL look nearly identical: same perplexity (6.552 vs 6.554), similar KL metrics. But here's the kicker: APEX I-Quality is 
