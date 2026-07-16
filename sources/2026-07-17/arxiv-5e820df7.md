---
title: >-
  Do Agent Optimizers Compound? A Continual-Learning Evaluation on
  Terminal-Bench 2.0
url: 'https://arxiv.org/abs/2607.14004v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wenxiao Wang
  - Priyatham Kattakinda
  - Soheil Feizi
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-07-15T16:36:04Z'
fetched_at: '2026-07-16T23:02:09.825Z'
---
Most reported gains from agent-optimization methods are one-shot: an agent is optimized against a fixed benchmark and the resulting improvement is reported as if it were a stable property of the method. This does not test the setting that matters for deployed agents, where optimization is applied recursively as new failures and new tasks appear over time. The central question this raises is whether optimizer-driven gains compound: after an agent has been optimized once, can it be optimized again on newly arrived tasks without eroding the gains the first round produced? We study this question with a two-phase continual-learning evaluation built from hard tasks in Terminal-Bench 2.0, comparing three approaches to agent-harness optimization (GEPA, Meta Harness, and RELAI's Verifiable Continual Learning, RELAI-VCL) under identical optimization budgets. All three methods improve over the baseline agent in the conventional, static, single-phase setting. However, once new tasks are introduced, the methods diverge sharply: GEPA's optimized agent transfers below the unoptimized baseline, Meta Harness transfers well but fails to improve further once given a second optimization budget, and RELAI-VCL is the only method that both transfers positively to unseen tasks and continues improving after those tasks are folded into the optimization objective, reaching the highest pass rate at every evaluated stage and the highest lifelong average pass rate overall (76.4% vs. 66.0% for GEPA, 64.6% 

Authors: Wenxiao Wang, Priyatham Kattakinda, Soheil Feizi
Categories: cs.AI, cs.CL, cs.LG, cs.AI
