---
title: 'When Attention Goes Blind: Numerical Failure in ALiBi Positional Encodings'
url: 'https://arxiv.org/abs/2608.03994v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Christopher Schröder
  - Lukas Gienapp
  - Ferdinand Schlatt
  - Martin Potthast
  - Gerhard Heyer
categories:
  - cs.CL
  - cs.CL
published: '2026-08-04T17:54:01Z'
fetched_at: '2026-08-05T11:02:38.583Z'
---
We identify a previously overlooked failure mode of ALiBi positional encoding: its linear bias scaling underflows floating-point precision, which zeroes out a large fraction of attention weights and renders the affected attention heads partially blind. We analyze this failure mode, characterize its impact, and examine four mitigation strategies. We further demonstrate its occurrence in state-of-the-art pretrained models based on ALiBi. Comprehensive pretraining experiments with 148M-parameter decoder models help us to disentangle its effects from out-of-context degradation. We find that ALiBi's failure mode can substantially impair token retrieval while having only a minor effect on standard decoder benchmarks. We propose four training-time mitigation strategies and evaluate them individually and in combinations, finding that log-scaled distances yield the most consistent improvements in passkey retrieval. Despite this problem, default ALiBi slopes remain a surprisingly strong baseline, particularly for needle-in-a-haystack retrieval. Based on these findings we provide concrete recommendations on how to train models with ALiBi.

Authors: Christopher Schröder, Lukas Gienapp, Ferdinand Schlatt, Martin Potthast, Gerhard Heyer
Categories: cs.CL, cs.CL
