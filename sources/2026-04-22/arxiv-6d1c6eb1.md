---
title: Generalization at the Edge of Stability
url: 'https://arxiv.org/abs/2604.19740v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mario Tuci
  - Caner Korkmaz
  - Umut Şimşekli
  - Tolga Birdal
categories:
  - cs.LG
  - cs.AI
  - cs.CV
  - stat.ML
  - cs.LG
published: '2026-04-21T17:59:02Z'
fetched_at: '2026-04-22T08:06:49.531Z'
---
Training modern neural networks often relies on large learning rates, operating at the edge of stability, where the optimization dynamics exhibit oscillatory and chaotic behavior. Empirically, this regime often yields improved generalization performance, yet the underlying mechanism remains poorly understood. In this work, we represent stochastic optimizers as random dynamical systems, which often converge to a fractal attractor set (rather than a point) with a smaller intrinsic dimension. Building on this connection and inspired by Lyapunov dimension theory, we introduce a novel notion of dimension, coined the `sharpness dimension', and prove a generalization bound based on this dimension. Our results show that generalization in the chaotic regime depends on the complete Hessian spectrum and the structure of its partial determinants, highlighting a complexity that cannot be captured by the trace or spectral norm considered in prior work. Experiments across various MLPs and transformers validate our theory while also providing new insights into the recently observed phenomenon of grokking.

Authors: Mario Tuci, Caner Korkmaz, Umut Şimşekli, Tolga Birdal
Categories: cs.LG, cs.AI, cs.CV, stat.ML, cs.LG
