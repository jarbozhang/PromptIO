---
title: Language Models Need Sleep
url: 'https://arxiv.org/abs/2605.26099v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sangyun Lee
  - Sean McLeish
  - Tom Goldstein
  - Giulia Fanti
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-05-25T17:55:39Z'
fetched_at: '2026-05-27T01:19:09.165Z'
---
Transformer-based large language models are increasingly used for long-horizon tasks; however, their attention mechanism scales poorly with context length. To handle this, we study a sleep-like consolidation mechanism in which a model periodically converts recent context into persistent fast weights before clearing its key-value cache. During sleep, the model performs $N$ offline recurrent passes over the accumulated context and updates the fast weights in its state-space model (SSM) blocks through a learned local rule. During inference, this shifts extra computation to sleep while preserving the latency of wake-time prediction. We test our method on controlled synthetic tasks, including cellular automata and multi-hop graph retrieval, as well as a realistic math reasoning task, on which a regular transformer as well as SSM-attention hybrid models fail. We then show that increasing sleep duration $N$ for our models improves performance, with the largest gains on examples that require deeper reasoning.

Authors: Sangyun Lee, Sean McLeish, Tom Goldstein, Giulia Fanti
Categories: cs.CL, cs.AI, cs.CL
