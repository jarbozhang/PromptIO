---
title: Release v5.11.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.11.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-06-10T16:32:44.000Z'
fetched_at: '2026-08-05T11:02:25.236Z'
---
Release v5.11.0
New Model additions
DiffusionGemma

DiffusionGemma is engineered to reduce the sequential bottlenecks of standard causal language models by employing an encoder-decoder architecture specifically optimized for inference speed. During inference, DiffusionGemma leverages multi-canvas sampling, where rather than generating one token at a time, the model iteratively denoises a full block of tokens using a diffusion sampler. This block-autoregressive approach facilitates text generation at higher speeds compared to traditional sequential generation methods.
Links: Documentation
GPU go brr (#46540) by @gante in #46540
DeepSeek-V3.2

DeepSeek-V3.2-Exp is an experimental model from DeepSeek-AI that introduces DeepSeek Sparse Attention (DSA), a trainable, fine-grained sparse attention mechanism designed to improve training and inference efficiency in long-context scenarios. Built on top of DeepSeek-V3.1-Terminus with a 685B-parameter Mixture-of-Experts backbone, it reduces the quadratic cost of attention over long sequences by attending only to a selected subset of past tokens while maintaining virtually identical benchmark performance. The work was extended in DeepSeek-V3.2 which pairs DSA with scalable reinforcement learning and achieves gold-medal level results on competition math and competitive programming benchmarks.
Links: Documentation | Paper
Add deepseek 3.2 exp (#41251) by @ArthurZucker in #41251
Kernels
The KernelConfig API was extended to support n-to-1 module fusion and parameter transformation, simplifying how custom kernels are integrated with Transformers modules. Additional fixes include resolving a dtype mismatch in the Mamba2 CUDA kernel path for NemotronH/Zamba2, adding fine-grained fp8/fp4 Triton kernel support, and correcting the FalconMamba fast-path warning to recommend pip install kernels instead of mamba-ssm.
Extended & simplified n-to-1 kernel fusion via KernelConfig (#46339) by @michaelbenayoun in [#46339]
Triton finegrained fp8/fp
