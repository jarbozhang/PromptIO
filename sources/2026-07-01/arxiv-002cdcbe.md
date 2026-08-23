---
title: Self-Evolving World Models for LLM Agent Planning
url: 'https://arxiv.org/abs/2606.30639v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xuan Zhang
  - Wenxuan Zhang
  - See-Kiong Ng
  - Yang Deng
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-06-29T17:58:43Z'
fetched_at: '2026-06-30T23:02:51.931Z'
---
World models offer a principled way to equip long-horizon LLM agents with foresight: predictions of action consequences before execution. However, unreliable foresight can be ignored, misused, or even degrade downstream decision-making. In this paper, we introduce WorldEvolver, a self-evolving world model framework that revises its deployment-time context while keeping the downstream agent and all model parameters frozen. WorldEvolver integrates three modules: (i) Episodic Memory, which exploits real action transitions through retrieval-based simulation; (ii) Semantic Memory, which extracts persistent heuristic rules from prediction-observation mismatches; and (iii) Selective Foresight, which filters low-confidence predictions before integrating them into agent reasoning context. We evaluate WorldEvolver on ALFWorld and ScienceWorld, measuring world model prediction accuracy on Word2World and downstream agent success rate on AgentBoard. Extensive experiments show that WorldEvolver achieves the highest prediction accuracy across three backbones and leads other world model baselines on downstream agent success rate, demonstrating that test-time memory revision enhances both predictive fidelity and planning performance.

Authors: Xuan Zhang, Wenxuan Zhang, See-Kiong Ng, Yang Deng
Categories: cs.AI, cs.CL, cs.AI
