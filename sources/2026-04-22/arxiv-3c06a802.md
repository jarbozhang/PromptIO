---
title: >-
  UniT: Toward a Unified Physical Language for Human-to-Humanoid Policy Learning
  and World Modeling
url: 'https://arxiv.org/abs/2604.19734v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Boyu Chen
  - Yi Chen
  - Lu Qiu
  - Jerry Bai
  - Yuying Ge
categories:
  - cs.RO
  - cs.AI
  - cs.RO
published: '2026-04-21T17:57:27Z'
fetched_at: '2026-04-22T08:06:49.534Z'
---
Scaling humanoid foundation models is bottlenecked by the scarcity of robotic data. While massive egocentric human data offers a scalable alternative, bridging the cross-embodiment chasm remains a fundamental challenge due to kinematic mismatches. We introduce UniT (Unified Latent Action Tokenizer via Visual Anchoring), a framework that establishes a unified physical language for human-to-humanoid transfer. Grounded in the philosophy that heterogeneous kinematics share universal visual consequences, UniT employs a tri-branch cross-reconstruction mechanism: actions predict vision to anchor kinematics to physical outcomes, while vision reconstructs actions to filter out irrelevant visual confounders. Concurrently, a fusion branch synergies these purified modalities into a shared discrete latent space of embodiment-agnostic physical intents. We validate UniT across two paradigms: 1) Policy Learning (VLA-UniT): By predicting these unified tokens, it effectively leverages diverse human data to achieve state-of-the-art data efficiency and robust out-of-distribution (OOD) generalization on both humanoid simulation benchmark and real-world deployments, notably demonstrating zero-shot task transfer. 2) World Modeling (WM-UniT): By aligning cross-embodiment dynamics via unified tokens as conditions, it realizes direct human-to-humanoid action transfer. This alignment ensures that human data seamlessly translates into enhanced action controllability for humanoid video generation. Ultima

Authors: Boyu Chen, Yi Chen, Lu Qiu, Jerry Bai, Yuying Ge
Categories: cs.RO, cs.AI, cs.RO
