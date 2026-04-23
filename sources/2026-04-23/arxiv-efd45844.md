---
title: >-
  GRPO-VPS: Enhancing Group Relative Policy Optimization with Verifiable Process
  Supervision for Effective Reasoning
url: 'https://arxiv.org/abs/2604.20659v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jingyi Wang
  - Lei Zhu
  - Tengjin Weng
  - Song-Li Wu
  - Haochen Tan
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-22T15:08:58Z'
fetched_at: '2026-04-23T02:22:06.472Z'
---
Reinforcement Learning with Verifiable Rewards (RLVR) has advanced the reasoning capabilities of Large Language Models (LLMs) by leveraging direct outcome verification instead of learned reward models. Building on this paradigm, Group Relative Policy Optimization (GRPO) eliminates the need for critic models but suffers from indiscriminate credit assignment for intermediate steps, which limits its ability to identify effective reasoning strategies and incurs overthinking. In this work, we introduce a model-free and verifiable process supervision via probing the model's belief in the correct answer throughout its reasoning trajectory. By segmenting the generation into discrete steps and tracking the conditional probability of the correct answer appended at each segment boundary, we efficiently compute interpretable segment-wise progress measurements to refine GRPO's trajectory-level feedback. This approach enables more targeted and sample-efficient policy updates, while avoiding the need for intermediate supervision derived from costly Monte Carlo rollouts or auxiliary models. Experiments on mathematical and general-domain benchmarks show consistent gains over GRPO across diverse models: up to 2.6-point accuracy improvements and 13.7% reasoning-length reductions on math tasks, and up to 2.4 points and 4% on general-domain tasks, demonstrating strong generalization.

Authors: Jingyi Wang, Lei Zhu, Tengjin Weng, Song-Li Wu, Haochen Tan
Categories: cs.LG, cs.AI, cs.LG
