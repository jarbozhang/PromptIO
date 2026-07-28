---
title: >-
  Causal-TS: A Python Library for Causal Discovery in High-Dimensional and
  Nonstationary Time Series
url: 'https://arxiv.org/abs/2607.24673v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mohammad Fesanghary
categories:
  - cs.LG
  - stat.ME
  - cs.LG
published: '2026-07-27T17:14:48Z'
fetched_at: '2026-07-28T11:02:16.573Z'
---
We describe Causal-TS, an open-source Python library for causal discovery in high-dimensional and nonstationary multivariate time series. Causal-TS provides four specialized algorithms-CDNOTS, CDNOTS+, CEDAR, and GRACE-along with wrappers for GES, Granger, LASSO-VAR, and LGES, all sharing a unified conditional independence (CI) test layer with GPU acceleration via PyTorch. A regime discovery pipeline detects structural breaks via pluggable changepoint detectors and runs discovery per regime with regime-specific parameters. A command-line interface, synthetic data generators, and optional DoWhy integration provide an end-to-end pipeline from raw time series to causal effect estimates. The library is pip-installable, tested on Python 3.10--3.12, and available at https://github.com/bloomberg/causal-ts.

Authors: Mohammad Fesanghary
Categories: cs.LG, stat.ME, cs.LG
