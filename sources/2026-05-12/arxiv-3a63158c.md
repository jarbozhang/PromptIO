---
title: >-
  Shepherd: A Runtime Substrate Empowering Meta-Agents with a Formalized
  Execution Trace
url: 'https://arxiv.org/abs/2605.10913v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Simon Yu
  - Derek Chong
  - Ananjan Nandi
  - Dilara Soylu
  - Jiuding Sun
categories:
  - cs.AI
  - cs.PL
  - cs.SE
  - cs.AI
published: '2026-05-11T17:50:51Z'
fetched_at: '2026-05-12T11:42:53.210Z'
---
We introduce Shepherd, a functional programming model that formalizes meta-agent operations on target agents as functions, with core operations mechanized in Lean. Shepherd records every agent-environment interaction as a typed event in a Git-like execution trace, enabling any past state to be forked and replayed. The system forks the agent process and its filesystem $5\times$ faster than Docker, achieving $&gt;95\%$ prompt-cache reuse on replay. We demonstrate the model through three applications. First, in runtime intervention, a live supervisor increases pair coding pass rates from 28.8% to 54.7% on CooperBench. Second, in counterfactual meta-optimization, branching exploration outperforms baselines across four benchmarks by up to 11 points while reducing wall-clock time by up to 58%. Third, in Tree-RL training, forking rollouts at selected turns improves TerminalBench-2 performance from 34.2% to 39.4%. These results establish Shepherd as an efficient infrastructure for programming meta-agents. We open-source the system to support future research.

Authors: Simon Yu, Derek Chong, Ananjan Nandi, Dilara Soylu, Jiuding Sun
Categories: cs.AI, cs.PL, cs.SE, cs.AI
