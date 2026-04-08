---
title: >-
  HaloProbe: Bayesian Detection and Mitigation of Object Hallucinations in
  Vision-Language Models
url: 'https://arxiv.org/abs/2604.06165v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Reihaneh Zohrabi
  - Hosein Hasani
  - Akshita Gupta
  - Mahdieh Soleymani Baghshah
  - Anna Rohrbach
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-04-07T17:58:04Z'
fetched_at: '2026-04-08T02:58:13.562Z'
---
Large vision-language models can produce object hallucinations in image descriptions, highlighting the need for effective detection and mitigation strategies. Prior work commonly relies on the model's attention weights on visual tokens as a detection signal. We reveal that coarse-grained attention-based analysis is unreliable due to hidden confounders, specifically token position and object repetition in a description. This leads to Simpson's paradox: the attention trends reverse or disappear when statistics are aggregated. Based on this observation, we introduce HaloProbe, a Bayesian framework that factorizes external description statistics and internal decoding signals to estimate token-level hallucination probabilities. HaloProbe uses balanced training to isolate internal evidence and combines it with learned prior over external features to recover the true posterior. While intervention-based mitigation methods often degrade utility or fluency by modifying models' internals, we use HaloProbe as an external scoring signal for non-invasive mitigation. Our experiments show that HaloProbe-guided decoding reduces hallucinations more effectively than state-of-the-art intervention-based methods while preserving utility.

Authors: Reihaneh Zohrabi, Hosein Hasani, Akshita Gupta, Mahdieh Soleymani Baghshah, Anna Rohrbach
Categories: cs.CV, cs.LG, cs.CV
