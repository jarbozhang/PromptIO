---
title: >-
  DECO: Sparse Mixture-of-Experts with Dense-Comparable Performance on End-Side
  Devices
url: 'https://arxiv.org/abs/2605.10933v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenyang Song
  - Weilin Zhao
  - Xu Han
  - Chaojun Xiao
  - Yingfa Chen
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-05-11T17:58:28Z'
fetched_at: '2026-05-12T11:42:53.208Z'
---
While Mixture-of-Experts (MoE) scales model capacity without proportionally increasing computation, its massive total parameter footprint creates significant storage and memory-access bottlenecks, which hinder efficient end-side deployment that simultaneously requires high performance, low computational cost, and small storage overhead. To achieve these properties, we present DECO, a sparse MoE architecture designed to match the performance of dense Transformers under identical total parameter budgets and training tokens. DECO utilizes the differentiable and flexible ReLU-based routing enhanced by learnable expert-wise scaling, which adaptively balances the contributions of routed and shared experts. Furthermore, we introduce NormSiLU, an activation function that normalizes inputs prior to SiLU operators, producing a more stable trend of routed-expert activation ratio and a higher intrinsic sparsity level. We also identify an empirical advantage in using non-gated MLP experts with ReLU-based routing, indicating the possibility of MoE architecture simplification. Experiments demonstrate that DECO, activating only 20% of experts, matches dense performance and outperforms established MoE baselines. Our specialized acceleration kernel delivers a 3.00$\times$ speedup on real hardware compared with dense inference. Codes and checkpoints will be released.

Authors: Chenyang Song, Weilin Zhao, Xu Han, Chaojun Xiao, Yingfa Chen
Categories: cs.LG, cs.CL, cs.LG
