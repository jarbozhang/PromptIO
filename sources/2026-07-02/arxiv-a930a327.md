---
title: >-
  FedLAB: Traceable Semantic Codebooks for Federated Multimodal Graph Foundation
  Learning
url: 'https://arxiv.org/abs/2606.32016v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zekai Chen
  - Kairui Yang
  - Xuaner Chen
  - Xunkai Li
  - Xun Wu
categories:
  - cs.LG
  - cs.LG
published: '2026-06-30T17:47:39Z'
fetched_at: '2026-07-01T23:03:14.708Z'
---
Multimodal graph foundation models aim to learn reusable knowledge from graphs enriched with text, images, attributes, and relational topology, thereby supporting diverse graph-centric and modality-centric tasks. In practice, however, such multimodal graphs are often distributed across decentralized clients, where raw contents and local structures cannot be centrally shared due to privacy constraints. This motivates federated multimodal graph foundation learning, which requires not only transferable representation learning but also intrinsic semantic traceability under strict data isolation. Existing methods usually exchange or store knowledge through parameters, prototypes, embeddings, or compact codebooks, which support optimization and transfer but do not explicitly expose how modality evidence, node semantics, and topology context jointly support predictions. To bridge this gap, we propose FedLAB, a traceable semantic codebook framework that organizes multimodal graph knowledge into typed hierarchical codebooks for modality evidence, node semantics, and topology context. FedLAB further refines these trace units through federated semantic barycenter pre-training while keeping raw multimodal contents and graph structures local. Extensive experiments on 10 benchmarks and 6 downstream tasks show that FedLAB improves over state-of-the-art baselines by up to 7.53\%, while preserving a native semantic trace interface.

Authors: Zekai Chen, Kairui Yang, Xuaner Chen, Xunkai Li, Xun Wu
Categories: cs.LG, cs.LG
