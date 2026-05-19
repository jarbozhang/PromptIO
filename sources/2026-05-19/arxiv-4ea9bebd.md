---
title: >-
  Can Adaptive Gradient Methods Converge under Heavy-Tailed Noise? A Case Study
  of AdaGrad
url: 'https://arxiv.org/abs/2605.18694v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zijian Liu
categories:
  - math.OC
  - cs.LG
  - stat.ML
  - math.OC
published: '2026-05-18T17:30:15Z'
fetched_at: '2026-05-19T07:53:23.213Z'
---
Many tasks in modern machine learning are observed to involve heavy-tailed gradient noise during the optimization process. To manage this realistic and challenging setting, new mechanisms, such as gradient clipping and gradient normalization, have been introduced to ensure the convergence of first-order algorithms. However, adaptive gradient methods, a famous class of modern optimizers that includes popular $\mathtt{Adam}$ and $\mathtt{AdamW}$, often perform well even without any extra operations mentioned above. It is therefore natural to ask whether adaptive gradient methods can converge under heavy-tailed noise without any algorithmic changes. In this work, we take the first step toward answering this question by investigating a special case, $\mathtt{AdaGrad}$, the origin of adaptive gradient methods. We provide the first provable convergence rate for $\mathtt{AdaGrad}$ in non-convex optimization when the tail index $p$ satisfies $4/3&lt;p\leq2$. Notably, this result is achieved without requiring any prior knowledge of $p$ and is hence adaptive to the tail index. In addition, we develop an algorithm-dependent lower bound, suggesting that the existing minimax rate for heavy-tailed optimization is not attainable by $\mathtt{AdaGrad}$. Lastly, we consider $\mathtt{AdaGrad}\text{-}\mathtt{Norm}$, a popular variant of $\mathtt{AdaGrad}$ in theoretical studies, and show an improved rate that holds for any $1&lt;p\leq2$ under an extra mild assumption.

Authors: Zijian Liu
Categories: math.OC, cs.LG, stat.ML, math.OC
