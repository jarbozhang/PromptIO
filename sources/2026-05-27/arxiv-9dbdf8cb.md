---
title: >-
  Goal-driven Bayesian Optimal Experimental Design for Robust Decision-Making
  Under Model Uncertainty
url: 'https://arxiv.org/abs/2605.26093v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jinwoo Go
  - Xiaoning Qian
  - Byung-Jun Yoon
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-05-25T17:53:18Z'
fetched_at: '2026-05-27T01:19:09.166Z'
---
Bayesian optimal experimental design (BOED) selects experiments to maximize information gain about model parameters. However, in decision-critical settings, reducing parameter uncertainty does not necessarily improve downstream decisions, as only specific parameter directions relevant to the objective truly matter. We propose GoBOED, a goal-driven BOED framework that directly optimizes experimental designs for a specified decision-making objective. GoBOED combines an amortized variational posterior surrogate with a differentiable convex decision layer, enabling gradient-based design optimization that is fully decision-focused. We theoretically show that GoBOED gradients are insensitive to parameter directions irrelevant to the decision objective, providing a formal justification for why goal-driven design achieves equivalent decision quality over a wider set of experimental designs than information-gain maximization. Empirically, across source localization, epidemic management, and pharmacokinetic control, GoBOED identifies designs that better align with downstream decision objectives and reveals that near-optimal design windows are substantially wider than those predicted by goal-agnostic BOED approaches.

Authors: Jinwoo Go, Xiaoning Qian, Byung-Jun Yoon
Categories: cs.LG, stat.ML, cs.LG
