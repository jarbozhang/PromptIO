---
title: >-
  Toward Skill-Native LLMs: Skill Entropy for Benchmarking and Training
  Long-Horizon Reasoning
url: 'https://arxiv.org/abs/2608.05139v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yinghui He
  - Ling Yang
  - Jiarui Liu
  - Yongjin Yang
  - Lechen Zhang
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-08-05T17:57:16Z'
fetched_at: '2026-08-06T11:02:48.670Z'
---
Long-horizon reasoning in recent LLMs demands that the model switch between distinct skills inside a reasoning chain, such as first doing a math derivation, then using the result to plan a schedule. We call such problems cross-skill long-horizon tasks: multi-step tasks whose steps require different reasoning skills and depend on earlier outputs. Existing benchmarks often evaluate individual skills, lacking a principled way to measure how well a model switches between skills. We address this gap from both the evaluation and training sides. We introduce Skill Entropy, a measure of the difficulty of switching from one skill to another. We then propose Skill^2-Bench, a benchmark of cross-skill long-horizon tasks built over 558 skills across 9 verifiable and open-ended domains. Each task is assigned a task-level skill-entropy score and grouped into three difficulty levels. Evaluating 8 frontier and 4 open-source models on Skill^2-Bench reveals a skill-switching gap: accuracy decreases on higher-entropy tasks. We then turn skill entropy from a benchmark scale into a training signal. We propose Skill-Entropy RL, an RL framework where the model predicts not only the answer at each step but also the skill used to produce it. The reward combines step-level correctness with a skill-entropy reward that measures the alignment between the model-predicted skill sequence and the gold skill sequence. On Qwen3-4B-Instruct and Qwen3-1.7B, Skill-Entropy RL improves the Skill^2-Bench score from 3

Authors: Yinghui He, Ling Yang, Jiarui Liu, Yongjin Yang, Lechen Zhang
Categories: cs.CL, cs.LG, cs.CL
