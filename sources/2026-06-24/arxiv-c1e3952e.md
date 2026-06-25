---
title: >-
  SAFARI: Scaling Long Horizon Agentic Fault Attribution via Active
  Investigation
url: 'https://arxiv.org/abs/2606.24626v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chenyang Zhu
  - Jiayu Yao
  - Kushal Chawla
  - Youbing Yin
  - Nathan Wolfe
categories:
  - cs.AI
  - cs.AI
published: '2026-06-23T14:23:40Z'
fetched_at: '2026-06-24T01:28:36.379Z'
---
As autonomous agents tackle increasingly complex multi-step, multi-agent tasks, their execution trajectories have scaled beyond the constraints of even the largest context windows. Current methods for effectively diagnosing agent failures load the full trajectory into an LLM's context window, which suffers from attention dilution and fails when agentic traces inevitably exceed context limits. To address this, we introduce SAFARI (Scaling long-horizon Agentic Fault AttRibution via active Investigation), a framework that replaces linear context loading with a tool-augmented diagnostic loop. By equipping LLMs with a specialized toolbox to read and search trajectory segments alongside a persistent Short-Term Memory (STM) for cross-turn reasoning, SAFARI effectively decouples diagnostic accuracy from architectural context limits. Our experiments demonstrate that SAFARI outperforms state-of-the-art results by 20% on the Who&amp;When dataset within a 1M token budget, and by 19% on TRAIL GAIA subset on a 25K token budget. Most significantly, SAFARI maintains a 0.58 precision even when the target fault resides 5x beyond the model's native context window, a scenario where traditional evaluators fail entirely.

Authors: Chenyang Zhu, Jiayu Yao, Kushal Chawla, Youbing Yin, Nathan Wolfe
Categories: cs.AI, cs.AI
