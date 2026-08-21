---
title: >-
  AI4AI-Bench: Benchmarking LLM Agents in Algorithmic Design for Recursive
  Self-Improvement
url: 'https://arxiv.org/abs/2608.20318v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yizhe Chi
  - Wenyi Li
  - Deyao Hong
  - Xiaoqiu Wang
  - Mingju Gao
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-08-20T17:56:59Z'
fetched_at: '2026-08-21T11:02:46.130Z'
---
Recursive self-improvement (RSI) asks whether an AI system can improve the process that produces AI systems, so that the next system inherits the improvement. That process is the training algorithm: a better objective or update rule improves the compute\mbox{-}capability exchange rate for every subsequent run, including the one that produces the next agent. Whether RSI is feasible therefore turns on whether an agent can design training algorithms. No benchmark isolates that ability: existing suites are won by collecting data or by tuning hyperparameters, and none tells a change to how a run is executed apart from a change to how the model learns. We present AI4AI\mbox{-}Bench, 10 frozen research repositories spanning 10 training algorithm families. In each task, an agent has 4 hours on one B300 to rewrite the training algorithm; its code is then rerun from scratch for up to 12 hours and scored by a fixed evaluator hidden from the agent, against the repository's original algorithm under the same procedure. Because the 10 metrics are incommensurable, every task is mapped onto one scale on which $0$ is an uninformative model, $0.1$ is the algorithm the repository ships, and $1.0$ is the task optimum. Across 29 configurations of 6 systems on all 10 tasks the mean score is $0.166$, and the best system reaches $0.250$: even the strongest closes under a fifth of the distance between the algorithm that was already there and the optimum. The submissions show where that distance went: 

Authors: Yizhe Chi, Wenyi Li, Deyao Hong, Xiaoqiu Wang, Mingju Gao
Categories: cs.AI, cs.CL, cs.LG, cs.AI
