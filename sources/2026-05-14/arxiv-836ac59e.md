---
title: Harnessing Agentic Evolution
url: 'https://arxiv.org/abs/2605.13821v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jiayi Zhang
  - Yongfeng Gu
  - Jianhao Ruan
  - Maojia Song
  - Yiran Peng
categories:
  - cs.AI
  - cs.LG
  - cs.AI
published: '2026-05-13T17:45:16Z'
fetched_at: '2026-05-14T12:15:41.552Z'
---
Agentic evolution has emerged as a powerful paradigm for improving programs, workflows, and scientific solutions by iteratively generating candidates, evaluating them, and using feedback to guide future search. However, existing methods are typically instantiated either as fixed hand-designed procedures that are modular but rigid, or as general-purpose agents that flexibly integrate feedback but can drift in long-horizon evolution. Both forms accumulate rich evidence over time, including candidates, feedback, traces, and failures, yet lack a stable interface for organizing this evidence and revising the mechanism that drives future evolution. We address this limitation by formulating agentic evolution as an interactive environment, where the accumulated evolution context serves as a process-level state. We introduce AEvo, a harnessed meta-editing framework in which a meta-agent observes this state and acts not by directly proposing the next candidate, but by editing the procedure or agent context that controls future evolution. This unified interface enables AEvo to steer both procedure-based and agent-based evolution, making accumulated evidence actionable for long-horizon search. Empirical evaluations on agentic and reasoning benchmarks show that AEvo outperforms five evolution baselines, achieving a 26 relative improvement over the strongest baseline. Across three open-ended optimization tasks, AEvo further outperforms four evolution baselines and achieves state-of-the-art

Authors: Jiayi Zhang, Yongfeng Gu, Jianhao Ruan, Maojia Song, Yiran Peng
Categories: cs.AI, cs.LG, cs.AI
