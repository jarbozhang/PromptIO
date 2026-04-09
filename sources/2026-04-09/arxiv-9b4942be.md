---
title: 'Beyond Loss Values: Robust Dynamic Pruning via Loss Trajectory Alignment'
url: 'https://arxiv.org/abs/2604.07306v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Huaiyuan Qin
  - Muli Yang
  - Gabriel James Goenawan
  - Kai Wang
  - Zheng Wang
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-04-08T17:14:50Z'
fetched_at: '2026-04-09T07:18:08.759Z'
---
Existing dynamic data pruning methods often fail under noisy-label settings, as they typically rely on per-sample loss as the ranking criterion. This could mistakenly lead to preserving noisy samples due to their high loss values, resulting in significant performance drop. To address this, we propose AlignPrune, a noise-robust module designed to enhance the reliability of dynamic pruning under label noise. Specifically, AlignPrune introduces the Dynamic Alignment Score (DAS), which is a loss-trajectory-based criterion that enables more accurate identification of noisy samples, thereby improving pruning effectiveness. As a simple yet effective plug-and-play module, AlignPrune can be seamlessly integrated into state-of-the-art dynamic pruning frameworks, consistently outperforming them without modifying either the model architecture or the training pipeline. Extensive experiments on five widely-used benchmarks across various noise types and pruning ratios demonstrate the effectiveness of AlignPrune, boosting accuracy by up to 6.3\% over state-of-the-art baselines. Our results offer a generalizable solution for pruning under noisy data, encouraging further exploration of learning in real-world scenarios. Code is available at: https://github.com/leonqin430/AlignPrune.

Authors: Huaiyuan Qin, Muli Yang, Gabriel James Goenawan, Kai Wang, Zheng Wang
Categories: cs.CV, cs.LG, cs.CV
