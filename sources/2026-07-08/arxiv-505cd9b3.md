---
title: >-
  Interpretable Human-Label-Free Deep Learning for Real-Bogus Classification
  with Uncertainty Quantification
url: 'https://arxiv.org/abs/2607.05393v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Raphaël Bonnet-Guerrini
  - Bruno Sanchez
  - Dominique Fouchez
  - Benjamin Racine
  - Maya Guy
categories:
  - astro-ph.IM
  - astro-ph.GA
  - astro-ph.HE
  - cs.AI
  - cs.LG
  - astro-ph.IM
published: '2026-07-06T17:59:58Z'
fetched_at: '2026-07-07T23:02:35.292Z'
---
Time-domain surveys generate many transient candidates, making Real-Bogus classification a critical step in automated discovery pipelines. Reliable labels are costly, while community labels can be noisy and survey-dependent. We aim to develop a Real-Bogus classification framework that can be trained without human-labeled data using injected transients and bogus-dominated survey data, remains robust under strong class contamination, and provides calibrated uncertainty quantification. We combine simulated transient injections with a contaminated survey class and train a dual-network model using asymmetric co-teaching for classes with different label-noise levels. We evaluate performance on a benchmark subset and analyze the learned representation with latent-space visualization tools. For uncertainty quantification (UQ), we compare MC dropout and deep ensembles and propose a low-cost hybrid strategy that exploits the dual-network setting to improve calibration. We extend the evaluation to the light-curve domain to assess recovery of light-curve classes. The method achieves strong Real-Bogus performance on the labeled subset and remains stable under severe class contamination. It recovers transient light-curve classes with high fidelity, while single-source identification is limited by ambiguity in light-curve-derived labels. Our hybrid UQ approach achieves competitive calibration relative to more expensive ensemble baselines. Latent-space analyses indicate that uncertainty alig

Authors: Raphaël Bonnet-Guerrini, Bruno Sanchez, Dominique Fouchez, Benjamin Racine, Maya Guy
Categories: astro-ph.IM, astro-ph.GA, astro-ph.HE, cs.AI, cs.LG, astro-ph.IM
