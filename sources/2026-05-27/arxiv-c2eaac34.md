---
title: Looped Diffusion Language Models
url: 'https://arxiv.org/abs/2605.26106v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sanghyun Lee
  - Chunsan Hong
  - Seungryong Kim
  - Jonghyun Lee
  - Jongho Park
categories:
  - cs.LG
  - cs.LG
published: '2026-05-25T17:58:24Z'
fetched_at: '2026-05-27T01:19:09.164Z'
---
Masked diffusion models (MDMs) have emerged as a promising alternative to autoregressive models for language modeling, yet the effective design of transformer architectures for MDMs remains underexplored. In this paper, we show that selectively looping the early-middle transformer layers significantly improves both training efficiency and model performance in MDMs. We call this approach LoopMDM(Looped Masked Diffusion Model), which brings two key benefits: looping layers at training-time yields a depth-scaling effect without adding parameters, while varying the number of loops at inference-time enables flexible compute scaling. Despite the simplicity, the results are striking: across multiple pre-training corpora, LoopMDM matches the performance of same-size MDMs with up to 3.3 fewer training FLOPs, while its final performance outperforms them on various reasoning benchmarks, including up to 8.5 points on GSM8K. It even surpasses deeper non-looped MDMs trained with comparable per-step compute, indicating that selective looping is more effective than naive depth scaling. Furthermore, LoopMDM can scale inference-time compute by increasing the number of loops. Adaptively adjusting the number of loops throughout the sampling process further yields additional gains in compute efficiency while maintaining performance. Lastly, with attention analysis, we provide evidence that looping is effective in MDMs by promoting interactions among masked positions. Our code and weights will be 

Authors: Sanghyun Lee, Chunsan Hong, Seungryong Kim, Jonghyun Lee, Jongho Park
Categories: cs.LG, cs.LG
