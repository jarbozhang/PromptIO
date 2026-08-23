---
title: 'SPADE: Self-Play in Adaptive Synthetic Executable Environments'
url: 'https://arxiv.org/abs/2608.19197v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Bo Liu
  - Simon Yu
  - Yiding Jiang
  - Ao Qu
  - Andrew Zhao
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-08-19T17:58:56Z'
fetched_at: '2026-08-20T11:02:39.284Z'
---
Continuous self-improvement requires an ever-expanding pool of self-generated, diverse, adaptive goals. For language agents, existing training environment pools (hand-curated, statically synthesized, or frozen-verifier) keep the goal distribution fixed as the learner scales. We introduce SPADE (Self-Play in Adaptive Synthetic Executable Environments), a self-play RL framework in which a single LLM plays two roles: an Environment Designer that writes complete, long-horizon training environments as executable code with an OpenAI Gym-style reset()/step() interface, and a Reasoning Agent that learns to act in them. Each is a stateful, multi-turn environment (state transitions, reward functions, and verification code), so one interface spans reasoning problems and multi-step agentic tool use. The Reasoning Agent's regret is estimated using the gap between its reward with and without privileged hints; in optimizing this regret signal the Environment Designer learns to target environments at the edge of the agent's capabilities while keeping them feasible. Through extensive experimentation, we find several components critical to success: grounding the Environment Designer on documents sampled from a large pretraining corpus, and giving it an accumulated environment memory. Scaling to 30B-parameter models, SPADE improves over the strongest fixed-environment baseline by +5.3 on average across eight held-out math, science, code, and reasoning benchmarks, and lifts the tool-use setting 

Authors: Bo Liu, Simon Yu, Yiding Jiang, Ao Qu, Andrew Zhao
Categories: cs.CL, cs.AI, cs.CL
