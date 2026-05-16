---
title: 'VGGT-Edit: Feed-forward Native 3D Scene Editing with Residual Field Prediction'
url: 'https://arxiv.org/abs/2605.15186v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kaixin Zhu
  - Yiwen Tang
  - Yifan Yang
  - Renrui Zhang
  - Bohan Zeng
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-14T17:59:04Z'
fetched_at: '2026-05-16T14:12:26.802Z'
---
High-quality 3D scene reconstruction has recently advanced toward generalizable feed-forward architectures, enabling the generation of complex environments in a single forward pass. However, despite their strong performance in static scene perception, these models remain limited in responding to dynamic human instructions, which restricts their use in interactive applications. Existing editing methods typically rely on a 2D-lifting strategy, where individual views are edited independently and then lifted back into 3D space. This indirect pipeline often leads to blurry textures and inconsistent geometry, as 2D editors lack the spatial awareness required to preserve structure across viewpoints. To address these limitations, we propose VGGT-Edit, a feed-forward framework for text-conditioned native 3D scene editing. VGGT-Edit introduces depth-synchronized text injection to align semantic guidance with the backbone's spatial poses, ensuring stable instruction grounding. This semantic signal is then processed by a residual transformation head, which directly predicts 3D geometric displacements to deform the scene while preserving background stability. To ensure high-fidelity results, we supervise the framework with a multi-term objective function that enforces geometric accuracy and cross-view consistency. We also construct the DeltaScene Dataset, a large-scale dataset generated through an automated pipeline with 3D agreement filtering to ensure ground-truth quality. Experiments s

Authors: Kaixin Zhu, Yiwen Tang, Yifan Yang, Renrui Zhang, Bohan Zeng
Categories: cs.CV, cs.AI, cs.CV
