---
title: poolside/Laguna-M.1 · Hugging Face - 225B-A23B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9b2i3/poolsidelagunam1_hugging_face_225ba23b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-18T16:30:57.000Z'
fetched_at: '2026-06-19T14:35:21.917Z'
---
Laguna M.1
 Laguna M.1 is a 225B total parameter Mixture-of-Experts model with 23B activated parameters per token designed for agentic coding and long-horizon work.
 Highlights
  
Large sparse MoE for agentic coding: Laguna M.1 is a 70-layer MoE transformer with 225B total parameters and 23B activated parameters per token
 High-capacity expert routing: After 3 dense SwiGLU layers, Laguna M.1 uses 67 sparse MoE layers with 256 experts, top-k=16 routing and auxiliary-loss-free load balancing
 Global attention architecture: Laguna M.1 uses global attention across all layers with 64 Q-heads, 8 KV-heads and softplus attention output gating
 Native reasoning support: Interleaved thinking between tool calls with support for enabling and disabling thinking per-request
 Strong agentic benchmark performance: Laguna M.1 is competitive with state-of-the-art open-weight and frontier models on SWE-bench Verified, SWE-bench Multilingual, SWE-Bench Pro and Terminal-Bench 2.0
 Apache 2.0 license: Use and modify freely for commercial and non-commercial purposes
  
Model overview
  
Training: pre-training, post-training and reinforcement learning stages
 Number of parameters: 225B total with 23B activated per token
 Optimizer: Muon
 Layers: 70 layers with global attention
 Experts: 256 experts with 1 shared expert; top-k=16 routing
 Dense layers: first 3 layers are dense SwiGLU; remaining 67 layers are sparse MoE
 Attention: 64 Q-heads, 8 KV-heads, head dimension 128, with softplus attention output gating
 Positional encoding: RoPE with YaRN
 Modality: text-to-text
 Context window: 262,144 tokens
 Reasoning support: interleaved thinking with preserved thinking
  
 
 Model Parameters SWE-bench Verified SWE-bench Multilingual SWE-bench Pro (Public Dataset) Terminal-Bench 2.0 
  
 Laguna M.1 225B-A23B 74.6% 63.1% 49.2% 45.8% 
  Devstral 2 123B dense 72.2% 61.3% - 32.6% 
  GLM-4.7 355B-A32B 73.8% 66.7% - 41.0% 
  DeepSeek-V4 Flash 284B-A13B 79.0% 73.3% 52.6% 56.9% 
  Qwen3.5-397B-A17B 397
