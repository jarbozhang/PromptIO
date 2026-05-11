---
title: 'Flow-OPD: On-Policy Distillation for Flow Matching Models'
url: 'https://arxiv.org/abs/2605.08063v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhen Fang
  - Wenxuan Huang
  - Yu Zeng
  - Yiming Zhao
  - Shuang Chen
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-08T17:50:15Z'
fetched_at: '2026-05-11T08:20:12.071Z'
---
Existing Flow Matching (FM) text-to-image models suffer from two critical bottlenecks under multi-task alignment: the reward sparsity induced by scalar-valued rewards, and the gradient interference arising from jointly optimizing heterogeneous objectives, which together give rise to a 'seesaw effect' of competing metrics and pervasive reward hacking. Inspired by the success of On-Policy Distillation (OPD) in the large language model community, we propose Flow-OPD, the first unified post-training framework that integrates on-policy distillation into Flow Matching models. Flow-OPD adopts a two-stage alignment strategy: it first cultivates domain-specialized teacher models via single-reward GRPO fine-tuning, allowing each expert to reach its performance ceiling in isolation; it then establishes a robust initial policy through a Flow-based Cold-Start scheme and seamlessly consolidates heterogeneous expertise into a single student via a three-step orchestration of on-policy sampling, task-routing labeling, and dense trajectory-level supervision. We further introduce Manifold Anchor Regularization (MAR), which leverages a task-agnostic teacher to provide full-data supervision that anchors generation to a high-quality manifold, effectively mitigating the aesthetic degradation commonly observed in purely RL-driven alignment. Built upon Stable Diffusion 3.5 Medium, Flow-OPD raises the GenEval score from 63 to 92 and the OCR accuracy from 59 to 94, yielding an overall improvement of ro

Authors: Zhen Fang, Wenxuan Huang, Yu Zeng, Yiming Zhao, Shuang Chen
Categories: cs.CV, cs.AI, cs.CV
