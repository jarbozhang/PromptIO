---
title: Can RL Teach Long-Horizon Reasoning to LLMs? Expressiveness Is Key
url: 'https://arxiv.org/abs/2605.06638v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tianle Wang
  - Zhaoyang Wang
  - Guangchen Lan
  - Xinpeng Wei
  - Sipeng Zhang
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-05-07T17:48:42Z'
fetched_at: '2026-05-10T05:29:17.425Z'
---
Reinforcement learning (RL) has been applied to improve large language model (LLM) reasoning, yet the systematic study of how training scales with task difficulty has been hampered by the lack of controlled, scalable environments. We introduce ScaleLogic, a synthetic logical reasoning framework that offers independent control over two axes of difficulty: the depth of the required proof planning (i.e., the horizon) and the expressiveness of the underlying logic. Our proposed framework supports a wide range of logics: from simple implication-only logic ("if-then") towards more expressive first-order reasoning with conjunction ("and"), disjunction ("or"), negation ("not"), and universal quantification ("for all"). Using this framework, we show that the RL training compute $T$ follows a power law with respect to reasoning depth $D$ ($T \propto D^γ$, $R^{2} &gt; 0.99$), and that the scaling exponent $γ$ increases monotonically with logical expressiveness, from $1.04$ to $2.60$. On downstream mathematics and general reasoning benchmarks, more expressive training settings yield both larger performance gains (up to $+10.66$ points) and more compute-efficient transfer compared to less expressive settings, demonstrating that what a model is trained on, not just how much it is trained, shapes downstream transfer. We further show that the power-law relationship holds across multiple RL methods, and curriculum-based training substantially improves scaling efficiency.

Authors: Tianle Wang, Zhaoyang Wang, Guangchen Lan, Xinpeng Wei, Sipeng Zhang
Categories: cs.AI, cs.CL, cs.AI
