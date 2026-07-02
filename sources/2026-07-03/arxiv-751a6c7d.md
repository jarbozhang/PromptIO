---
title: The State-Prediction Separation Hypothesis
url: 'https://arxiv.org/abs/2607.01218v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Giovanni Monea
  - Nathan Godey
  - Kianté Brantley
  - Yoav Artzi
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-07-01T17:55:09Z'
fetched_at: '2026-07-02T23:01:57.287Z'
---
Transformers use the same forward computation stream to both predict the next token and store useful state for future token predictions. We formulate the \emph{state-prediction separation hypothesis}: disentangling the two roles yields better language modeling performance. We design a Transformer variant that uses two computation streams to separate the two functions, and conduct pretraining experiments across various scales. Our experiments show that state-prediction separation consistently offers better data and compute efficiencies, improving validation loss and outperforming standard Transformers by 2--3 percentage points on average on downstream tasks. We also conduct extensive empirical analysis that rules out potential confounders and demonstrates the fundamental difference in the gradients our design entails.

Authors: Giovanni Monea, Nathan Godey, Kianté Brantley, Yoav Artzi
Categories: cs.CL, cs.AI, cs.LG, cs.CL
