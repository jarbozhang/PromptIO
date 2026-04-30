---
title: On the Learning Curves of Revenue Maximization
url: 'https://arxiv.org/abs/2604.26922v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Steve Hanneke
  - Alkis Kalavasis
  - Shay Moran
  - Grigoris Velegkas
categories:
  - cs.LG
  - cs.DS
  - cs.GT
  - stat.ML
  - cs.LG
published: '2026-04-29T17:38:25Z'
fetched_at: '2026-04-30T08:51:20.278Z'
---
Learning curves are a fundamental primitive in supervised learning, describing how an algorithm's performance improves with more data and providing a quantitative measure of its generalization ability. Formally, a learning curve plots the decay of an algorithm's error for a fixed underlying distribution as a function of the number of training samples. Prior work on revenue-maximizing learning algorithms, starting with the seminal work of Cole and Roughgarden [STOC, 2014], adopts a distribution-free perspective, which parallels the PAC learning framework in learning theory. This approach evaluates performance against the hardest possible sequence of valuation distributions, one for each sample size, effectively defining the upper envelope of learning curves over all possible distributions, thus leading to error bounds that do not capture the shape of the learning curves. In this work we initiate the study of learning curves for revenue maximization and provide a near-complete characterization of their rate of decay in the basic setting of a single item and a single buyer. In the absence of any restriction on the valuation distribution, we show that there exists a Bayes-consistent algorithm, meaning that its learning curve converges to zero for any arbitrary valuation distribution as the number of samples $n \to \infty$. However, this convergence must be arbitrarily slow, even if the optimal revenue is finite. In contrast, if the optimal revenue is achieved by a finite price, t

Authors: Steve Hanneke, Alkis Kalavasis, Shay Moran, Grigoris Velegkas
Categories: cs.LG, cs.DS, cs.GT, stat.ML, cs.LG
