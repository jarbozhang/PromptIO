---
title: >-
  Personalized RewardBench: Evaluating Reward Models with Human Aligned
  Personalization
url: 'https://arxiv.org/abs/2604.07343v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Qiyao Ma
  - Dechen Gao
  - Rui Cai
  - Boqi Zhao
  - Hanchu Zhou
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-04-08T17:55:00Z'
fetched_at: '2026-04-09T07:18:08.755Z'
---
Pluralistic alignment has emerged as a critical frontier in the development of Large Language Models (LLMs), with reward models (RMs) serving as a central mechanism for capturing diverse human values. While benchmarks for general response quality are prevalent, evaluating how well reward models account for individual user preferences remains an open challenge. To bridge this gap, we introduce Personalized RewardBench, a novel benchmark designed to rigorously assess reward models' capacity to model personalized preferences. We construct chosen and rejected response pairs based on strict adherence to (or violation of) user-specific rubrics, ensuring that preference distinctions are uniquely tailored to the individual. In particular, human evaluations confirm that the primary discriminative factor between pairs is strictly personal preference, with both responses maintaining high general quality (e.g., correctness, relevance and helpfulness). Extensive testing reveals that existing state-of-the-art reward models struggle significantly with personalization, peaking at an accuracy of just 75.94%. Crucially, because an effective reward model benchmark should predict a reward model's performance on downstream tasks, we conduct experiments demonstrating that our benchmark exhibits a significantly higher correlation with downstream performance in both Best-of-N (BoN) sampling and Proximal Policy Optimization (PPO) compared to existing baselines. These findings establish Personalized R

Authors: Qiyao Ma, Dechen Gao, Rui Cai, Boqi Zhao, Hanchu Zhou
Categories: cs.CL, cs.LG, cs.CL
