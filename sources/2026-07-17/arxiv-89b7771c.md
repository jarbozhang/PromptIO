---
title: >-
  Transforming Rank: How Architecture Navigates the Spectral Pathologies of
  Depth
url: 'https://arxiv.org/abs/2607.14018v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Katie Everett
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-15T16:50:43Z'
fetched_at: '2026-07-16T23:02:09.824Z'
---
We investigate how each component of the Transformer feedforward block architecture design determines how much rank survives across depth at initialization. We reinterpret skip connections and normalization, long understood as controlling magnitude, as mechanisms for preserving gradient rank across depth, since the very matrix multiplications and nonlinear activations that make the network expressive also reduce the rank. We show that skip connections trade off rank collapse against ensemble-like behavior, controlled by the relative scales of the branch and the skip: skip connections route the gradient around the residual branch, where rank is lost, rather than along the long gradient paths that encourage the layers to compose. The placement of the normalization layer controls this same tradeoff by setting the branch-to-skip ratio across depth, unifying much of the normalization placement and depth scaling literature, in particular why rank collapses for Post-Norm but plateaus for Pre-Norm. Other aspects of the architecture, like the two-matrix structure that expands and contracts the width, use additional parameters to preserve the representation or branch Jacobian rank. The second matrix decorrelates a coherent mean spike that would grow across blocks with a single matrix and uncentered activation, preventing the residual representation from collapsing. The width expansion between the two matrices keeps the branch Jacobian full rank: applying the rank-reducing activation in

Authors: Katie Everett
Categories: cs.LG, cs.AI, cs.LG
