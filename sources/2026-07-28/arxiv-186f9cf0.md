---
title: >-
  DataOrchestra: Learning to Orchestrate Per-Example Curation of Pretraining
  Data
url: 'https://arxiv.org/abs/2607.24717v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhen Huang
  - Yikun Wang
  - Shijie Xia
  - Pengfei Liu
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-07-27T17:54:12Z'
fetched_at: '2026-07-28T11:02:16.572Z'
---
Pretraining data processing is critical to the downstream performance of Large Language Models (LLMs). However, many existing approaches define a fixed processing strategy at the corpus or domain level and apply it uniformly to many examples, without adapting to the needs of each example. We propose DataOrchestra, a framework that unifies different processing operations and orchestrates an example-specific pipeline for each example. Given a chunk of pretraining data, an orchestrator decides whether to drop, untouch, or clean it. For a chunk to be cleaned, it selects one or more downstream operations, ranging from programmatic editing to different forms of LLM-based rewriting. For each rewriting step, it further generates a concrete instruction, which is executed by the corresponding downstream tool model. We pretrain models from 0.5B to 7B from scratch on web data processed by DataOrchestra and observe stable average gains over individual data-processing methods across 11 benchmarks. DataOrchestra is also effective for math continued pretraining and outperforms stronger processing baselines, while reducing processing compute by skipping unnecessary downstream operations.

Authors: Zhen Huang, Yikun Wang, Shijie Xia, Pengfei Liu
Categories: cs.CL, cs.AI, cs.CL
