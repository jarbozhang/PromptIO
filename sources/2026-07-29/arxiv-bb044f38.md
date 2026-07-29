---
title: >-
  Desktop-Delta Bench: Do Computer-Use Models Understand Desktop GUI
  Transitions?
url: 'https://arxiv.org/abs/2607.26041v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Abhishek Pillai
  - Samir Kumar Nayak
  - Yuan Chen
categories:
  - cs.AI
  - cs.CV
  - cs.AI
published: '2026-07-28T17:49:51Z'
fetched_at: '2026-07-29T11:02:31.056Z'
---
Computer-use agents (CUAs) increasingly act through desktop GUIs to complete long-horizon tasks. Current benchmarks primarily measure end-task success or single-frame grounding. Neither isolates whether a model can reconstruct the causal, task-relevant transition produced by an action- crucial for rejecting stale observations, verifying progress, and recovering from failure. This is difficult because inference, remote input, app rendering, and screenshot capture are asynchronous: the next observation may be delayed, occluded, transient, or unrelated, then misread as progress and carried into subsequent planning. We introduce Desktop-Delta Bench (DDB), an offline step-level benchmark with 2,013 human-verified instances from novel, multi-app Linux trajectories across ~15 applications and 50 task domains. DDB trajectories targets 3 failure dimensions- state verification, source tracking, and context-aware control- through 2 complementary tasks: 463 3-frame temporal-ordering instances, including 105 with a cross-trajectory decoy, and 1,550 before-after pairs labeled from 5 actions + its payload. We evaluate 8 closed and open-source model families across 32 ordering and 16 single-action settings, observing consistent gaps. Ordering remains unsaturated: best non-decoy and decoy exact-match rates are 65.1% and 65.7%. Task context improves decoy identification by 6.9 percentage points but reduces non-decoy exact match by 2.2 points; error analysis reveals systematic copying of the pr

Authors: Abhishek Pillai, Samir Kumar Nayak, Yuan Chen
Categories: cs.AI, cs.CV, cs.AI
