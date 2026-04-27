---
title: Relaxation-Informed Training of Neural Network Surrogate Models
url: 'https://arxiv.org/abs/2604.22746v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Calvin Tsay
categories:
  - math.OC
  - cs.LG
  - math.OC
published: '2026-04-24T17:46:55Z'
fetched_at: '2026-04-27T07:57:01.877Z'
---
ReLU neural networks trained as surrogate models can be embedded exactly in mixed-integer linear programs (MILPs), enabling global optimization over the learned function. The tractability of the resulting MILP depends on structural properties of the network, i.e., the number of binary variables in associated formulations and the tightness of the continuous LP relaxation. These properties are determined during training, yet standard training objectives (prediction loss with classical weight regularization) offer no mechanism to directly control them. This work studies training regularizers that directly target downstream MILP tractability. Specifically, we propose simple bound-based regularizers that penalize the big-M constants of MILP formulations and/or the number of unstable neurons. Moreover, we introduce an LP relaxation gap regularizer that explicitly penalizes the per-sample gap of the continuous relaxation at training points. We derive its associated gradient and provide an implementation from LP dual variables without custom automatic differentiation tools. We show that combining the above regularizers can approximate the full total derivative of the LP gap with respect to the network parameters, capturing both direct and indirect sensitivities. Experiments on non-convex benchmark functions and a two-stage stochastic programming problem with quantile neural network surrogates demonstrate that the proposed regularizers can reduce MILP solve times by up to four orders 

Authors: Calvin Tsay
Categories: math.OC, cs.LG, math.OC
