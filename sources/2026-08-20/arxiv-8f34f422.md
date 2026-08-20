---
title: Continuous-Time Reinforcement Learning for Controlled Hawkes Jump-Diffusions
url: 'https://arxiv.org/abs/2608.19151v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tomasz R. Bielecki
  - Thibaut Mastrolia
  - Haoze Yan
categories:
  - cs.LG
  - math.OC
  - stat.ML
  - cs.LG
published: '2026-08-19T17:40:23Z'
fetched_at: '2026-08-20T11:02:39.299Z'
---
We study stochastic control of multivariate Hawkes-driven stochastic differential equations with machine learning algorithms in a non-Markovian setting. Due to the path dependence of the memory of the Hawkes intensity, this problem does not fall within classical stochastic control theory outside particular Markovian kernels. We first develop a finite-dimensional Markovianization procedure and algorithm to approximate multivariate Hawkes processes with mixtures of exponential kernels. We prove the convergence of the Markovianized approximation of the Hawkes process, its intensity, and the value of the problem to the original non-Markovian processes and the value of the primal problem. We then formulate continuous-time deterministic policy gradient learning on the Markovianized approximation of the problem, called Hawkes-CT DDPG. We propose a model-free algorithm to solve the non-Markovian Hawkes-driven optimization by observing only the event times of the process, the realization of the solution to the SDE, and a chosen set of decay filters, while the Hawkes kernel coefficients remain unknown. We compare our continuous time reinforcement learning Hawkes-CT DDPG method with discrete time reinforcement learning techniques under three different types of kernels: simple exponential, Erlang, and power-law kernels.

Authors: Tomasz R. Bielecki, Thibaut Mastrolia, Haoze Yan
Categories: cs.LG, math.OC, stat.ML, cs.LG
