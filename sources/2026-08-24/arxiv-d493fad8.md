---
title: Truthful Calibration Measures for Sequential Prediction
url: 'https://arxiv.org/abs/2608.21348v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anagha Gokul
  - Jason Hartline
  - Lunjia Hu
  - Jonathan Ullman
  - Yifan Wu
categories:
  - cs.DS
  - cs.GT
  - cs.LG
  - cs.DS
published: '2026-08-21T17:54:05Z'
fetched_at: '2026-08-24T11:03:01.299Z'
---
Calibration requires probabilistic reports to be conditionally unbiased and reliably interpretable as probabilities. A calibration measure assigns numerical error to miscalibrated reports. Haghtalab et al. (2024) proposed an approximately truthful calibration measure for online prediction, leaving open whether exact truthfulness is compatible with completeness and soundness. We resolve this question negatively for sequential binary prediction: exact truthfulness is incompatible with completeness and soundness, even for independent outcomes. We then show that this impossibility is specific to exact truthfulness. We give two general reductions from a base calibration measure, producing additively and multiplicatively approximately truthful calibration measures, respectively. Applying the multiplicative reduction, for every $0 &lt; \varepsilon &lt; 1$ we construct a sound and complete calibration measure that is $(1+\exp(-T^{(1-\varepsilon)/2}/2))$-multiplicatively truthful. This improves the approximate-truthfulness guarantee of Haghtalab et al. (2024).

Authors: Anagha Gokul, Jason Hartline, Lunjia Hu, Jonathan Ullman, Yifan Wu
Categories: cs.DS, cs.GT, cs.LG, cs.DS
