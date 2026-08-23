---
title: >-
  CompactionRL: Reinforcement Learning with Context Compaction for Long-Horizon
  Agents
url: 'https://arxiv.org/abs/2607.05378v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yujiang Li
  - Zhenyu Hou
  - Yi Jing
  - Jie Tang
  - Yuxiao Dong
categories:
  - cs.LG
  - cs.LG
published: '2026-07-06T17:55:12Z'
fetched_at: '2026-07-07T23:02:35.308Z'
---
Long-horizon agentic LLMs are increasingly limited by finite context windows, as extended interaction trajectories can exceed the maximum context length before a task is completed. Context compaction offers a natural solution by summarizing previous interaction states and continuing the rollout under a compressed context, but incorporating compaction into reinforcement learning remains underexplored. We propose CompactionRL, a reinforcement learning strategy to train long-horizon agentic LLMs with context compaction. Our approach jointly optimizes task execution and summary generation with token-level loss normalization and cross-trajectory generalized advantage estimation. This design enables the LLM agents to learn from compacted long-horizon trajectories. We train CompactionRL on top of open models and observe consistent performance gains on agentic coding tasks. CompactionRL enables the open GLM-4.5-Air model (106B-A30B) to achieve Pass@1 scores of 66.8% on SWE-bench Verified and 24.5% on Terminal-Bench 2.0, with absolute gains of 7.0 and 3.1 points, respectively. Built upon GLM-4.7-Flash (30B-A3B), CompactionRL improves Pass@1 by 5.5 and 6.8 points, reaching 56.0% on SWE-bench Verified and 20.2% on Terminal-Bench 2.0, respectively. CompactionRL is thus deployed in the RL pipeline for training the open GLM-5.2 model (750B-A40B).

Authors: Yujiang Li, Zhenyu Hou, Yi Jing, Jie Tang, Yuxiao Dong
Categories: cs.LG, cs.LG
