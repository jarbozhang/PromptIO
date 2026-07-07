---
title: nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-BF16 · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1upsdmi/nvidianvidianemotronlabs3puzzle75ba9bbf16_hugging/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T11:32:56.000Z'
fetched_at: '2026-07-07T23:01:24.259Z'
---
Nemotron-Labs-3-Puzzle-75B-A9B is a deployment-optimized large language model developed by NVIDIA, derived from Nemotron-3-Super-120B-A12B. The model is produced using Iterative Puzzle, a post-training compression framework, with the goal of significantly improving inference efficiency for interactive, reasoning-heavy, and long-context workloads while preserving strong downstream accuracy.
 The model employs a hybrid MoE architecture with interleaved Mamba, MoE, and Attention layers. Like Nemotron-3-Super, it supports Multi-Token Prediction (MTP) for faster text generation. Compared to its parent, Puzzle-75B-A9B reduces the model from 120.7B total / 12.8B active parameters to 75.3B total / 9.3B active parameters.
 See the tech report for full training and compression details: Nemotron-Labs-3-Puzzle-75B-A9B: Compressing Hybrid MoE LLMs.
 Compared to Nemotron-3-Super, Puzzle-75B-A9B:
  
Achieves approximately 2× higher server throughput on a single 8×B200 node at matched user-throughput constraints,
 Increases sustainable 1M-token single-H100 concurrency from 1 request to 8 requests,
 Maintains strong accuracy across reasoning, coding, multilingual, long-context, and agentic benchmarks.
  
The supported languages include: English, French, German, Italian, Japanese, Spanish, and Chinese.
 This model is ready for commercial use.
    submitted by    /u/jacek2023  
 [link]   [comments]
