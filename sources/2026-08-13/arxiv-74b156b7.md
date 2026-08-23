---
title: Redistribution-based Cost Inference Improves Sparse Safe Offline RL
url: 'https://arxiv.org/abs/2608.12306v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ebenezer Gelo
  - Geraud Nangue Tasse
  - Steven James
  - Benjamin Rosman
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-08-12T17:53:15Z'
fetched_at: '2026-08-13T11:03:17.819Z'
---
Safe offline RL typically assumes access to dense per-step cost annotations, but in practice supervisors provide only trajectory-level stop-feedback: a binary signal at the first unsafe transition, with no per-step attribution. We frame this as a temporal credit assignment problem and propose the Redistribution-based Cost Inference (RCI) framework, which converts sparse stop-feedback into dense per-step costs via return decomposition, then trains a constrained offline policy on the augmented dataset. We show that return-equivalent redistribution preserves the feasible policy set and the optimal Lagrangian in a CMDP, establishing that the transformation is lossless in theory while yielding better-conditioned cost critic learning in practice. Experiments on highway driving and robotic manipulation demonstrate substantially lower violation rates than sparse and classifier-based baselines, with robustness to heterogeneous dataset compositions and label noise.

Authors: Ebenezer Gelo, Geraud Nangue Tasse, Steven James, Benjamin Rosman
Categories: cs.LG, cs.AI, cs.LG
