---
title: Stepwise Credit Assignment for GRPO on Flow-Matching Models
url: 'https://arxiv.org/abs/2603.28718v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yash Savani
  - Branislav Kveton
  - Yuchen Liu
  - Yilin Wang
  - Jing Shi
categories:
  - cs.LG
  - cs.AI
  - cs.CV
  - cs.LG
published: '2026-03-30T17:35:14Z'
fetched_at: '2026-03-31T16:54:12.140Z'
---
Flow-GRPO successfully applies reinforcement learning to flow models, but uses uniform credit assignment across all steps. This ignores the temporal structure of diffusion generation: early steps determine composition and content (low-frequency structure), while late steps resolve details and textures (high-frequency details). Moreover, assigning uniform credit based solely on the final image can inadvertently reward suboptimal intermediate steps, especially when errors are corrected later in the diffusion trajectory. We propose Stepwise-Flow-GRPO, which assigns credit based on each step's reward improvement. By leveraging Tweedie's formula to obtain intermediate reward estimates and introducing gain-based advantages, our method achieves superior sample efficiency and faster convergence. We also introduce a DDIM-inspired SDE that improves reward quality while preserving stochasticity for policy gradients.

Authors: Yash Savani, Branislav Kveton, Yuchen Liu, Yilin Wang, Jing Shi
Categories: cs.LG, cs.AI, cs.CV, cs.LG
