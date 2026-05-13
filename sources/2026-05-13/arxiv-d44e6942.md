---
title: >-
  Beyond GRPO and On-Policy Distillation: An Empirical Sparse-to-Dense Reward
  Principle for Language-Model Post-Training
url: 'https://arxiv.org/abs/2605.12483v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuanda Xu
  - Hejian Sang
  - Zhengze Zhou
  - Ran He
  - Zhipeng Wang
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-12T17:57:48Z'
fetched_at: '2026-05-13T10:19:24.402Z'
---
In settings where labeled verifiable training data is the binding constraint, each checked example should be allocated carefully. The standard practice is to use this data directly on the model that will be deployed, for example by running GRPO on the deployment student. We argue that this is often an inefficient allocation because it overlooks a reward-density principle: sparse sequence-level reward should train models where exploration is productive, while dense token-level teacher reward should be used where the aim is to compress behavior into a smaller model. In this view, GRPO-style sparse RL and OPD-style dense teacher supervision are not separate recipes; they are different reward-density regimes. The allocation rule is simple: use scarce labeled training data upstream on the strongest model that can turn it into reward-shaped behavior, then transfer that behavior downstream as dense supervision. We evaluate this rule on verifiable math with Qwen3 and Llama models. At fixed Qwen3-1.7B deployment-student size, an RL-improved 8B teacher distilled through the dense bridge outperforms direct GRPO on the same student, while transfer from the same teacher before RL underperforms. The bridge is important: a forward-KL warmup on teacher rollouts followed by OPD on student rollouts is consistently strongest on MATH before any post-bridge student-side sparse RL, and also gives the best pre-Stage~3 AIME endpoints for the canonical 8B/14B teachers. The bridge also makes later stu

Authors: Yuanda Xu, Hejian Sang, Zhengze Zhou, Ran He, Zhipeng Wang
Categories: cs.LG, cs.AI, cs.LG
