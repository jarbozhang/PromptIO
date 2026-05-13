---
title: >-
  TextSeal: A Localized LLM Watermark for Provenance &amp; Distillation
  Protection
url: 'https://arxiv.org/abs/2605.12456v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tom Sander
  - Hongyan Chang
  - Tomáš Souček
  - Tuan Tran
  - Valeriu Lacatusu
categories:
  - cs.CR
  - cs.CL
  - cs.LG
  - cs.CR
published: '2026-05-12T17:44:41Z'
fetched_at: '2026-05-13T10:19:24.405Z'
---
We introduce TextSeal, a state-of-the-art watermark for large language models. Building on Gumbel-max sampling, TextSeal introduces dual-key generation to restore output diversity, along with entropy-weighted scoring and multi-region localization for improved detection. It supports serving optimizations such as speculative decoding and multi-token prediction, and does not add any inference overhead. TextSeal strictly dominates baselines like SynthID-text in detection strength and is robust to dilution, maintaining confident localized detection even in heavily mixed human/AI documents. The scheme is theoretically distortion-free, and evaluation across reasoning benchmarks confirms that it preserves downstream performance; while a multilingual human evaluation (6000 A/B comparisons, 5 languages) shows no perceptible quality difference. Beyond its use for provenance detection, TextSeal is also ``radioactive'': its watermark signal transfers through model distillation, enabling detection of unauthorized use.

Authors: Tom Sander, Hongyan Chang, Tomáš Souček, Tuan Tran, Valeriu Lacatusu
Categories: cs.CR, cs.CL, cs.LG, cs.CR
