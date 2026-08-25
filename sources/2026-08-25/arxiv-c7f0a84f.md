---
title: >-
  SWE Refactor Bench: Can Coding Agents Complete a Long-Horizon,
  Whole-Repository Stack Migration?
url: 'https://arxiv.org/abs/2608.23564v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Deyao Hong
  - Yizhe Chi
  - Wenyi Li
  - Xiaoqiu Wang
  - Mingju Gao
categories:
  - cs.CL
  - cs.AI
  - cs.SE
  - cs.CL
published: '2026-08-24T17:59:04Z'
fetched_at: '2026-08-25T11:02:03.396Z'
---
Modern software systems accumulate technical debt over decades of development, which makes migration expensive and largely manual. As coding agents become increasingly capable at bug fixing, can they autonomously perform such migrations? Existing benchmarks cannot answer this question because they evaluate only behavioural correctness, not whether the migration actually occurred. This leads an easy hack: agents copy the original implementation to make tests pass. We call this Blindness. To address this problem, we introduce SWE Refactor Bench, a benchmark comprising 20 whole-repository migrations, covering 4 kinds of technical debt. A three-stage evaluation protocol measures both migration completeness and behavioural correctness. (1) Migration Audit verifies that the migration occurred. (2) Behavioural Tests measure correctness with a fixed test suite. (3) Agentic Verification uses 6 independent coding agents to generate targeted tests for hidden behavioural differences. Across 520 runs from 8 frontier models and 26 model-effort configurations, only 28 of 520 runs ($5.4\%$) pass all three stages, 13 of the 20 tasks receive no accepted solution, and the best model (claude-opus-5) scores $47.0/100$. Migration completeness and behavioural correctness are distinct abilities: a few runs preserve behaviour by skipping the migration and are stopped at Migration Audit; most attempt it and break behaviour, and are stopped at Behavioural Tests. Agents cannot deliver a perfect migratio

Authors: Deyao Hong, Yizhe Chi, Wenyi Li, Xiaoqiu Wang, Mingju Gao
Categories: cs.CL, cs.AI, cs.SE, cs.CL
