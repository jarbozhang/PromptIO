---
title: >-
  ESIA: An Energy-Based Spatiotemporal Interaction-Aware Framework for
  Pedestrian Intention Prediction
url: 'https://arxiv.org/abs/2604.23728v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yanping Wu
  - Meiting Dang
  - Lin Wu
  - Edmond S. L. Ho
  - Zhenghua Chen
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-26T14:13:58Z'
fetched_at: '2026-04-28T02:04:33.985Z'
---
Recent advances in autonomous driving have motivated research on pedestrian intention prediction, which aims to infer future crossing decisions and actions by modeling temporal dynamics, social interactions, and environmental context. However, existing studies remain constrained by oversimplified multi-agent interaction patterns, opaque reasoning logic, and a lack of global consistency in behavioral predictions, which compromise both robustness and interpretability. In this work, we propose ESIA (Energy-based Spatiotemporal Interaction-Aware framework), a novel Conditional Random Field (CRF)-based paradigm. We cast the intention prediction task as a structured prediction problem over a unified graph-based representation, treating pedestrians and the environment as spatiotemporal nodes. To characterize their distinct roles, we assign unary potentials to nodes to capture individual intentions, and pairwise potentials to edges to encode social and environmental interactions. These potentials are integrated into a unified global energy function to ensure scene-level consistency across behavioral predictions. To further constrain inference without ground-truth supervision, we introduce structural consistency terms to penalize logical contradictions. This optimization is efficiently solved via a novel Unary-Seeded Simulated Annealing (U-SSA) algorithm, which leverages high-confidence unary priors to rapidly converge to a high-quality solution. Extensive experiments on standard benc

Authors: Yanping Wu, Meiting Dang, Lin Wu, Edmond S. L. Ho, Zhenghua Chen
Categories: cs.CV, cs.AI, cs.CV
