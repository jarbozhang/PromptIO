---
title: >-
  Exposure Bias Can Alleviate Itself via Directional and Frequency Rectification
  in Flow Matching
url: 'https://arxiv.org/abs/2606.28226v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guanbo Huang
  - Jingjia Mao
  - Fanding Huang
  - Fengkai Liu
  - Xiangyang Luo
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-06-26T16:14:33Z'
fetched_at: '2026-06-29T23:02:47.159Z'
---
Flow Matching (FM) has achieved remarkable generative performance, yet it suffers from exposure bias due to discrepancies between training and inference. Existing mitigation strategies typically rely on static constraints or external heuristics. In this work, we propose that exposure bias itself inherently contains dynamic signals that can guide its own rectification. To leverage this, we introduce DEFAR (DirEctional-Frequency Adaptive Rectification). This framework simulates the single-step inference process during training to identify exposure bias. It utilizes directional and frequency-adaptive feedback signals from the bias itself to enhance the model's bias tolerance. It consists of two key components: (1) Anti-Drift Rectification (ADR). ADR treats inference-time drift as a signal to learn the direction to steer deviated states back toward the target. ADR endows the model with intrinsic active self-rectification capabilities; (2) Frequency Compensation (FC). Empirically, we observe that accumulated bias often stems from a lack of low-frequency components in high-noise stages, and exposure bias carries the missing frequency. FC leverages the bias itself as a self-feedback weighting factor to reinforce the missing frequency components. Experiments on CIFAR-10, CelebA-64, and ImageNet-256/512 show that DEFAR outperforms prior baselines and further demonstrates favorable scalability, compatibility, and inference robustness.

Authors: Guanbo Huang, Jingjia Mao, Fanding Huang, Fengkai Liu, Xiangyang Luo
Categories: cs.CV, cs.AI, cs.CV
