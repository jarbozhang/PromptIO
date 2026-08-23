---
title: >-
  PEFT-Arena: Understanding Parameter-Efficient Finetuning from a
  Stability-Plasticity Perspective
url: 'https://arxiv.org/abs/2605.28819v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yangyi Huang
  - Ruotian Peng
  - Zeju Qiu
  - Jiale Kang
  - Yandong Wen
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-05-27T17:59:51Z'
fetched_at: '2026-05-28T03:17:22.082Z'
---
Parameter-efficient finetuning (PEFT) has become the standard approach for adapting large language models, yet evaluations largely emphasize downstream accuracy while overlooking the retention of pretrained capabilities. We argue that PEFT should be assessed through the stability-plasticity dilemma: the trade-off between target-task adaptation and resistance to forgetting. We introduce PEFT-Arena, a benchmark that jointly measures downstream performance and general capability retention. Across methods, we find distinct stability-plasticity profiles; under comparable parameter budgets, orthogonal finetuning achieves the most favorable Pareto frontier. To explain these differences, we analyze PEFT updates from two geometric perspectives. In weight space, spectral analysis reveals how parameterizations interact with the pretrained singular-value structure. In activation space, retention metrics show whether finetuning preserves or distorts general-capability representations, with forgetting linked to non-isometric representation distortion. Finally, an analysis shows that final SFT checkpoints often overshoot a better target-retention operating point. Inspired by this, we present case studies of a post-hoc improvement with path-wise rewinding.

Authors: Yangyi Huang, Ruotian Peng, Zeju Qiu, Jiale Kang, Yandong Wen
Categories: cs.LG, cs.CL, cs.LG
