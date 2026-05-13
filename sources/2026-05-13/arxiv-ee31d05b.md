---
title: >-
  LongMemEval-V2: Evaluating Long-Term Agent Memory Toward Experienced
  Colleagues
url: 'https://arxiv.org/abs/2605.12493v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Di Wu
  - Zixiang Ji
  - Asmi Kawatkar
  - Bryan Kwan
  - Jia-Chen Gu
categories:
  - cs.CL
  - cs.CL
published: '2026-05-12T17:59:34Z'
fetched_at: '2026-05-13T10:19:24.401Z'
---
Long-term memory is crucial for agents in specialized web environments, where success depends on recalling interface affordances, state dynamics, workflows, and recurring failure modes. However, existing memory benchmarks for agents mostly focus on user histories, short traces, or downstream task success, leaving open how to directly evaluate whether memory systems effectively internalize environment-specific experience. To address this gap, we introduce LongMemEval-V2 (LME-V2), a benchmark for evaluating whether memory systems can help agents acquire the experience needed to become knowledgeable colleagues in customized environments. LME-V2 contains 451 manually curated questions covering five core memory abilities for web agents: static state recall, dynamic state tracking, workflow knowledge, environment gotchas, and premise awareness. Questions are paired with history trajectories containing up to 500 trajectories and 115M tokens. We use a context gathering formulation: memory systems consume history trajectories and return compact evidence for downstream question answering. We propose a suite of two memory methods: AgentRunbook-R, an efficient RAG-based memory with knowledge pools for raw state observations, events, and strategy notes, and AgentRunbook-C, which stores trajectories as files and invokes a coding agent to gather evidence in an augmented sandbox. Experiments show that AgentRunbook-C achieves the best performance with 72.5% average accuracy, outperforming the

Authors: Di Wu, Zixiang Ji, Asmi Kawatkar, Bryan Kwan, Jia-Chen Gu
Categories: cs.CL, cs.CL
