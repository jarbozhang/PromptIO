---
title: >-
  How Data Shapes RoPE Frequency Usage: From Positional Scale Matching to Length
  Generalization
url: 'https://arxiv.org/abs/2607.07678v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xinyi Wu
  - Siyuan Liu
  - Ali Jadbabaie
categories:
  - cs.LG
  - cs.LG
published: '2026-07-08T17:38:14Z'
fetched_at: '2026-07-09T23:02:05.097Z'
---
Rotary Position Embeddings (RoPE) provide transformers with a fixed grid of positional frequencies, yet trained models use these frequencies highly non-uniformly. We study what determines this frequency usage and propose a data-centered explanation: RoPE frequencies are selected to match the relative-distance structure of the training data. Viewing each frequency as a positional lens, we formalize a field-resolution tradeoff and show that, for a data-induced dependency profile of width $W$, the optimal frequency scales as $1/W$. This frequency-matching principle explains controlled observations on synthetic and text-based data, and suggests that the mid-low frequency bands observed in language models arise from the multi-scale dependency structure of natural language. We further connect frequency selection to position-interpolation-based length generalization: scaling frequencies down expands the effective field while reducing resolution. This helps when longer-context dependencies are approximate dilations of those seen during training, but can fail when relevant dependencies do not scale with context length. Empirically, we show that natural language exhibits approximate self-similarity across positional scales, explaining why test-time frequency scaling can support long-context generalization. Overall, our results identify a data-driven mechanism behind emergent RoPE frequency usage and show that long-context generalization depends on two forms of scale matching: between l

Authors: Xinyi Wu, Siyuan Liu, Ali Jadbabaie
Categories: cs.LG, cs.LG
