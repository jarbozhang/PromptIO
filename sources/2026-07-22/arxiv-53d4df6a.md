---
title: 'ISO: An RLVR-Native Optimization Stack'
url: 'https://arxiv.org/abs/2607.19331v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hanqing Zhu
  - Wenyan Cong
  - Zhizhou Sha
  - Sagnik Mukherjee
  - Xinyuan Song
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-21T17:51:36Z'
fetched_at: '2026-07-22T11:02:38.791Z'
---
Reinforcement learning with verifiable rewards (RLVR) is rapidly advancing the reasoning capabilities of language models, yet the optimization layer that converts reward feedback into weight-space updates remains poorly understood. Building on our prior analysis (Zhu et al., 2025), we study this missing layer through the singular structure of model weights and identify spectral inheritance: RLVR can reuse the base model's weight spectra while acquiring new behavior through changes in the associated input and output singular frames. We operationalize spectral inheritance as Isospectral Optimization (ISO), an RLVR-native, fixed-spectrum optimization framework with complementary offline and online instantiations. Offline, ISO-Merger combines the frame changes of shared-base specialists into a single fixed-spectrum model, requiring no post-merge data, rollouts, gradient updates, or on-policy distillation (OPD). It recovers complementary specialist capabilities and achieves the strongest aggregate performance among the compared data-free merging methods. Online, ISO-Optimizer applies a chosen base optimizer, including AdamW and Muon, to the frame variables while keeping the base spectra fixed. Across reasoning and coding tasks ranging from 1.5B to 8B parameters, ISO-Optimizer improves accuracy in the reported runs and reaches matched scores with substantially fewer training steps. On Qwen3-8B-Base, AdamW reaches an aggregate accuracy of 0.495 after 270 training steps. ISO-AdamW re

Authors: Hanqing Zhu, Wenyan Cong, Zhizhou Sha, Sagnik Mukherjee, Xinyuan Song
Categories: cs.LG, cs.AI, cs.LG
