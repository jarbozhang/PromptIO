---
title: >-
  Does Bielik Know What It Doesn't Know? Activation Dispersion Separates Entity
  Familiarity from Factual Reliability Across Model Scale
url: 'https://arxiv.org/abs/2607.07670v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Grzegorz Brzezinka
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-07-08T17:24:43Z'
fetched_at: '2026-07-09T23:02:05.098Z'
---
Large language models hallucinate most about entities they have never seen. We ask whether a model's activations betray entity familiarity before a single answer token is generated, and whether that signal predicts the factual reliability of the answers. On four Polish Bielik models (1.5B-11B parameters), we probe four entity domains (athletes, cities, writers, musicians), each with 42 well-known, 42 obscure-but-real, and 42 fabricated entities addressed by a one-sentence question (504 prompts per model). Two unsupervised, single-forward-pass dispersion measures over post-SwiGLU MLP activations, inverse participation ratio and spectral entropy, separate known from fabricated entities at AUROC 0.95-1.00 across all domains and scales; a supervised linear probe reaches 0.99-1.00. Both clear selection-aware permutation floors of about 0.70-0.74 (empirical p&lt;=1e-3), survive held-out layer selection (0.93-0.99), and persist on real names (known vs. obscure-but-real: 0.96-1.00). The signal transfers across entity types (mean off-diagonal AUROC 0.92-0.99); a matched-template counterfactual shows the only large drops are template-caused, not entity-type effects, and the signal is diffuse across heads. This representational signal is already at ceiling at 1.5B, whereas behavioral factual reliability scales sharply: 0, 2, 10, and 19 of 42 known athletes are answered fully correctly by the 1.5B, 4.5B, 7B, and 11B models under a strict judge. Within known entities, separating correct f

Authors: Grzegorz Brzezinka
Categories: cs.CL, cs.LG, cs.CL
