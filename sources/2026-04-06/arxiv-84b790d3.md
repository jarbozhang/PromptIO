---
title: 'Batched Contextual Reinforcement: A Task-Scaling Law for Efficient Reasoning'
url: 'https://arxiv.org/abs/2604.02322v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Bangji Yang
  - Hongbo Ma
  - Jiajun Fan
  - Ge Liu
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.LG
published: '2026-04-02T17:58:50Z'
fetched_at: '2026-04-06T00:50:51.195Z'
---
Large Language Models employing Chain-of-Thought reasoning achieve strong performance but suffer from excessive token consumption that inflates inference costs. Existing efficiency methods such as explicit length penalties, difficulty estimators, or multi-stage curricula either degrade reasoning quality or require complex training pipelines. We introduce Batched Contextual Reinforcement, a minimalist, single-stage training paradigm that unlocks efficient reasoning through a simple structural modification: training the model to solve N problems simultaneously within a shared context window, rewarded purely by per-instance accuracy. This formulation creates an implicit token budget that yields several key findings: (1) We identify a novel task-scaling law: as the number of concurrent problems N increases during inference, per-problem token usage decreases monotonically while accuracy degrades far more gracefully than baselines, establishing N as a controllable throughput dimension. (2) BCR challenges the traditional accuracy-efficiency trade-off by demonstrating a "free lunch" phenomenon at standard single-problem inference. Across both 1.5B and 4B model families, BCR reduces token usage by 15.8% to 62.6% while consistently maintaining or improving accuracy across five major mathematical benchmarks. (3) Qualitative analyses reveal emergent self-regulated efficiency, where models autonomously eliminate redundant metacognitive loops without explicit length supervision. (4) Crucia

Authors: Bangji Yang, Hongbo Ma, Jiajun Fan, Ge Liu
Categories: cs.LG, cs.AI, cs.CL, cs.LG
