---
title: Detecting and Suppressing Reward Hacking with Gradient Fingerprints
url: 'https://arxiv.org/abs/2604.16242v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Songtao Wang
  - Quang Hieu Pham
  - Fangcong Yin
  - Xinpeng Wang
  - Jocelyn Qiaochu Chen
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-04-17T17:01:24Z'
fetched_at: '2026-04-20T05:39:43.394Z'
---
Reinforcement learning with verifiable rewards (RLVR) typically optimizes for outcome rewards without imposing constraints on intermediate reasoning. This leaves training susceptible to reward hacking, where models exploit loopholes (e.g., spurious patterns in training data) in the reward function to achieve high scores without solving the intended task. These reward-hacking behaviors are often implicit, as the intermediate chain-of-thought (CoT) may appear plausible on the surface, limiting the effectiveness of purely text-based monitoring. We propose Gradient Fingerprint (GRIFT), a method for detecting reward hacking using models' internal computations. Given a prompt and a model-generated CoT, GRIFT computes gradients of the CoT conditioned on the prompt and compresses them into a compact representation, which is then used to assess whether the CoT reflects reward hacking behavior. Across verifiable reasoning benchmarks spanning math, code, and logical reasoning, GRIFT substantially outperforms strong baselines, including CoT Monitor and TRACE, achieving over 25% relative improvement in detecting reward hacking behavior. Moreover, integrating GRIFT into the rejection fine-tuning pipeline for reasoning tasks reduces reward hacking and improves performance on the true task objective. Our results highlight a promising direction of leveraging gradient level representations for assessing the quality of CoT reasoning traces. Our code is available at: https://github.com/songtao-x

Authors: Songtao Wang, Quang Hieu Pham, Fangcong Yin, Xinpeng Wang, Jocelyn Qiaochu Chen
Categories: cs.LG, cs.CL, cs.LG
