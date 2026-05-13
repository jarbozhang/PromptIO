---
title: >-
  OmniNFT: Modality-wise Omni Diffusion Reinforcement for Joint Audio-Video
  Generation
url: 'https://arxiv.org/abs/2605.12480v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guohui Zhang
  - XiaoXiao Ma
  - Jie Huang
  - Hang Xu
  - Hu Yu
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-12T17:56:59Z'
fetched_at: '2026-05-13T10:19:24.403Z'
---
Recent advances in joint audio-video generation have been remarkable, yet real-world applications demand strong per-modality fidelity, cross-modal alignment, and fine-grained synchronization. Reinforcement Learning (RL) offers a promising paradigm, but its extension to multi-objective and multi-modal joint audio-video generation remains unexplored. Notably, our in-depth analysis first reveals that the primary obstacles to applying RL in this stem from: (i) multi-objective advantages inconsistency, where the advantages of multimodal outputs are not always consistent within a group; (ii) multi-modal gradients imbalance, where video-branch gradients leak into shallow audio layers responsible for intra-modal generation; (iii) uniform credit assignment, where fine-grained cross-modal alignment regions fail to get efficient exploration. These shortcomings suggest that vanilla RL fine-tuning strategy with a single global advantage often leads to suboptimal results. To address these challenges, we propose OmniNFT, a novel modality-aware online diffusion RL framework with three key innovations: (1) Modality-wise advantage routing, which routes independent per-reward advantages to their respective modality generation branches. (2) Layer-wise gradient surgery, which selectively detaches video-branch gradients on shallow audio layers while retaining those for cross-modal interaction layers. (3) Region-wise loss reweighting, which modulates policy optimization toward critical regions rela

Authors: Guohui Zhang, XiaoXiao Ma, Jie Huang, Hang Xu, Hu Yu
Categories: cs.CV, cs.AI, cs.CV
