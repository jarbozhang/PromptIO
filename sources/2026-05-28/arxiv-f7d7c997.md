---
title: >-
  AREA: Attribute Extraction and Aggregation for CLIP-Based Class-Incremental
  Learning
url: 'https://arxiv.org/abs/2605.28809v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhen-Hao Xie
  - Yu-Cheng Shi
  - Da-Wei Zhou
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-05-27T17:58:16Z'
fetched_at: '2026-05-28T03:17:22.084Z'
---
Class-Incremental Learning (CIL) is important in building real-world learning systems. In CLIP-based CIL, the model performs classification by comparing similarity between visual and textual embeddings obtained from template prompts, e.g., ``a photo of a [CLASS]''. This seemingly monolithic matching process can be decomposed into two conceptually distinct stages: attribute extraction and attribute aggregation. For example, a model may recognize cat using attributes such as fur texture and whiskers. When learning a new class like car, the model must extract additional attributes like wheels and adjust how they are aggregated in the shared representation space. However, since only data from the current task is available, incremental updates can bias both attribute extraction and aggregation toward new classes, leading to catastrophic forgetting. Therefore, we propose AREA for attribute extraction and aggregation in CLIP-based CIL. To stabilize extraction, we anchor class-level visual and textual attributes on the hyperspherical embedding space via principal geodesic analysis. To stabilize aggregation, we learn lightweight task-specific experts with scoring and residual refinement, regularized by a variational information bottleneck objective. During inference, we perform routing over task attribute manifolds via optimal transport for more concise prediction. Experiments show that AREA consistently outperforms SOTA methods. Code is available at https://github.com/LAMDA-CL/ICML20

Authors: Zhen-Hao Xie, Yu-Cheng Shi, Da-Wei Zhou
Categories: cs.CV, cs.LG, cs.CV
