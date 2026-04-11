---
title: >-
  Demystifying OPD: Length Inflation and Stabilization Strategies for Large
  Language Models
url: 'https://arxiv.org/abs/2604.08527v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Feng Luo
  - Yu-Neng Chuang
  - Guanchu Wang
  - Zicheng Xu
  - Xiaotian Han
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-04-09T17:58:02Z'
fetched_at: '2026-04-11T01:43:18.432Z'
---
On-policy distillation (OPD) trains student models under their own induced distribution while leveraging supervision from stronger teachers. We identify a failure mode of OPD: as training progresses, on-policy rollouts can undergo abrupt length inflation, causing truncated trajectories to dominate the training data. This truncation collapse coincides with abrupt repetition saturation and induces biased gradient signals, leading to severe training instability and sharp degradation in validation performance. We attribute this problem to the interaction between student-induced data collection and the distillation objective, which implicitly favors long and repetitive rollouts. To address this issue, we propose StableOPD, a stabilized OPD framework that combines a reference-based divergence constraint with rollout mixture distillation. These together mitigate repetition-induced length inflation and further stabilize OPD training. Across multiple math reasoning datasets, our approach prevents truncation collapse, stabilizes training dynamics, and improves performance by 7.2% on average.

Authors: Feng Luo, Yu-Neng Chuang, Guanchu Wang, Zicheng Xu, Xiaotian Han
Categories: cs.CL, cs.LG, cs.CL
