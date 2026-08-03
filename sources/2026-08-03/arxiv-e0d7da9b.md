---
title: >-
  Differentially Private Nonparametric Modal Learning with Applications to
  Regression and Clustering
url: 'https://arxiv.org/abs/2607.29675v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arkajyoti Bhattacharjee
  - Arnab Auddy
categories:
  - math.ST
  - cs.LG
  - stat.ME
  - stat.ML
  - math.ST
published: '2026-07-31T17:55:02Z'
fetched_at: '2026-08-03T11:02:19.113Z'
---
Density modes provide a localized and interpretable summary of multimodal distributions, but their estimation under rigorous differential privacy constraints remains largely unexplored. We study differentially private recovery of density modes for multivariate distributions under local smoothness, curvature, and separation conditions. We propose DP-GRAMS, a mean-shift inspired method that performs noisy ascent on a differentially private score estimator. Assuming the density belongs locally to a Hölder class with smoothness parameter $β&gt; 2$, our score estimator uses bias-reducing higher-order kernels, and then enforces privacy in the gradient ascent steps via gradient clipping and calibrated Gaussian noise. A private initialization scheme combines a density-aware utility with a suppression rule and, with $k\asymp M\log n$ draws over a public $h_{\mathrm{DAP}}$-grid and suppression radius $ρ_{\mathrm{init}}\asymp (\log n)^{-1/d}$, achieves high-probability coverage of the modal basins by successively suppressing selected local neighborhoods in competitive regions, while correlated noise across multiple starts enables joint release under a single $(\varepsilon,δ)$-differential privacy guarantee. We prove that all population modes are recovered with high probability and establish asymptotic error rates of the form $O\!\left((\tfrac{\log n}{n})^{\frac{2(β-1)}{d+2β}}\right) + O\!\left((\tfrac{\mathrm{polylog}(n,δ)}{n^2\varepsilon^2})^{\frac{β-1}{d+β}}\right)$. We also provide m

Authors: Arkajyoti Bhattacharjee, Arnab Auddy
Categories: math.ST, cs.LG, stat.ME, stat.ML, math.ST
