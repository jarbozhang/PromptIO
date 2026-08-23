---
title: >-
  HPRO: Hierarchical Progressive Reward Optimization via Preference Extraction
  for Emotional Text-to-Speech
url: 'https://arxiv.org/abs/2606.28249v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sihang Nie
  - Xiaofen Xing
  - Rui Xing
  - Haoming Li
  - Ruitong Xiao
categories:
  - eess.AS
  - cs.CL
  - cs.SD
  - eess.AS
published: '2026-06-26T16:35:48Z'
fetched_at: '2026-06-29T23:02:47.157Z'
---
Recently, Large Language Model (LLM)-based Text-to-Speech (TTS) models have achieved remarkable naturalness. However, the standard Supervised Fine-Tuning paradigm often converges to statistically averaged prosody, limiting emotional expressiveness. While preference-driven optimization offers a promising alternative, existing approaches suffer from two structural mismatches: information conflict, where content and emotion in a shared latent space produce conflicting gradients, leading to reward hacking and semantic degradation; and scale gap, where sparse sentence-level rewards struggle to guide dense frame-level generation. To overcome these challenges, we propose HPRO, a hierarchical progressive reward optimization framework. Within HPRO, we introduce the HD-Emo codec as a novel differentiable reward model to resolve the information conflict. It extracts speech into distinct content and style preference tokens, structurally isolating emotional optimization from semantic content. Building upon this structured preference space, HPRO bridges the scale gap by progressively aligning frame-, word- and sentence-level objectives. Experiments demonstrate that HPRO significantly enhances emotional expressiveness, while effectively preserving linguistic intelligibility. The code and audio samples are publicly available at https://xxh333.github.io/hpro-demo/.

Authors: Sihang Nie, Xiaofen Xing, Rui Xing, Haoming Li, Ruitong Xiao
Categories: eess.AS, cs.CL, cs.SD, eess.AS
