---
title: Interaction Is Not Necessary for Order-Optimal 1-Bit Mean Estimation
url: 'https://arxiv.org/abs/2608.02538v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jiachen Hu
  - Han Zhong
categories:
  - stat.ML
  - cs.IT
  - cs.LG
  - math.ST
  - stat.ML
published: '2026-08-03T17:28:12Z'
fetched_at: '2026-08-04T11:02:55.241Z'
---
This paper is concerned with one-bit mean estimation, where each independent sample is represented by a single binary message. We consider distributions on $\mathbb{R}$ with mean in $[-λ,λ]$ and absolute $k$-th central moment at most $σ^k$, where $k&gt;1$ is fixed. For this class, previous work attained the optimal sample complexity for general queries using a two-stage protocol. The first stage localizes the mean. The second-stage queries are chosen after localization and refine the estimate around the decoded center. We show that this interaction can be avoided by constructing a randomized fully non-adaptive protocol that fixes all queries before observing the data and matches the optimal adaptive sample complexity. For target accuracy $ε$ and confidence $1-δ$, its sample complexity scales as \[ \log\fracλσ + \begin{cases} (σ/ε)^2\log(1/δ), &amp; k&gt;2,\\ (σ/ε)^2\log(σ/ε)\log(1/δ), &amp; k=2,\\ (σ/ε)^{k/(k-1)}\log(1/δ), &amp; 1&lt;k&lt;2, \end{cases} \] up to constants depending only on $k$. In the range covered by the known lower bound, this rate is minimax optimal even among fully adaptive protocols. This gives a negative answer to the COLT 2026 open problem asking whether interaction is necessary for order-optimal one-bit mean estimation with general queries \citep[Open Problem~1]{lau2026open}.

Authors: Jiachen Hu, Han Zhong
Categories: stat.ML, cs.IT, cs.LG, math.ST, stat.ML
