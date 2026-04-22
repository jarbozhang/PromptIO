---
title: On two ways to use determinantal point processes for Monte Carlo integration
url: 'https://arxiv.org/abs/2604.19698v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guillaume Gautier
  - Rémi Bardenet
  - Michal Valko
categories:
  - cs.LG
  - math.ST
  - cs.LG
published: '2026-04-21T17:17:43Z'
fetched_at: '2026-04-22T08:06:49.538Z'
---
The standard Monte Carlo estimator $\widehat{I}_N^{\mathrm{MC}}$ of $\int fdω$ relies on independent samples from $ω$ and has variance of order $1/N$. Replacing the samples with a determinantal point process (DPP), a repulsive distribution, makes the estimator consistent, with variance rates that depend on how the DPP is adapted to $f$ and $ω$. We examine two existing DPP-based estimators: one by Bardenet &amp; Hardy (2020) with a rate of $\mathcal{O}(N^{-(1+1/d)})$ for smooth $f$, but relying on a fixed DPP. The other, by Ermakov &amp; Zolotukhin (1960), is unbiased with rate of order $1/N$, like Monte Carlo, but its DPP is tailored to $f$. We revisit these estimators, generalize them to continuous settings, and provide sampling algorithms.

Authors: Guillaume Gautier, Rémi Bardenet, Michal Valko
Categories: cs.LG, math.ST, cs.LG
