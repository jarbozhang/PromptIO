---
title: 'LLMs Improving LLMs: Agentic Discovery for Test-Time Scaling'
url: 'https://arxiv.org/abs/2605.08083v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tong Zheng
  - Haolin Liu
  - Chengsong Huang
  - Huiwen Bao
  - Sheng Zhang
categories:
  - cs.CL
  - cs.CL
published: '2026-05-08T17:59:40Z'
fetched_at: '2026-05-11T08:20:12.069Z'
---
Test-time scaling (TTS) has become an effective approach for improving large language model performance by allocating additional computation during inference. However, existing TTS strategies are largely hand-crafted: researchers manually design reasoning patterns and tune heuristics by intuition, leaving much of the computation-allocation space unexplored. We propose an environment-driven framework, AutoTTS, that changes what researchers design: from individual TTS heuristics to environments where TTS strategies can be discovered automatically. The key to AutoTTS lies in environment construction: the discovery environment must make the control space tractable and provide cheap, frequent feedback for TTS search. As a concrete instantiation, we formulate width--depth TTS as controller synthesis over pre-collected reasoning trajectories and probe signals, where controllers decide when to branch, continue, probe, prune, or stop and can be evaluated cheaply without repeated LLM calls. We further introduce beta parameterization to make the search tractable and fine-grained execution trace feedback to improve discovery efficiency by helping the agent diagnose why a TTS program fails. Experiments on mathematical reasoning benchmarks show that the discovered strategies improve the overall accuracy--cost tradeoff over strong manually designed baselines. The discovered strategies generalize to held-out benchmarks and model scales, while the entire discovery costs only $39.9 and 160 min

Authors: Tong Zheng, Haolin Liu, Chengsong Huang, Huiwen Bao, Sheng Zhang
Categories: cs.CL, cs.CL
