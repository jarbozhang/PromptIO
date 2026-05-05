---
title: >-
  A Closed-Form Persistence-Landmark Pipeline for Certified Point-Cloud and
  Graph Classification
url: 'https://arxiv.org/abs/2605.02836v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sushovan Majhi
  - Atish Mitra
  - Žiga Virk
  - Pramita Bagchi
categories:
  - cs.LG
  - math.AT
  - cs.LG
published: '2026-05-04T17:15:01Z'
fetched_at: '2026-05-05T09:52:13.893Z'
---
We introduce PLACE (Persistence-Landmark Analytic Classification Engine), a closed-form pipeline for classifying point clouds and graphs through their persistent-homology signatures. Three quantitative guarantees -- a margin-based excess-risk rate, a closed-form descriptor-selection rule, and a per-prediction certificate -- are derived from training labels alone, with no learned weights or held-out calibration. The embedding sums Mitra-Virk single-point coordinate functions over a sparse landmark grid; closed-form weights maximize a structural distortion constant $λ(ν)$ (a Lipschitz lower bound on $\mathcal{D}_n$ under non-interference). (i) An $O(kR/(Δ\sqrt{m_{\min}}))$ margin bound, driven by class-mean separation $Δ$ and embedding radius $R$, matched by a sample-starved minimax lower bound. (ii) The Mahalanobis margin under Ledoit-Wolf-shrunk covariance is the strongest closed-form descriptor selector on a heterogeneous 64-descriptor chemical-graph pool (mean Spearman $ρ\approx +0.54$ across 10 benchmarks, positive on 9 of 10); the isotropic surrogate $Δ/\sqrt\ell$ admits a closed-form selection-consistency rate on homogeneous (14-15 descriptor) protein/social pools. (iii) A training-time-decided certificate with no per-prediction overhead, in non-asymptotic Pinelis and asymptotic Gaussian plug-in forms. Empirically, PLACE is the strongest diagram-based method on Orbit5k and matches the strongest topology-based baseline within statistical noise on MUTAG and COX2. The remai

Authors: Sushovan Majhi, Atish Mitra, Žiga Virk, Pramita Bagchi
Categories: cs.LG, math.AT, cs.LG
