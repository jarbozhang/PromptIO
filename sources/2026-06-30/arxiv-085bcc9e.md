---
title: >-
  VGB for Masked Diffusion Model: Efficient Test-time Scaling for Reward
  Satisfaction and Sample Editing
url: 'https://arxiv.org/abs/2606.28301v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kijung Jeon
  - Thuy-Duong Vuong
  - Molei Tao
categories:
  - cs.LG
  - cs.DS
  - math.NA
  - math.PR
  - stat.ML
  - cs.LG
published: '2026-06-26T17:47:09Z'
fetched_at: '2026-06-29T23:02:47.142Z'
---
Inference-time scaling is a promising paradigm to improve generative models, especially when outputs must satisfy structural constraints or optimize downstream rewards. We consider Masked Diffusion Model (MDM) and introduce MDM-VGB, a discrete diffusion sampler that augments unmasking generation with theoretically principled reward-guided remasking. Inspired by the recent success of the classical Jerrum-Sinclair backtracking Markov chain in reward-tilted generation, MDM-VGB extends the backtracking random walk from a fixed prefix tree to a masked-state graph, allowing tokens to be unmasked and remasked at arbitrary positions. The resulting sampler favors unmasking and remasking moves that lead to higher-value partial configurations, enabling both effective high-reward generation and efficient repair of low-reward samples. We prove that MDM-VGB is robust to process-verifier noise and achieves quadratic complexity, while popular test-time heuristics such as best-of-$N$ can incur exponential complexity due to error accumulation. Our theoretical findings are corroborated by strong empirical performance, particularly on popular constraint-satisfaction and scientific benchmarks such as Sudoku and QM9.

Authors: Kijung Jeon, Thuy-Duong Vuong, Molei Tao
Categories: cs.LG, cs.DS, math.NA, math.PR, stat.ML, cs.LG
