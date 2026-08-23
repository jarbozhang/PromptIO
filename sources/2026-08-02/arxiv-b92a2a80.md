---
title: >-
  Change2Task: From Repository Changes to Executable Coding Agent Tasks and
  Environments
url: 'https://arxiv.org/abs/2607.28591v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Haomin Qi
  - Xingliang Wang
  - Xuanqi Gao
  - Baihui Sang
  - Xin Zhang
categories:
  - cs.SE
  - cs.CL
  - cs.LG
  - cs.SE
published: '2026-07-30T17:44:31Z'
fetched_at: '2026-08-02T11:02:15.231Z'
---
Scaling coding agents requires a continuing supply of executable data for training, benchmarking, and continuous evaluation. Each task must couple a realistic software state with a specification, development tools, and reliable verification. To expand this supply, we present Change2Task, a system grounded in repository history that converts merged pull requests into verified tasks on healthy modern revisions of the same repository. It aligns historical evidence with evolved code, reconstructs task states through Patch Reversal, Code Mapping, or Agent Reconstruction, and validates the lifecycle from a healthy base to a task state and a restored state. By deriving multiple tasks grounded in developer evidence from maintained environments, Change2Task provides executable data for coding agent training and evaluation while reducing repeated environment setup, storage, and task construction effort. We evaluate the system through five common and widely adopted coding agent task families: Bug Fix, Feature Addition, Test Generation, Application Programming Interface Migration, and Security Repair. Starting from 1,130 source changes eligible for construction, Change2Task achieves 79.6% verified task construction success across these task families. On a matched candidate set, it recovers 29.2% more verified tasks than a construction baseline based on pull requests. Historical and reconstructed cases achieve up to 98.0% matched outcome agreement under agent evaluation, while reuse of mo

Authors: Haomin Qi, Xingliang Wang, Xuanqi Gao, Baihui Sang, Xin Zhang
Categories: cs.SE, cs.CL, cs.LG, cs.SE
