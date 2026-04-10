---
title: Fast Spatial Memory with Elastic Test-Time Training
url: 'https://arxiv.org/abs/2604.07350v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ziqiao Ma
  - Xueyang Yu
  - Haoyu Zhen
  - Yuncong Yang
  - Joyce Chai
categories:
  - cs.CV
  - cs.GR
  - cs.LG
  - cs.CV
published: '2026-04-08T17:59:48Z'
fetched_at: '2026-04-10T00:43:39.927Z'
---
Large Chunk Test-Time Training (LaCT) has shown strong performance on long-context 3D reconstruction, but its fully plastic inference-time updates remain vulnerable to catastrophic forgetting and overfitting. As a result, LaCT is typically instantiated with a single large chunk spanning the full input sequence, falling short of the broader goal of handling arbitrarily long sequences in a single pass. We propose Elastic Test-Time Training inspired by elastic weight consolidation, that stabilizes LaCT fast-weight updates with a Fisher-weighted elastic prior around a maintained anchor state. The anchor evolves as an exponential moving average of past fast weights to balance stability and plasticity. Based on this updated architecture, we introduce Fast Spatial Memory (FSM), an efficient and scalable model for 4D reconstruction that learns spatiotemporal representations from long observation sequences and renders novel view-time combinations. We pre-trained FSM on large-scale curated 3D/4D data to capture the dynamics and semantics of complex spatial environments. Extensive experiments show that FSM supports fast adaptation over long sequences and delivers high-quality 3D/4D reconstruction with smaller chunks and mitigating the camera-interpolation shortcut. Overall, we hope to advance LaCT beyond the bounded single-chunk setting toward robust multi-chunk adaptation, a necessary step for generalization to genuinely longer sequences, while substantially alleviating the activation-

Authors: Ziqiao Ma, Xueyang Yu, Haoyu Zhen, Yuncong Yang, Joyce Chai
Categories: cs.CV, cs.GR, cs.LG, cs.CV
