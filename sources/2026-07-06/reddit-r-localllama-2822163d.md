---
title: >-
  I benchmarked 13 models at 65K-128K context to find out what actually matters
  for agentic workloads
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unrse9/i_benchmarked_13_models_at_65k128k_context_to/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T03:37:23.000Z'
fetched_at: '2026-07-05T23:01:37.127Z'
---
I benchmarked 13 models at 65K-128K context to find out what actually matters for agentic workloads — prefill dominates everything, and KV head count beats parameter count
 I've been running local LLMs for agentic workflows (tool use, coding agents, RAG) and kept seeing people obsess over tg128 (token generation speed) as the headline performance metric. So I ran a structured long-context benchmark to figure out what actually matters when your context window is full. The answer surprised me.
  
Setup
  
GPU: RX 7900 XT 20GB (Vulkan backend, RADV/Mesa)
 Backend: llama.cpp / llama-bench (build 9860)
 Flags: -ngl 99 (GTT spill), -fa on, -ub 2048 -b 16384, ASPM=performance, bare TTY to free VRAM
 13 models: 5 dense, 6 MoE, 1 Mamba2 hybrid, 1 MLA MoE — ranging from 5GB to 18GB
 3 KV cache tiers: Q8_0 K / Q4_0 V (aggressive), Q8_0 K / Q8_0 V (symmetric), F16 (baseline)
 Context sizes: 512, 4K, 16K, 65K, 131K — both pure prefill (pp) and prompt+gen (pg)
 Full run took ~21 hours across two sessions
  
 Full prefill speed results (Q8_0 K / Q8_0 V KV cache, tokens/sec)
 If you just want the raw numbers, here's every model tested. pp = pure prompt processing (prefill), tg128 = token generation (decode). Sorted by pp131K.
  
 Model Size Type pp512 pp4K pp16K pp65K pp131K tg128 
  
 Trinity-Mini 16G MoE 3B/26B 2639 2924 2370 1419 923 150 
  Granite-4.0-H-Small 17G Mamba2+MoE 1115 1271 1220 1043 875 71 
  Ornith-9B / Qwen3.5-9B 6G Dense 2103 2220 1943 1274 873 92 
  Qwen3.6-35B-A3B 18G MoE 3B/35B 2184 2736 2227 1268 802 110 
  Gemma-4-26B-A4B 14G MoE 4B/26B 2523 2798 2076 1024 600 119 
  North-Mini-Code 15G MoE 3B/30B 2155 2187 1568 900 579 134 
  Gemma-4-12B 7G Dense 1492 1498 1145 595 350 66 
  Qwen3.6-27B 16G Dense 693 681 602 406 285 32 
  Granite-4.1-8B 5G Dense 1965 1807 1124 442 244 93 
  Ministral-3-14B 8G Dense 1419 1325 916 404 232 67 
  Apriel-1.6-15B 9G Dense 1332 1208 812 347 197 66 
  Devstral-24B 15G Dense 829 796 628 313 --- 42 
  GLM-4.7-Flash 16G MoE (MLA) 1822 
