---
title: >-
  Multimodal Spatiotemporal Atmospheric Data Assimilation with Latent
  Flow-matching
url: 'https://arxiv.org/abs/2608.05103v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Dibyajyoti Chakraborty
  - Romit Maulik
categories:
  - cs.LG
  - math-ph
  - physics.ao-ph
  - physics.flu-dyn
  - cs.LG
published: '2026-08-05T17:42:29Z'
fetched_at: '2026-08-06T11:02:48.674Z'
---
Data assimilation (DA) uses Bayesian inference to update the state of a numerical forecast model with observed data. In this study, we propose a fundamentally different, unified approach to atmospheric data assimilation. We use latent video flow-matching to sample temporally consistent trajectories from a prior trained using ERA5 reanalysis (69 variables over an 8-day window). We also use posterior sampling to assimilate real observation sources, such as those from the NOAA Integrated Global Radiosonde Archive and the Integrated Surface Database. Because the prior generates a continuous trajectory, it naturally propagates information between observed and unobserved frames. Therefore, we can perform various DA tasks, such as filtering and smoothing, simply by changing the observed frames. Moreover, we generate full-state ensemble forecasts directly from sparse observations, achieving performance competitive with state-of-the-art observation-to-forecast models.

Authors: Dibyajyoti Chakraborty, Romit Maulik
Categories: cs.LG, math-ph, physics.ao-ph, physics.flu-dyn, cs.LG
