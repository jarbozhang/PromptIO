---
title: 'WildClawBench: A Benchmark for Real-World, Long-Horizon Agent Evaluation'
url: 'https://arxiv.org/abs/2605.10912v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shuangrui Ding
  - Xuanlang Dai
  - Long Xing
  - Shengyuan Ding
  - Ziyu Liu
categories:
  - cs.CL
  - cs.CL
published: '2026-05-11T17:49:43Z'
fetched_at: '2026-05-12T11:42:53.210Z'
---
Large language and vision-language models increasingly power agents that act on a user's behalf through command-line interface (CLI) harnesses. However, most agent benchmarks still rely on synthetic sandboxes, short-horizon tasks, mock-service APIs, and final-answer checks, leaving open whether agents can complete realistic long-horizon work in the runtimes where they are deployed. This work presents WildClawBench, a native-runtime benchmark of 60 human-authored, bilingual, multimodal tasks spanning six thematic categories. Each task averages roughly 8 minutes of wall-clock time and over 20 tool calls, and runs inside a reproducible Docker container hosting an actual CLI agent harness (OpenClaw, Claude Code, Codex, or Hermes Agent) with access to real tools rather than mock services. Grading is hybrid, combining deterministic rule-based checks, environment-state auditing of side effects, and an LLM/VLM judge for semantic verification. Across 19 frontier models, the best, Claude Opus 4.7, reaches only 62.2% overall under OpenClaw, while every other model stays below 60%, and switching harness alone shifts a single model by up to 18 points. These results show that long-horizon, native-runtime agent evaluation remains a far-from-resolved task for current frontier models. We release the tasks, code, and containerized tooling to support reproducible evaluation.

Authors: Shuangrui Ding, Xuanlang Dai, Long Xing, Shengyuan Ding, Ziyu Liu
Categories: cs.CL, cs.CL
