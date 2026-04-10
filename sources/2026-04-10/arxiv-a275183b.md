---
title: >-
  SL-FAC: A Communication-Efficient Split Learning Framework with
  Frequency-Aware Compression
url: 'https://arxiv.org/abs/2604.07316v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zehang Lin
  - Miao Yang
  - Haihan Zhu
  - Zheng Lin
  - Jianhao Huang
categories:
  - cs.LG
  - cs.LG
published: '2026-04-08T17:25:22Z'
fetched_at: '2026-04-10T00:43:39.930Z'
---
The growing complexity of neural networks hinders the deployment of distributed machine learning on resource-constrained devices. Split learning (SL) offers a promising solution by partitioning the large model and offloading the primary training workload from edge devices to an edge server. However, the increasing number of participating devices and model complexity leads to significant communication overhead from the transmission of smashed data (e.g., activations and gradients), which constitutes a critical bottleneck for SL. To tackle this challenge, we propose SL-FAC, a communication-efficient SL framework comprising two key components: adaptive frequency decomposition (AFD) and frequency-based quantization compression (FQC). AFD first transforms the smashed data into the frequency domain and decomposes it into spectral components with distinct information. FQC then applies customized quantization bit widths to each component based on its spectral energy distribution. This collaborative approach enables SL-FAC to achieve significant communication reduction while strategically preserving the information most crucial for model convergence. Extensive experiments confirm the superior performance of SL-FAC for improving the training efficiency.

Authors: Zehang Lin, Miao Yang, Haihan Zhu, Zheng Lin, Jianhao Huang
Categories: cs.LG, cs.LG
