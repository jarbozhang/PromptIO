---
title: >-
  The GB10 Solution Atlas is now open source, the inference engine made for the
  community with breakneck inference speeds (Qwen3.6-35B-FP8 100+ tok/s)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5p2yv/the_gb10_solution_atlas_is_now_open_source_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T20:36:19.000Z'
fetched_at: '2026-05-07T10:33:23.088Z'
---
Some of you saw our post a couple weeks back about hitting 102 tok/s stable on Qwen3.5-35B on a DGX Spark. A lot of you asked "cool, where's the code?" Today's the day: Github
 Atlas is open source. Pure Rust + CUDA, no PyTorch, no Python runtime, ~2.5 GB image, <2 minute cold start. We rewrote the whole stack from HTTP handler to kernel dispatch because the bottleneck on Spark wasn't the silicon, it was 20+ GB of generic Python machinery sitting between your prompt and the GPU. We need community support to keep elevating Atlas for developers.
 Numbers on a single DGX Spark (GB10):
 Qwen3.5-35B (NVFP4, MTP K=2): 130 tok/s peak, ~111 tok/s sustained → 3.0–3.3x vLLM at testing time
 Qwen3.5-122B (NVFP4, EP=2): ~50 tok/s decode
 Qwen3-Next-80B-A3B (NVFP4, MTP): ~87 tok/s
 Nemotron-3 Nano 30B (FP8): ~88 tok/s
 Full model matrix on the site (Minimax2.7, Qwen3.6, Gemma too!)
 What's actually different:
 Hand-tuned CUDA kernels for Blackwell SM120/121 meaning attention, MoE, GDN, Mamba-2. No generic fallbacks.
 Native NVFP4 + FP8 on tensor cores
 MTP (Multi-Token Prediction) speculative decoding for up to 3x throughput on decode
 OpenAI + Anthropic API on the same port, works with Claude Code, Cline, OpenCode, Open WebUI out of the box
 Try it (two commands):
 docker pull avarok/atlas-gb10:latest sudo docker run -d --name atlas --network host --gpus all --ipc=host \ -v ~/.cache/huggingface:/root/.cache/huggingface \ avarok/atlas-gb10:latest serve Qwen/Qwen3.6-35B-A3B-FP8 \ --port 8888 --speculative --enable-prefix-caching 
 What's next especially for the non-Spark folks: we're working with Spectral Compute on a Strix Halo port, and AMD is giving us hardware to do it properly. RTX 6000 Pro Blackwell is also on the roadmap. Same kernel philosophy, adapted per chip, we'd rather do four chips well than twenty chips badly.
 X/Twitter
 Site
 Discord
 Will be in comments all day. Hit us with edge cases, weird models, broken configs. The roadmap is genuinely community-driven. Mini
