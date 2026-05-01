---
title: 'Claw-Eval-Live: A Live Agent Benchmark for Evolving Real-World Workflows'
url: 'https://arxiv.org/abs/2604.28139v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenxin Li
  - Zhengyang Tang
  - Huangxin Lin
  - Yunlong Lin
  - Shijue Huang
categories:
  - cs.SE
  - cs.AI
  - cs.SE
published: '2026-04-30T17:23:19Z'
fetched_at: '2026-05-01T02:24:44.545Z'
---
LLM agents are expected to complete end-to-end units of work across software tools, business services, and local workspaces. Yet many agent benchmarks freeze a curated task set at release time and grade mainly the final response, making it difficult to evaluate agents against evolving workflow demand or verify whether a task was executed. We introduce Claw-Eval-Live, a live benchmark for workflow agents that separates a refreshable signal layer, updated across releases from public workflow-demand signals, from a reproducible, time-stamped release snapshot. Each release is constructed from public workflow-demand signals, with ClawHub Top-500 skills used in the current release, and materialized as controlled tasks with fixed fixtures, services, workspaces, and graders. For grading, Claw-Eval-Live records execution traces, audit logs, service state, and post-run workspace artifacts, using deterministic checks when evidence is sufficient and structured LLM judging only for semantic dimensions. The release contains 105 tasks spanning controlled business services and local workspace repair, and evaluates 13 frontier models under a shared public pass rule. Experiments reveal that reliable workflow automation remains far from solved: the leading model passes only 66.7% of tasks and no model reaches 70%. Failures are structured by task family and execution surface, with HR, management, and multi-system business workflows as persistent bottlenecks and local workspace repair comparative

Authors: Chenxin Li, Zhengyang Tang, Huangxin Lin, Yunlong Lin, Shijue Huang
Categories: cs.SE, cs.AI, cs.SE
