---
title: >-
  Pion: A Spectrum-Preserving Optimizer via Orthogonal Equivalence
  Transformation
url: 'https://arxiv.org/abs/2605.12492v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kexuan Shi
  - Hanxuan Li
  - Zeju Qiu
  - Yandong Wen
  - Simon Buchholz
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-05-12T17:59:34Z'
fetched_at: '2026-05-13T10:19:24.401Z'
---
We introduce Pion, a spectrum-preserving optimizer for large language model (LLM) training based on orthogonal equivalence transformation. Unlike additive optimizers such as Adam and Muon, Pion updates each weight matrix through left and right orthogonal transformations, preserving its singular values throughout training. This yields an optimization mechanism that modulates the geometry of weight matrices while keeping their spectral norm fixed. We derive the Pion update rule, systematically examine its design choices, and analyze its convergence behavior along with several key properties. Empirical results show that Pion offers a stable and competitive alternative to standard optimizers for both LLM pretraining and finetuning.

Authors: Kexuan Shi, Hanxuan Li, Zeju Qiu, Yandong Wen, Simon Buchholz
Categories: cs.LG, stat.ML, cs.LG
