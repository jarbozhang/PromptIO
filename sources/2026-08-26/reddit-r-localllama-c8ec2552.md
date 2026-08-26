---
title: ibm-granite/granite-4.2-30b · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vy2jz7/ibmgranitegranite4230b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-25T15:10:57.000Z'
fetched_at: '2026-08-26T11:01:34.333Z'
---
Granite-4.2-30B is the flagship reasoning model in the Granite 4.2 family. It delivers the strongest performance across reasoning-intensive tasks by leveraging built-in <think>...</think> chain-of-thought. It supports flexible thinking modes — full thinking (default), non-thinking, and low-effort — allowing users to balance depth vs. latency on a per-query basis.
 Key capabilities:
  
Built-in Reasoning: Native chain-of-thought that significantly improves performance on math, coding, and complex multi-step problems.
 Flexible Thinking Modes: Seamlessly switch between full thinking, non-thinking, and low-effort modes within a single model.
 Reasoning-Augmented Tool Calling: The model reasons about which tools to invoke and why, producing more accurate function calls.
 512K Context Window: Supports long documents, multi-turn conversations, and complex agentic workflows.
 Apache 2.0 Licensed: Fully open for commercial and research use.
  
Model Design
 Granite-4.2-30B is built on a decoder-only dense transformer architecture with the following core components:
  
Attention: Grouped Query Attention (GQA) with 32 attention heads and 8 KV heads
 Position Embedding: Rotary Position Embedding (RoPE) with θ = 10,000,000
 Feed-Forward: MLP with SwiGLU activation (hidden size 32768)
 Normalization: RMSNorm (ε = 1e-5)
 Embeddings: Separate input/output embeddings (not tied)
 Precision: bfloat16
  
https://huggingface.co/ibm-granite/granite-4.2-8b
 Granite-4.2-8B is the mid-size reasoning model in the Granite 4.2 family. It delivers strong performance on reasoning-intensive tasks by leveraging built-in <think>...</think> chain-of-thought. It supports flexible thinking modes — full thinking (default), non-thinking, and low-effort — allowing users to balance depth vs. latency on a per-query basis.
 Key capabilities:
  
Built-in Reasoning: Native chain-of-thought that significantly improves performance on math, coding, and complex multi-step problems.
 Flexible Thinking Modes: Seam
