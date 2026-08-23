---
title: Variance-reduced Domain Adaptation using Paired Sampling
url: 'https://arxiv.org/abs/2607.20367v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Andrea Napoli
categories:
  - cs.LG
  - cs.LG
published: '2026-07-22T16:58:45Z'
fetched_at: '2026-07-23T11:02:10.168Z'
---
Correlation alignment and the maximum mean discrepancy are two widely used distribution-matching frameworks for unsupervised domain adaptation (UDA). However, high variance in these losses has been shown to undermine their effectiveness in minibatch optimisation settings. Furthermore, the losses lack finite-sum structure, which renders them incompatible with classical stochastic variance reduction (SVR) methods. This paper proposes Paired Sampling for Domain Adaptation (PSDA), a novel SVR technique tailored to such objectives. PSDA pairs observations both within and across domains, to form quadruplets that are always sampled together during training. The pairings are designed to minimise expected gradient variance, and reduce to solving a set of linear assignment problems. Our simulations demonstrate reduced variance compared to related methods, and experiments on three domain shift datasets show improved target domain accuracy.

Authors: Andrea Napoli
Categories: cs.LG, cs.LG
