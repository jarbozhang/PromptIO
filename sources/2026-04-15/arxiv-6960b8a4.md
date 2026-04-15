---
title: >-
  Rethinking the Personalized Relaxed Initialization in the Federated Learning:
  Consistency and Generalization
url: 'https://arxiv.org/abs/2604.12768v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Li Shen
  - Yan Sun
  - Dacheng Tao
categories:
  - cs.LG
  - cs.LG
published: '2026-04-14T14:08:57Z'
fetched_at: '2026-04-15T02:22:53.572Z'
---
Federated learning (FL) is a distributed paradigm that coordinates massive local clients to collaboratively train a global model via stage-wise local training processes on the heterogeneous dataset. Previous works have implicitly studied that FL suffers from the ``client-drift'' problem, which is caused by the inconsistent optimum across local clients. However, till now it still lacks solid theoretical analysis to explain the impact of this local inconsistency. To alleviate the negative impact of ``client drift'' and explore its substance in FL, in this paper, we first propose an efficient FL algorithm FedInit, which allows employing the personalized relaxed initialization state at the beginning of each local training stage. Specifically, FedInit initializes the local state by moving away from the current global state towards the reverse direction of the latest local state. Moreover, to further understand how inconsistency disrupts performance in FL, we introduce the excess risk analysis and study the divergence term to investigate the test error in FL. Our studies show that optimization error is not sensitive to this local inconsistency, while it mainly affects the generalization error bound. Extensive experiments are conducted to validate its efficiency. The proposed FedInit method could achieve comparable results compared to several advanced benchmarks without any additional training or communication costs. Meanwhile, the stage-wise personalized relaxed initialization coul

Authors: Li Shen, Yan Sun, Dacheng Tao
Categories: cs.LG, cs.LG
