---
title: >-
  When Do Learned Diffusion Proposals Help Constraint Solving? A Controlled
  Study on Continuous Algebraic Systems
url: 'https://arxiv.org/abs/2607.27169v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Quang Bui
  - Sparsh Roy
  - Akash Gundimeda
  - Davin Yin
categories:
  - cs.LG
  - cs.LG
published: '2026-07-29T17:44:31Z'
fetched_at: '2026-07-30T11:02:59.252Z'
---
Solving a continuous algebraic constraint system requires two decisions: which values satisfy the constraints, and which structural augmentation renders an unsolvable system solvable. Classical solvers answer the first well and the second only by enumeration. On that discrete decision, a candidate-conditioned repair ranker choosing among K augmentations reaches the exhaustive-search ceiling at a fraction of the calls, outperforming random (0.997 vs 0.236 balanced nonlinear menu accuracy; p &lt; 10^-70; 0.982 +/- 0.006 across seeds) and beating a budget-matched per-candidate probe on accuracy and cost. MARC turns such a system into a factor graph, over which a graph-neural diffusion denoiser proposes assignments, descent on an exact computer-algebra energy polishes them, and an exact symbolic checker certifies solutions. Evaluations of diffusion-based proposals rarely include one control: random multi-start under the same refinement budget. Applied to our system, it sharply curtails what the learned proposal contributes on the value decision. Does it beat random multi-start at choosing satisfying assignments? Only narrowly, in a predictable regime. Across trapped low-dimensional families it ties with random restart, but dominates in high dimension, where random search fails. Once variables couple, the advantage is gone. Since all methods share one polish and one checker, best-of-K random multi-start succeeds with probability exactly 1 - (1 - q(n))^K, where q(n) is single-start

Authors: Quang Bui, Sparsh Roy, Akash Gundimeda, Davin Yin
Categories: cs.LG, cs.LG
