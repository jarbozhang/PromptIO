---
title: inclusionAI/LLaDA2.2-flash · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4csnj/inclusionaillada22flash_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T12:41:19.000Z'
fetched_at: '2026-07-24T11:01:34.765Z'
---
LLaDA2.2-flash is an agent-oriented diffusion language model in the LLaDA2 series. By introducing Levenshtein Editing (with DELETE and INSERT control tokens) to diffusion language modeling, it represents the LLaDA2 series' first step in agentic applications, including long-context tool use, multi-turn interaction, and robust error correction.For more information, please refer to our technical report.
 🚀 Highlights
  
Efficient 128K Diffusion Infrastructure: LLaDA2.2-flash extends the context window to 128K and introduces Block Routing, which bounds MoE expert activation at the diffusion-block level to enable efficient long-context agentic workloads.
 Levenshtein Editing: We introduces DELETE and INSERT control tokens, allowing diffusion decoding to edit sequence structure, remove redundant content, and create insertion slots during parallel generation.
 Agentic Reinforcement Learning: We propose Levenshtein Editing ELBO-based Block-level Policy Optimization (L-EBPO), which leverages agentic environmental rewards to train levenshtein editing and error correction in multi-turn tool-use scenarios.
  
🔍 Model Overview
 LLaDA2.2-flash has the following specifications:
  
Type: Mixture-of-Experts (MoE) Diffusion Language Model with Levenshtein Editing
 Context Length: 128K tokens
 Levenshtein Editing Control Tokens: DELETE, INSERT
 Total Parameters (Non-Embedding): 100B
 Number of Layers: 32
 Attention Heads: 32
 Positional Encoding: Rotary Position Embedding (RoPE)
 Vocabulary Size: 157,184
  
   submitted by    /u/pmttyji  
 [link]   [comments]
