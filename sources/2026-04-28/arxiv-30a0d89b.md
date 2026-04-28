---
title: Transformer as an Euler Discretization of Score-based Variational Flow
url: 'https://arxiv.org/abs/2604.23740v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Huadong Liao
categories:
  - cs.LG
  - cs.LG
published: '2026-04-26T14:36:31Z'
fetched_at: '2026-04-28T02:04:33.983Z'
---
Despite the Transformer's dominance across machine learning, its architecture remains largely heuristic and lacks a unified theoretical foundation. We introduce Score-based Variational Flow (SVFlow), a continuous-time dynamical system for representation learning in which the state evolves according to a variational posterior-weighted average of conditional log-likelihood scores, and provide a principled basis for regularization through variational consistency. We show that forward Euler discretization of spherical SVFlow exactly recovers the Transformer architecture. Multi-head attention approximates SVFlow vector field via a vMF kernel-smoothed posterior, while MoE/FFN approximates it in a relaxed network-based way, and the residual-normalization block implements a relaxed retraction that maintains spherical geometry. This unification explains why attention trains stably without explicit regularization while MoE requires auxiliary balancing losses. Experiments on pre-trained language models with prefix shuffling show that SVFlow-induced metrics correlate with task performance, reveal depth-dependent sensitivity, and reflect the intrinsic dynamics of attention.

Authors: Huadong Liao
Categories: cs.LG, cs.LG
