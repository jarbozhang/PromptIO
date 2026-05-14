---
title: Provable Quantization with Randomized Hadamard Transform
url: 'https://arxiv.org/abs/2605.13810v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ying Feng
  - Piotr Indyk
  - Michael Kapralov
  - Dmitry Krachun
  - Boris Prokhorov
categories:
  - cs.LG
  - cs.DS
  - cs.LG
published: '2026-05-13T17:38:18Z'
fetched_at: '2026-05-14T12:15:41.553Z'
---
Vector quantization via random projection followed by scalar quantization is a fundamental primitive in machine learning, with applications ranging from similarity search to federated learning and KV cache compression. While dense random rotations yield clean theoretical guarantees, they require $Θ(d^2)$ time. The randomized Hadamard transform $HD$ reduces this cost to $O(d \log d)$, but its discrete structure complicates analysis and leads to weaker or purely empirical compression guarantees. In this work, we study a variant of this approach: dithered quantization with a single randomized Hadamard transform. Specifically, the quantizer applies $HD$ to the input vector and subtracts a random scalar offset before quantizing, injecting additional randomness at negligible cost. We prove that this approach is unbiased and provides mean squared error bounds that asymptotically match those achievable with truly random rotation matrices. In particular, we prove that a dithered version of TurboQuant achieves mean squared error $\bigl(π\sqrt{3}/2 + o(1)\bigr) \cdot 4^{-b}$ at $b$ bits per coordinate, where the $o(1)$ term vanishes uniformly over all unit vectors and all dimensions as the number of quantization levels grows.

Authors: Ying Feng, Piotr Indyk, Michael Kapralov, Dmitry Krachun, Boris Prokhorov
Categories: cs.LG, cs.DS, cs.LG
