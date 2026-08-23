---
title: Agentic Hardware Design as Repository-Level Code Evolution
url: 'https://arxiv.org/abs/2606.28279v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Cunxi Yu
  - Chenhui Deng
  - Nathaniel Pinckney
  - Brucek Khailany
categories:
  - cs.AR
  - cs.AI
  - cs.AR
published: '2026-06-26T17:21:06Z'
fetched_at: '2026-06-29T23:02:47.149Z'
---
We present HORIZON, a self-evolving agent framework that treats hardware design as repository-level code evolution. A Markdown harness is compiled into a project pack containing domain knowledge, an executable evaluator, an acceptance predicate, and a git/runtime policy; a hands-free agent loop then evolves an isolated git worktree, using repository operations for state management, tracing, and replay. This extends prior works of repository-scale self-evolution from EDA software systems, to hardware-design artifacts themselves. We evaluate our approach on ChipBench, RTLLM, Verilog-Eval, and nine CVDP categories, achieving 100\% benchmark completion across all suites with a fully hands-free agentic loop. However, we do not claim that agentic AI for hardware design is solved: these benchmarks are controlled proxies for a much broader engineering problem in chip design. Section~\ref{sec:discuss} examines the limitations of the current study and highlights open research challenges.

Authors: Cunxi Yu, Chenhui Deng, Nathaniel Pinckney, Brucek Khailany
Categories: cs.AR, cs.AI, cs.AR
