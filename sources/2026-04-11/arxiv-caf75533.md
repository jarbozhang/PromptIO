---
title: 'RewardFlow: Generate Images by Optimizing What You Reward'
url: 'https://arxiv.org/abs/2604.08536v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Onkar Susladkar
  - Dong-Hwan Jang
  - Tushar Prakash
  - Adheesh Juvekar
  - Vedant Shah
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-09T17:59:19Z'
fetched_at: '2026-04-11T01:43:18.431Z'
---
We introduce RewardFlow, an inversion-free framework that steers pretrained diffusion and flow-matching models at inference time through multi-reward Langevin dynamics. RewardFlow unifies complementary differentiable rewards for semantic alignment, perceptual fidelity, localized grounding, object consistency, and human preference, and further introduces a differentiable VQA-based reward that provides fine-grained semantic supervision through language-vision reasoning. To coordinate these heterogeneous objectives, we design a prompt-aware adaptive policy that extracts semantic primitives from the instruction, infers edit intent, and dynamically modulates reward weights and step sizes throughout sampling. Across several image editing and compositional generation benchmarks, RewardFlow delivers state-of-the-art edit fidelity and compositional alignment.

Authors: Onkar Susladkar, Dong-Hwan Jang, Tushar Prakash, Adheesh Juvekar, Vedant Shah
Categories: cs.CV, cs.AI, cs.CV
