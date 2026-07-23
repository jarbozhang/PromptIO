---
title: Online Variance Reduction for Domain Adaptation on Streaming Data
url: 'https://arxiv.org/abs/2607.20374v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Andrea Napoli
categories:
  - cs.LG
  - cs.LG
published: '2026-07-22T17:04:29Z'
fetched_at: '2026-07-23T11:02:10.167Z'
---
This paper studies the problem of stochastic variance reduction (SVR) for the maximum mean discrepancy (MMD) and correlation alignment (CORAL) loss functions. Although various offline SVR algorithms for these losses have been proposed, these are incompatible with online, distributed, or incremental learning settings. This paper presents Adaptive vaRiance Reduction via Online reWeighting (ARROW), the first online SVR algorithm for the MMD and CORAL for streamed data. The method maintains moving average references of the alignment statistics, and adaptively reweights incoming minibatches so that the minibatch and reference statistics are aligned. Further, we propose a relaxed reweighting scheme so that the ensuing weight-optimisation problem is tractable. In experiments and simulations, we show that ARROW performs competitively with offline algorithms in terms of runtime, degree of variance reduction achieved, and target domain accuracy.

Authors: Andrea Napoli
Categories: cs.LG, cs.LG
