---
title: >-
  Reward Structure Shapes the Interaction Between Episodic Exploration and
  Neural Memory in Reinforcement Learning
url: 'https://arxiv.org/abs/2608.05111v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jai Malegaonkar
  - Rohan Patil
  - Henrik I. Christensen
categories:
  - cs.LG
  - cs.LG
published: '2026-08-05T17:44:52Z'
fetched_at: '2026-08-06T11:02:48.673Z'
---
In partially observable reinforcement learning, agents face a dual bottleneck: they must explore to encounter rewarding states and retain that experience in memory to optimize their policies. Exploration bonuses and memory architectures are traditionally evaluated in isolation, leaving their interaction unmeasured, and standard notions of sparse reward conflate temporal signal density with what the reward actually supervises. We present a controlled study crossing episodic exploration bonuses with diverse neural memory architectures across three environments that vary how the content of memory is acquired. An identical bonus signal yields three distinct interaction patterns: it amplifies architectural capacity differences where memory content must be actively discovered and retained unsupervised; equalizes architectures to a shared ceiling where the content, once sought out, is a single reward-supervised cue; and is null where the observation stream is purely scheduled. Controlled reward manipulations verify that these patterns track reward structure rather than density: a dense reward neutralizes a bonus only if it directly supervises the required latent memory, and a small avoidable penalty on exploratory actions (leaving the optimum unchanged) induces policy convergence to suboptimal stationary states, which either bonus resolves. We then formalize reward sparsity with observation-anchored reward machines, separating structural sparsity (an automaton reproduces the return 

Authors: Jai Malegaonkar, Rohan Patil, Henrik I. Christensen
Categories: cs.LG, cs.LG
