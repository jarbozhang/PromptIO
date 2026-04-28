---
title: Can an MLP Absorb Its Own Skip Connection?
url: 'https://arxiv.org/abs/2604.23705v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Antonij Mijoski
  - Marko Karbevski
categories:
  - cs.LG
  - cs.LG
published: '2026-04-26T13:37:27Z'
fetched_at: '2026-04-28T02:04:33.989Z'
---
We study when a skip connection around a single-hidden-layer MLP can be absorbed into a residual-free MLP of the same width. We first show that for any architecture whose skip branch is an invertible linear map (including Hyper-Connections and their manifold-constrained variants), the problem reduces to the identity skip case. For homogeneous activations of degree $k \neq 1$, such as ReLU$^2$ and ReGLU, absorption is unconditionally impossible by a degree argument. For gated activations whose gate is differentiable at the origin with $g(0) = 0$, including SwiGLU and GeGLU, a linearization argument gives the same conclusion. These impossibility results extend to arbitrary depth: a composition of $L$ residual blocks using such activations cannot be replicated by any composition of $L$ residual-free blocks of the same width. For ungated ReLU and GELU, the situation is richer. For generic weight matrices, absorption holds at the single-block level if and only if there exists an index set $S$ of size at least $d$ such that $W_{\mathrm{down}}[:,S]\,W_{\mathrm{up}}[S,:] = -I_d$. This condition is non-generic (it fails with probability one under continuous weight distributions), so skip-connected and residual-free MLPs of the same width represent generically disjoint function classes. Whether this disjointness persists for deep compositions of ReLU or GELU blocks remains open.

Authors: Antonij Mijoski, Marko Karbevski
Categories: cs.LG, cs.LG
