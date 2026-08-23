---
title: 'Qwen3.6 27B + 35B on vLLM, single R9700 (gfx1201)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1viq0pq/qwen36_27b_35b_on_vllm_single_r9700_gfx1201/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T07:55:36.000Z'
fetched_at: '2026-08-08T11:01:01.045Z'
---
I've been tuning my new Radeon AI Pro R9700, and figured that this would be useful information for people who are trying to optimise their setups. I'm pretty happy with these results and looking forward to Qwen3.8..
 Summary below provided by Claude (which helped me configure it to run on my system via podman).
 Setup: stilldeadcode/vllm-radiance:0.5.8. Single (not dual) card.
 https://hub.docker.com/r/stilldeadcode/vllm-radiance/
 https://codeberg.org/StillDeadcode/vllm-radiance/
 The reference config shipped with the image is tuned for FP8 weights on 2× R9700 (TP=2). Most of its defaults (AITER attention backend, FP8 KV, --no-async-scheduling, --mamba-cache-mode align, all RADIANCE_* toggles) are correct as-is and don't need touching. Here's what actually differs when running one card with INT4:
 Config differences vs. reference
  
--tensor-parallel-size 1 (no second card)
 --gpu-memory-utilization 0.98 (reference band is 0.90–0.97 on dual cards)
 num_speculative_tokens=4 on the 27B. Ladder-tested 2/3/4/8 directly against the container (4 arms × 2 loads × 2 reps × 4 depths); 4 wins at every depth by 17–48% over 8.
  
Model Weights:
 https://huggingface.co/Avesed
 Weights: Avesed/Qwen3.6-{27B,35B}-INT4-W4A16 (compressed-tensors, group_size 32). The 35B at FP8 simply won't fit one 32GB card at any useful context length.
 Checkpoint fix (not an image issue): tokenizer.json in the Avesed INT4 repo ships truncation.max_length: 512 / padding: Fixed(512) baked in from calibration — breaks vision above ~672px. Set both to null.
 Model notes
 27B: Dense (no MoE), MTP on, num_speculative_tokens=4, 131,072 ctx.
 35B: MoE (A3B), MTP off, 262,144 ctx.
 Benchmark Results
 35B-A3B MoE (KV pool tokens = 440,241)
  
 Depth Prefill tok/s Decode tok/s 
  
 4k ~7,800 61.4 
  16k ~7,700 60.1 
  50k ~6,040 57.0 
  78k ~5,120 54.7 
  100k ~4,580 52.9 
  150k ~3,690 49.5 
 
 27B dense, MTP spec=4 (KV pool tokens = 212,147)
  
 Depth Prefill tok/s Decode tok/s Mean accepted len 
  
 4k ~1
