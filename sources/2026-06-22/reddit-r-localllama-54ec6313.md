---
title: Best local model for vision - 2nd benchmark update - 21 Jun 2026
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubx4rw/best_local_model_for_vision_2nd_benchmark_update/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T18:18:07.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
I previously posted the first results of my VLM benchmark. There were a few useful comments and observations I took into account, to revise and expand my benchmark:
  
I initially did not take into account the Gemma 4 vision budget which defaults to 280, essentially making it useless. I have increased it to maximum level, with the following optimal setttings which were posted here recently: --image-min-tokens 560 --image-max-tokens 2240
 I used the -b 4096 -ub 4096 parameters to avoid splitting the image tokens into multiple blocks (default value is 512)
 Switched from ollama to llama.cpp
 I expanded my dataset from 20 to 30 images, to cover more use cases
 I expanded the benchmark to test the impact of thinking vs non-thinking
 The first benchmark only included Q4 quants; I expanded it to Q8 quants for small models
 The first benchmark only tested each image once; now 3x tests per image
  
In total, 23 models x 30 images x 3 tests = 2,070 tests (not including failures, tunings, re-runs), 60 to 70 inference hours.
 I have three recommendations this time, one per hardware tier:
  
 VRAM tier Pick Size Score Speed 
  
 4–8 GB Qwen3.5 4B (nothink) @ Q4 3.2 GB 75.5/100 20 s/img 
  12–16 GB Qwen3-VL 8B @ Q8 (not Q4) 8.1 GB 74.4/100 26 s/img 
  24+ GB Qwen3.6 27B (nothink) @ Q4 16.9 GB 79.6/100 70 s/img 
 
 I noticed a few interesting outcomes, which I did not expect:
 Thinking mode hurts vision. Every Qwen hybrid thinker scored higher with enable_thinking=false. This is because vision is perception, not reasoning. Thinking adds instability, timeouts, and empty outputs.
 MoE size is misleading for vision. MoE models tie with much smaller dense models, and perform worse than equivalent dense models. It makes sense in retrospect if when you see that a MoE is a collection of small models. Their big total parameter count buys knowledge breadth, not perception depth which scales with density.
 Q8 is not a guaranteed improvement. It improves Gemma 4 (more consistent, less hallu
