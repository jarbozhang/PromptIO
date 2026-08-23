---
title: 'The Regression Tax: Decomposing Why Skills Help and Hurt LLM Agents'
url: 'https://arxiv.org/abs/2607.22520v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Darshan Tank
  - Baran Nama
categories:
  - cs.AI
  - cs.AI
published: '2026-07-24T17:50:03Z'
fetched_at: '2026-07-27T11:02:38.251Z'
---
Adding procedural skills to an LLM agent is typically evaluated by average improvement in task success. However, this metric hides an important cost: skills can also make agents worse. We measure both sides by comparing agents with and without skills across nearly 6,000 runs spanning two office automation benchmarks and three model harness stacks. This allows us to distinguish two outcomes. A regression is a task solved without skills but failed after skills are added. A residual failure is a task that fails both with and without skills. We find that regressions are substantial enough that the best performing skills outperform others primarily by regressing less, not by gaining more. We identify three causes of regression: (i) skill description osmosis, a skill changes an agent's behavior simply by being present in context, even when it is never invoked; (ii) grounding displacement, a skill's prescribed procedure overrides how the agent interprets its inputs; and (iii) verification displacement, where the procedure suppresses checks the agent would otherwise perform on its outputs. Analysing persistent failures reveals the same underlying pattern. Existing skills overemphasize procedural guidance the stage least often responsible for failure while under supporting grounding and verification, the dominant sources of remaining errors. After correcting evaluation artifacts and studying traces, we find many regressions and persistent failures recoverable through better grounding 

Authors: Darshan Tank, Baran Nama
Categories: cs.AI, cs.AI
