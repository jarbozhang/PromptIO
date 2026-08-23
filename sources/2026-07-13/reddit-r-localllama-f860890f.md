---
title: >-
  If you use Open Code or other agenting programs you are leaving a lot of t/s
  if you don't actually use agents in parallel. Benchmark : RTX5090, Qwen3.6 35B
  loaded via LM studio with parallel tasks set
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uueuks/if_you_use_open_code_or_other_agenting_programs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T13:00:07.000Z'
fetched_at: '2026-07-12T23:01:41.978Z'
---
As many of you know t/s is super important. It's how fast your stuff gets done. I create via open code benchtest and run it. Thanks to it i know that if i don't run at least 4 agents i basically leave HALF of performance. So whatever you do single project in open code that uses one agent or 4 project at once it is much better to run it this way rather than single instance or single agent.
 I asked AI to do summary of my test and checked them:
 LM Studio Multi-Agent Throughput Benchmark
 Hardware: RTX 5090
 Model: Qwen 3.6 35B (via LM Studio)
 Configured Parallel: 8
 Test: 5 requests per agent, 1024 max tokens, temperature 0.3
  
Results
  
 Agents Avg t/s (each) Combined t/s Efficiency Wall Time 
  
 1 256.54 245.77 — 21.9s 
  2 176.15 346.22 70.4% 31.1s 
  3 134.73 398.64 54.1% 40.5s 
  4 109.77 434.34 44.2% 49.5s 
  5 95.04 470.34 38.3% 57.1s 
  6 84.73 504.14 34.2% 64.0s 
  7 74.49 517.68 30.1% 72.7s 
  8 67.22 533.90 27.2% 80.5s 
 
  
Key Findings
 Throughput Scaling
  
Combined throughput grows sub-linearly: 8 agents yields only 2.2x combined throughput vs single (533 vs 245 t/s), not 8x.
 Individual agent speed drops sharply: From 256 t/s → 67 t/s as GPU compute is split across agents.
 Diminishing returns: 5→8 agents only adds ~63 t/s (12%). Most gains happen by agent 5.
  
Efficiency
  
Peak efficiency: 70.4% at 2 agents (closest to theoretical linear scaling).
 By agent 8: only 27.2% efficiency — two-thirds of potential throughput is lost to overhead.
  
Sweet Spot: 4–5 Agents
  
4 agents: 434 t/s, 44% efficiency — good balance of speed and resource usage.
 5 agents: 470 t/s, 38% efficiency — near peak combined throughput with acceptable overhead.
 Beyond 5: Marginal gains (517 t/s at 7, 533 at 8) for significant VRAM and overhead cost.
  
 How Concurrency Works with Context
  
Each agent gets its own full context window — they do NOT split it.
 8 agents × 8K context = 8x KV cache in GPU VRAM.
 The bottleneck is KV cache + compute splitting, not context siz
