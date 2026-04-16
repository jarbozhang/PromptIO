---
title: >-
  From $P(y|x)$ to $P(y)$: Investigating Reinforcement Learning in Pre-train
  Space
url: 'https://arxiv.org/abs/2604.14142v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuqiao Tan
  - Minzheng Wang
  - Bo Liu
  - Zichen Liu
  - Tian Liang
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.LG
published: '2026-04-15T17:59:01Z'
fetched_at: '2026-04-16T06:07:35.552Z'
---
While reinforcement learning with verifiable rewards (RLVR) significantly enhances LLM reasoning by optimizing the conditional distribution P(y|x), its potential is fundamentally bounded by the base model's existing output distribution. Optimizing the marginal distribution P(y) in the Pre-train Space addresses this bottleneck by encoding reasoning ability and preserving broad exploration capacity. Yet, conventional pre-training relies on static corpora for passive learning, leading to a distribution shift that hinders targeted reasoning enhancement. In this paper, we introduce PreRL (Pre-train Space RL), which applies reward-driven online updates directly to P(y). We theoretically and empirically validate the strong gradient alignment between log P(y) and log P(y|x), establishing PreRL as a viable surrogate for standard RL. Furthermore, we uncover a critical mechanism: Negative Sample Reinforcement (NSR) within PreRL serves as an exceptionally effective driver for reasoning. NSR-PreRL rapidly prunes incorrect reasoning spaces while stimulating endogenous reflective behaviors, increasing transition and reflection thoughts by 14.89x and 6.54x, respectively. Leveraging these insights, we propose Dual Space RL (DSRL), a Policy Reincarnation strategy that initializes models with NSR-PreRL to expand the reasoning horizon before transitioning to standard RL for fine-grained optimization. Extensive experiments demonstrate that DSRL consistently outperforms strong baselines, proving t

Authors: Yuqiao Tan, Minzheng Wang, Bo Liu, Zichen Liu, Tian Liang
Categories: cs.LG, cs.AI, cs.CL, cs.LG
