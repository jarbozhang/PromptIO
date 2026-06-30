---
title: 'DOPD: Dual On-policy Distillation'
url: 'https://arxiv.org/abs/2606.30626v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xinlei Yu
  - Gen Li
  - Qingyi Si
  - Guibin Zhang
  - Yuqi Xu
categories:
  - cs.AI
  - cs.AI
published: '2026-06-29T17:55:53Z'
fetched_at: '2026-06-30T23:02:51.937Z'
---
On-policy distillation (OPD) offers superior capacity transfer by supervising student-sampled trajectories with dense token-level signals. To furnish high-quality supervision sources and thereby elevate the performance frontier of distillation, an intuitive direction is to infuse privileged information to either teacher or student itself. However, this additional input induces a potential failure mode we dub privilege illusion: a pattern that conflates the transferable capability gap that students are meant to close, and the information asymmetry gap that can only be mimicked but never replicated. This issue is further amplified by the inherent non-uniformity of token-level supervision, where only a small subset of tokens carries pivotal capability-bearing signals. To this end, we propose DOPD, an advantage-aware dual distillation paradigm that dynamically routes token-level supervision between privileged teacher and privileged student policies based on their advantage gap and relative probabilities. Each token receives supervision of different strength, objective, and strategy from either teacher or student itself, which transfers credible capability while simultaneously receiving auxiliary signals, to alleviate privilege illusion. Extensive experiments on both large language model (LLM) and vision-language model (VLM) settings demonstrate that DOPD consistently outperforms Vanilla OPD and other counterparts. Further results on stability, robustness, continual learning, and 

Authors: Xinlei Yu, Gen Li, Qingyi Si, Guibin Zhang, Yuqi Xu
Categories: cs.AI, cs.AI
