---
title: >-
  Discovering a Shared Logical Subspace: Steering LLM Logical Reasoning via
  Alignment of Natural-Language and Symbolic Views
url: 'https://arxiv.org/abs/2604.19716v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Feihao Fang
  - My T. Thai
  - Yuanyuan Lei
categories:
  - cs.CL
  - cs.CL
published: '2026-04-21T17:42:54Z'
fetched_at: '2026-04-22T08:06:49.537Z'
---
Large Language Models (LLMs) still struggle with multi-step logical reasoning. Existing approaches either purely refine the reasoning chain in natural language form or attach a symbolic solver as an external module. In this work, we instead ask whether LLMs contain a shared internal logical subspace that simultaneously aligns natural-language and symbolic-language views of the reasoning process. Our hypothesis is that this logical subspace captures logical reasoning capabilities in LLMs that are shared across views while remaining independent of surface forms. To verify this, we employ Canonical Correlation Analysis on the paired residual activations from natural-language and symbolic-language reasoning chains, learning a low-dimensional subspace with maximum cross-view correlation. Furthermore, we design a training-free approach that steers LLMs reasoning chain along this logical subspace, thereby leveraging the complementary reasoning signals from both views. Experiments on four logical reasoning benchmarks demonstrate the effectiveness of our approach, improving accuracy by up to 11 percentage points and generalizing well on out-of-domain problems.

Authors: Feihao Fang, My T. Thai, Yuanyuan Lei
Categories: cs.CL, cs.CL
