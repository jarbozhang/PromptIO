---
title: >-
  Pelican-Unified 1.0: A Unified Embodied Intelligence Model for Understanding,
  Reasoning, Imagination and Action
url: 'https://arxiv.org/abs/2605.15153v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yi Zhang
  - Yinda Chen
  - Che Liu
  - Zeyuan Ding
  - Jin Xu
categories:
  - cs.RO
  - cs.AI
  - cs.RO
published: '2026-05-14T17:50:42Z'
fetched_at: '2026-05-18T00:51:02.182Z'
---
We present Pelican-Unified 1.0, the first embodied foundation model trained according to the principle of unification. Pelican-Unified 1.0 uses a single VLM as a unified understanding module, mapping scenes, instructions, visual contexts, and action histories into a shared semantic space. The same VLM also serves as a unified reasoning module, autoregressively producing task-, action-, and future-oriented chains of thought in a single forward pass and projecting the final hidden state into a dense latent variable. A Unified Future Generator (UFG) then conditions on this latent variable and jointly generates future videos and future actions through two modality-specific output heads within the same denoising process. The language, video, and action losses are all backpropagated into the shared representation, enabling the model to jointly optimize understanding, reasoning, imagination, and action during training, rather than training three isolated expert systems. Experiments demonstrate that unification does not imply compromise. With a single checkpoint, Pelican-Unified 1.0 achieves strong performance across all three capabilities: 64.7 on eight VLM benchmarks, the best among comparable-scale models; 66.03 on WorldArena, ranking first; and 93.5 on RoboTwin, the second-best average among compared action methods. These results show that the unified paradigm succeeds in preserving specialist strength while bringing understanding, reasoning, imagination, and action into one mode

Authors: Yi Zhang, Yinda Chen, Che Liu, Zeyuan Ding, Jin Xu
Categories: cs.RO, cs.AI, cs.RO
