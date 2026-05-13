---
title: Search Your Block Floating Point Scales!
url: 'https://arxiv.org/abs/2605.12464v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tanmaey Gupta
  - Hayden Prairie
  - Xiaoxia Wu
  - Reyna Abhyankar
  - Qingyang Wu
categories:
  - cs.LG
  - cs.AR
  - cs.PF
  - cs.LG
published: '2026-05-12T17:50:08Z'
fetched_at: '2026-05-13T10:19:24.405Z'
---
Quantization has emerged as a standard technique for accelerating inference for generative models by enabling faster low-precision computations and reduced memory transfers. Recently, GPU accelerators have added first-class support for microscaling Block Floating Point (BFP) formats. Standard BFP algorithms use a fixed scale based on the maximum magnitude of the block. We observe that this scale choice can be suboptimal with respect to quantization errors. In this work, we propose ScaleSearch, an alternative strategy for selecting these scale factors: using a fine-grained search leveraging the mantissa bits in microscaling formats to minimize the quantization error for the given distribution. ScaleSearch can be integrated with existing quantization methods such as Post Training Quantization and low-precision attention, and is shown to improve their performance. Additionally, we introduce ScaleSearchAttention, an accelerated NVFP4-based attention algorithm, which uses ScaleSearch and adapted prior techniques to ensure near-0 performance loss for causal language modeling. Experiments show that ScaleSearch reduces quantization error by 27% for NVFP4 and improves language model PTQ by up to 15 points for MATH500 (Qwen3-8B), while ScaleSearchAttention improves Wikitext-2 PPL by upto 0.77 points for Llama 3.1 70B. The proposed methods closely match baseline performance while providing quantization accuracy improvements.

Authors: Tanmaey Gupta, Hayden Prairie, Xiaoxia Wu, Reyna Abhyankar, Qingyang Wu
Categories: cs.LG, cs.AR, cs.PF, cs.LG
