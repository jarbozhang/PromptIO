---
title: >-
  Improving Cross-Problem Vehicle Routing with Locally Augmented Preferences and
  Representation Disentanglement
url: 'https://arxiv.org/abs/2608.24859v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arthur Corrêa
  - Paulo Nascimento
  - Samuel Moniz
categories:
  - cs.LG
  - cs.LG
published: '2026-08-25T17:44:23Z'
fetched_at: '2026-08-26T11:02:45.106Z'
---
Multi-task vehicle routing problem (VRP) solvers seek to handle multiple VRP variants within a single unified model, avoiding the need to train a separate model for every variant. In spite of recent progress, current approaches remain limited on two fronts. On the training side, reinforcement learning suffers from reward-scale disparities and shrinking advantage signals as policies improve, whereas preference optimization stagnates once sampled tours become near-identical and thus fundamentally limited by the quality of the policy's own generated solutions, leaving both paradigms with weak supervision as training progresses. On the architecture side, existing fully shared encoders entangle constraint-dependent representations across heterogeneous variants, which limits generalization. We address these gaps with two model-agnostic contributions. First, we propose Preference Optimization with Locally Augmented Refinement (POLAR), a novel training algorithm that applies a local search refinement pass to the best decoded tour before forming preference pairs, yielding much more informative pairwise margins. Second, a Progressive Layered Extraction (PLE) encoder routes each encoder layer through one shared expert and a set of task-specific experts via a gating mechanism, progressively separating common routing structure from constraint-specific encodings. Through extensive experiments on various VRP variants, we show that POLAR and PLE together elevate the current state-of-the-art 

Authors: Arthur Corrêa, Paulo Nascimento, Samuel Moniz
Categories: cs.LG, cs.LG
