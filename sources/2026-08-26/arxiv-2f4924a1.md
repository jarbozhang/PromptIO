---
title: >-
  What FID Hides: Detecting, Ranking, and Diagnosing Deviations in Generative
  Evaluation
url: 'https://arxiv.org/abs/2608.24881v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hao Chen
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-08-25T17:58:46Z'
fetched_at: '2026-08-26T11:02:45.098Z'
---
Generative models are commonly ranked by Fréchet Inception Distance (FID) and Kernel Inception Distance (KID), yet FID's first-two-moment summary can miss distributional differences, and a reported scalar gap alone is not a calibrated test against sampling variation. FID's moment restriction has concrete consequences: on ImageNet, visually unrecognizable images optimized only to match the reference Inception mean and covariance obtain FID $24.7$ versus $58.6$ for held-out real images (lower is better). Moreover, FID and KID are scalar discrepancies that are unchanged when the two samples are exchanged and therefore do not encode the direction of a dispersion change: under-dispersion, as can occur in mode collapse, versus over-dispersion. We introduce \textbf{ZID} (\emph{Z-resolved Integrated Diagnostic}), which combines six standardized location- and dispersion-sensitive arms from a rank graph (RISE) and Gaussian kernels (GPK at two bandwidths). Rather than asking one scalar to serve incompatible roles, ZID reports three linked outputs: an index for ranking departure magnitude, a permutation $p$-value for testing distributional equality, and a signed dispersion readout for diagnosis. In controlled experiments, ZID detects a broad range of departures, and its score tracks increasing severity along the corresponding sweeps, including cases in which FID is flat or reversed. On DiT-XL/2 and SiT-XL/2 guidance sweeps, ZID detects departure from real data, and its signed readout lab

Authors: Hao Chen
Categories: stat.ML, cs.LG, stat.ML
