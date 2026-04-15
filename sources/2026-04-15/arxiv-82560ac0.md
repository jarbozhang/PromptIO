---
title: Interpretable Relational Inference with LLM-Guided Symbolic Dynamics Modeling
url: 'https://arxiv.org/abs/2604.12806v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaoxiao Liang
  - Juyuan Zhang
  - Liming Pan
  - Linyuan Lü
categories:
  - cs.LG
  - cs.LG
published: '2026-04-14T14:36:07Z'
fetched_at: '2026-04-15T02:22:53.569Z'
---
Inferring latent interaction structures from observed dynamics is a fundamental inverse problem in many-body interacting systems. Most neural approaches rely on black-box surrogates over trainable graphs, achieving accuracy at the expense of mechanistic interpretability. Symbolic regression offers explicit dynamical equations and stronger inductive biases, but typically assumes known topology and a fixed function library. We propose \textbf{COSINE} (\textbf{C}o-\textbf{O}ptimization of \textbf{S}ymbolic \textbf{I}nteractions and \textbf{N}etwork \textbf{E}dges), a differentiable framework that jointly discovers interaction graphs and sparse symbolic dynamics. To overcome the limitations of fixed symbolic libraries, COSINE further incorporates an outer-loop large language model that adaptively prunes and expands the hypothesis space using feedback from the inner optimization loop. Experiments on synthetic systems and large-scale real-world epidemic data demonstrate robust structural recovery and compact, mechanism-aligned dynamical expressions. Code: https://anonymous.4open.science/r/COSINE-6D43.

Authors: Xiaoxiao Liang, Juyuan Zhang, Liming Pan, Linyuan Lü
Categories: cs.LG, cs.LG
