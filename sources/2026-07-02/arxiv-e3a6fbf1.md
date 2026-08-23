---
title: Random Reshuffling Dominates Stochastic Gradient Descent
url: 'https://arxiv.org/abs/2606.32005v1'
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
published: '2026-06-30T17:38:22Z'
fetched_at: '2026-07-01T23:03:14.710Z'
---
Stochastic Gradient Descent ($\textsf{SGD}$) is one of the most classical optimization algorithms with favorable theoretical guarantees, yet the practical implementation of $\textsf{SGD}$ differs subtly from its well-known form and is often referred to as Shuffling Stochastic Gradient Descent ($\textsf{Shuffling SGD}$). A particularly popular strategy in $\textsf{Shuffling SGD}$ is Random Reshuffling ($\textsf{RR}$), which has achieved great empirical success across numerous experiments. Despite its strong performance, $\textsf{RR}$ has long been considered a heuristic due to a lack of theoretical support. Over the last decade, people have finally established provable convergence rates for $\textsf{RR}$, thus justifying its observed superiority. However, for smooth convex optimization, two clouds over the convergence theory of $\textsf{RR}$ remain to this day. More precisely, according to the current theory, $\textsf{Shuffling SGD}$ under $\textsf{RR}$ converges only when the stepsize is smaller than a threshold proportional to $1/n$, where $n$ is the number of summands in the objective (or the number of data points). Consequently, the optimally tuned theoretical rate of $\textsf{Shuffling SGD}$ under $\textsf{RR}$ is strictly worse than that of $\textsf{SGD}$ when the number of epochs is smaller than another threshold proportional to $n$. These two restrictions heavily limit the applicability of existing theories and leave a critical mismatch with practice. In this work, for

Authors: Zijian Liu
Categories: math.OC, cs.LG, stat.ML, math.OC
