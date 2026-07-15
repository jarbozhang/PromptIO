---
title: >-
  TerraZero: Procedural Driving Simulation for Zero-Demonstration Self-Play at
  Scale
url: 'https://arxiv.org/abs/2607.13028v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhouchonghao Wu
  - Akshay Rangesh
  - Weixin Li
  - Wei-Jer Chang
  - Zachary Lee
categories:
  - cs.LG
  - cs.AI
  - cs.RO
  - cs.LG
published: '2026-07-14T17:59:02Z'
fetched_at: '2026-07-15T23:03:05.475Z'
---
Training robust autonomous driving agents requires a simulator that is fast enough for reinforcement learning at scale, realistic enough to ground behavior in real-world map structure, and diverse enough to cover the safety-critical long tail that logged data rarely contains. We present TerraZero, a procedural driving simulator and self-play training stack. A configurable C engine runs simulation on the CPU and policy inference on the GPU over a zero-copy path, sustaining 1.3M agent-steps per second on a single server-grade GPU, far faster than existing object-level simulators, while keeping fidelity lighter single-agent systems omit: heterogeneous agents, multiple dynamics models, and full traffic-rule enforcement. TerraZero treats logged data only as a source of real-world map geometry, populating each map with randomized rule-based road users and signal controllers and randomizing agent dynamics, rewards, and sizes per episode, so a map yields an unbounded set of scenarios. Every reported policy trains from scratch by reinforcement learning alone on a compute-efficient self-play recipe across GPUs, with zero human demonstrations and no fallback planner at inference. Policies generalize zero-shot across cities and datasets, including emergent left-hand-traffic driving without explicit supervision. As an ego policy, TerraZero is the first fully learned policy to top the InterPlan long-tail benchmark, ahead of larger learned planners; on routine-driving val14 it ranks among t

Authors: Zhouchonghao Wu, Akshay Rangesh, Weixin Li, Wei-Jer Chang, Zachary Lee
Categories: cs.LG, cs.AI, cs.RO, cs.LG
