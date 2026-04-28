---
title: SFT-then-RL Outperforms Mixed-Policy Methods for LLM Reasoning
url: 'https://arxiv.org/abs/2604.23747v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alexis Limozin
  - Eduard Durech
  - Torsten Hoefler
  - Imanol Schlag
  - Valentina Pyatkin
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.LG
published: '2026-04-26T14:53:48Z'
fetched_at: '2026-04-28T02:04:33.982Z'
---
Recent mixed-policy optimization methods for LLM reasoning that interleave or blend supervised and reinforcement learning signals report improvements over the standard SFT-then-RL pipeline. We show that numerous recently published research papers rely on a faulty baseline caused by two distinct bugs: a CPU-offloaded optimizer bug in DeepSpeed that silently drops intermediate micro-batches during gradient accumulation (affecting multiple downstream frameworks including TRL, OpenRLHF and Llama-Factory), and a loss aggregation bug in OpenRLHF that incorrectly weights per-mini-batch losses. Together they suppress SFT performance, with the optimizer bug accounting for most of the gap and the loss aggregation bug contributing a smaller additional effect. Once corrected, the standard SFT-then-RL pipeline surpasses every published mixed-policy method we evaluate by +3.8 points on math benchmarks with Qwen2.5-Math-7B and by +22.2 points with Llama-3.1-8B. Even a truncated variant with just 50 RL steps outperforms mixed-policy methods on math benchmarks while using fewer FLOPs.

Authors: Alexis Limozin, Eduard Durech, Torsten Hoefler, Imanol Schlag, Valentina Pyatkin
Categories: cs.LG, cs.AI, cs.CL, cs.LG
