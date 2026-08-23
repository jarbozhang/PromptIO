---
title: >-
  Multimodal Empirical Bayes Variational Autoencoders for Joint Longitudinal and
  Time-to-Event Modeling
url: 'https://arxiv.org/abs/2607.13984v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anders Sjöberg
  - Nils Olsson
  - Marcus Baaz
  - Mats Jirstrand
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-07-15T16:13:14Z'
fetched_at: '2026-07-16T23:02:09.826Z'
---
Longitudinal tumor measurements, dropout information, and genetic covariates provide complementary information about treatment response, but integrating these data sources within a single population modeling framework remains challenging. We extend the empirical Bayes variational autoencoder (EB-VAE) framework to joint longitudinal and time-to-event modeling and evaluate it on tumor growth data. The framework represents inter-individual variability using latent individual effects regularized by a covariate-conditioned empirical Bayes prior, while a decoder maps these latent effects to tumor-volume trajectories. To account for informative dropout, the decoder was augmented with a hazard model, yielding joint predictions of tumor growth and time to dropout. We further compared fully neural and hybrid semi-mechanistic decoder formulations and incorporated genomic covariates through a genetics-conditioned prior adaptation. The hybrid decoder recovered treatment-effect parameters broadly consistent with previously reported nonlinear mixed-effects estimates, while achieving prior predictive performance comparable to the neural decoder. The joint model reproduced both tumor-volume distributions and dropout patterns in held-out individuals, and genetic conditioning improved individual-level prior predictions in both cutaneous melanoma and breast cancer experiments. Stability selection identified several biologically plausible genetic indicators, including alterations in BRAF, NRAS, N

Authors: Anders Sjöberg, Nils Olsson, Marcus Baaz, Mats Jirstrand
Categories: stat.ML, cs.LG, stat.ML
