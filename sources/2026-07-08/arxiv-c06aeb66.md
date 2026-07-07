---
title: >-
  Cortex: A Bidirectionally Aligned Embodied Agent Framework for Long-horizon
  Manipulation
url: 'https://arxiv.org/abs/2607.05377v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jiaqi Peng
  - Xiqian Yu
  - Delin Feng
  - Yuqiang Yang
  - Wenzhe Cai
categories:
  - cs.RO
  - cs.AI
  - cs.CV
  - cs.RO
published: '2026-07-06T17:55:05Z'
fetched_at: '2026-07-07T23:02:35.309Z'
---
While recent Vision-Language-Action (VLA) models show promise toward generalist manipulation policies, they struggle with long-horizon tasks due to their Markovian nature-relying solely on current observations. Hierarchical dual-system methods address this but suffer from a gap between high-level planning semantics and low-level execution kinematics. We introduce Cortex, a bidirectionally aligned embodied agent framework with a customized planning interface that conveys executable and tractable subtask plans from high-level VLM to low-level VLA. Specifically, we standardize manipulation subtasks into 32 canonical skill primitives and inject tractability principles, such as representative object attributes and improved trajectory reachability, into the data generation pipeline. This enables automatic annotation of over 4k hours of open-source video data and generation of 30 hours of simulation data. We further devise an event-balanced sampling strategy to construct training data for fine-tuning the framework to better handle planning ambiguity during subtask transitions, enhanced by carefully designed harness engineering from task contexts to skill constraints during inference. Both open-loop VLM and closed-loop system evaluations demonstrate Cortex's efficacy, e.g., it outperforms monolithic baselines by 3.1% on Libero-long and 4.1% on RoboTwin. Notably, Cortex's generalist VLM enables zero-shot completion of unseen real-world long-horizon tasks, such as multi-stage chemistry

Authors: Jiaqi Peng, Xiqian Yu, Delin Feng, Yuqiang Yang, Wenzhe Cai
Categories: cs.RO, cs.AI, cs.CV, cs.RO
