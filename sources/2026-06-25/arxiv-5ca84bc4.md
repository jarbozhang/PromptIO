---
title: Learning Action Priors for Cross-embodiment Robot Manipulation
url: 'https://arxiv.org/abs/2606.26095v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Dong Jing
  - Tianqi Zhang
  - Jiaqi Liu
  - Jinman Zhao
  - Zelong Sun
categories:
  - cs.RO
  - cs.AI
  - cs.CV
  - cs.RO
published: '2026-06-24T17:59:56Z'
fetched_at: '2026-06-25T07:41:52.261Z'
---
Most Vision-Language-Action (VLA) models build on a Vision-Language Model (VLM) backbone by attaching an action module and optimizing the full policy jointly. This design inherits strong visual and linguistic priors from the VLM, but leaves the action module to learn physical motion almost from scratch. As a result, the policy lacks an explicit motion prior, forcing early optimization to simultaneously discover temporal action dynamics and cross-modal alignment, a challenge further amplified in cross-embodiment settings. In this work, we propose to pretrain the action module with motion priors before cross-modal VLA alignment. Specifically, we introduce a two-stage training framework that equips the action module with cross-embodiment temporal motion structure before VLA training begins. In Stage~1, a lightweight flow-matching-based encoder-decoder action module efficiently learns temporal motion structure solely from unconditioned action trajectories, without processing visual or language tokens. In Stage~2, this learned prior is transferred to VLA training through decoder reuse and early-stage latent distillation, aligning visual-language features with the action embedding space while still allowing end-to-end policy refinement. In addition, the trained encoder serves as a compact history compressor, summarizing state-action histories into a single temporal context token for history-aware modeling at negligible cost. Extensive experiments across 13 diverse cross-embodiment 

Authors: Dong Jing, Tianqi Zhang, Jiaqi Liu, Jinman Zhao, Zelong Sun
Categories: cs.RO, cs.AI, cs.CV, cs.RO
