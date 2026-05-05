---
title: >-
  Reinforcement Learning for LLM-based Multi-Agent Systems through Orchestration
  Traces
url: 'https://arxiv.org/abs/2605.02801v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenchen Zhang
categories:
  - cs.CL
  - cs.CL
published: '2026-05-04T16:42:18Z'
fetched_at: '2026-05-05T09:52:13.896Z'
---
As large language model (LLM) agents evolve from isolated tool users into coordinated teams, reinforcement learning (RL) must optimize not only individual actions but also how work is spawned, delegated, communicated, aggregated, and stopped. This paper studies RL for LLM-based multi-agent systems through orchestration traces: temporal interaction graphs whose events include sub-agent spawning, delegation, communication, tool use, return, aggregation, and stopping decisions. Using this lens, we identify three technical axes. First, reward design spans eight families, including orchestration rewards for parallelism speedup, split correctness, and aggregation quality. Second, reward and credit signals attach to eight credit- or signal-bearing units from token to team; explicit counterfactual message-level credit remains especially sparse in our curated pool. Third, orchestration learning decomposes into five sub-decisions: when to spawn, whom to delegate to, how to communicate, how to aggregate, and when to stop. In our curated pool as of May 4, 2026, we found no explicit RL training method for the stopping decision. We connect academic methods to public industrial evidence from Kimi Agent Swarm, OpenAI Codex, and Anthropic Claude Code. The resulting scale gap is a gap between publicly reported deployment envelopes and open academic evaluation regimes, not independent verification of industrial training traces. We release the artifact at https://github.com/xxzcc/awesome-llm-mas

Authors: Chenchen Zhang
Categories: cs.CL, cs.CL
