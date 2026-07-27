---
title: >-
  Skill Self-Play: Pushing the Frontier of LLM Capability with Co-Evolving
  Skills
url: 'https://arxiv.org/abs/2607.22529v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Siyuan Huang
  - Pengyu Cheng
  - Haotian Liu
  - Tao Chen
  - Yihao Liu
categories:
  - cs.CL
  - cs.CL
published: '2026-07-24T17:59:22Z'
fetched_at: '2026-07-27T11:02:38.250Z'
---
LLM training is shifting from manual design and annotation to interaction-driven self-evolution. However, existing self-evolutionary methods face a fundamental dilemma between task diversity and verification reliability: environment-bound methods obtain precise feedback but confine learning to narrow domains, while open-ended self-generation broadens the task space but lacks reliable verification, allowing misleading rewards to pollute the training loop. We identify agent skills as a powerful middle ground to reconcile this tension: each skill ensures deep, verifiable execution in a specific scenario, while dynamic routing across skills maintains open-ended task variety. Leveraging this insight, we introduce Skill Self-Play (Skill-SP), a co-evolutionary framework comprising a proposer, a solver, and a dynamic skill controller. Orchestrated via a reinforcement learning loop, these components co-evolve in a continuous self-play loop: the proposer generates challenging tasks conditioned on dynamically sampled skills; the solver explores candidate solutions to push its capability boundaries; and the skill controller collects execution feedback to update and expand the skill library. This interactive co-evolution effectively bridges the gap between structured verification and open-ended exploration. Empirical evaluations on tool-use and reasoning benchmarks demonstrate that Skill-SP, serving as a robust evolution engine, consistently pushes the performance ceiling of competent bac

Authors: Siyuan Huang, Pengyu Cheng, Haotian Liu, Tao Chen, Yihao Liu
Categories: cs.CL, cs.CL
