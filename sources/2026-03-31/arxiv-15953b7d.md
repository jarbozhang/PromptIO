---
title: >-
  SOLE-R1: Video-Language Reasoning as the Sole Reward for On-Robot
  Reinforcement Learning
url: 'https://arxiv.org/abs/2603.28730v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Philip Schroeder
  - Thomas Weng
  - Karl Schmeckpeper
  - Eric Rosen
  - Stephen Hart
categories:
  - cs.RO
  - cs.CL
  - cs.CV
  - cs.RO
published: '2026-03-30T17:46:31Z'
fetched_at: '2026-03-31T04:42:13.118Z'
---
Vision-language models (VLMs) have shown impressive capabilities across diverse tasks, motivating efforts to leverage these models to supervise robot learning. However, when used as evaluators in reinforcement learning (RL), today's strongest models often fail under partial observability and distribution shift, enabling policies to exploit perceptual errors rather than solve the task. To address this limitation, we introduce SOLE-R1 (Self-Observing LEarner), a video-language reasoning model explicitly designed to serve as the sole reward signal for online RL. Given only raw video observations and a natural-language goal, SOLE-R1 performs per-timestep spatiotemporal chain-of-thought (CoT) reasoning and produces dense estimates of task progress that can be used directly as rewards. To train SOLE-R1, we develop a large-scale video trajectory and reasoning synthesis pipeline that generates temporally grounded CoT traces aligned with continuous progress supervision. This data is combined with foundational spatial and multi-frame temporal reasoning, and used to train the model with a hybrid framework that couples supervised fine-tuning with RL from verifiable rewards. Across four different simulation environments and a real-robot setting, SOLE-R1 enables zero-shot online RL from random initialization: robots learn previously unseen manipulation tasks without ground-truth rewards, success indicators, demonstrations, or task-specific tuning. SOLE-R1 succeeds on 24 unseen tasks and su

Authors: Philip Schroeder, Thomas Weng, Karl Schmeckpeper, Eric Rosen, Stephen Hart
Categories: cs.RO, cs.CL, cs.CV, cs.RO
