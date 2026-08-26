---
title: Effective Learning Rate Governs Loss Dynamics in Language Model Pretraining
url: 'https://arxiv.org/abs/2608.24814v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zihan Liu
  - Ruiheng Zheng
  - Shaobo Zhang
  - Changxin Tian
  - Kunlong Chen
categories:
  - cs.LG
  - cs.LG
published: '2026-08-25T16:57:29Z'
fetched_at: '2026-08-26T11:02:45.134Z'
---
We uncover ELR collapse in language model pretraining: learning rate (LR) and parameter norm govern loss dynamics primarily through their ratio, the effective learning rate (ELR). When ELR is matched across runs, their loss trajectories collapse throughout training despite substantially different LRs and parameter norms. Across optimizers, architectures, datasets, and model scales, mean collapse errors are typically a few x 10^-3, below the seed-to-seed variation measured in a representative configuration. Systematic ablations identify normalization design and the timescale of LR-norm variation as key determinants of collapse precision. Controlled interventions further show that weight decay and Hyperball shape loss dynamics primarily through the ELR schedules they induce. Replacing LR with ELR enables a fitted functional scaling law (FSL) to transfer across norm-control methods. The resulting ELR-based FSL also explains delayed acceleration, a recurring effect of norm control. Together, these results establish ELR as a common coordinate linking LR scheduling, norm control, and loss dynamics.

Authors: Zihan Liu, Ruiheng Zheng, Shaobo Zhang, Changxin Tian, Kunlong Chen
Categories: cs.LG, cs.LG
