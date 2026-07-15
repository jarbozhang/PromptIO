---
title: 'Efficient Sequential Calibration with $O(T^{2/3-ε})$ Error Bound'
url: 'https://arxiv.org/abs/2607.12928v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zihan Zhang
categories:
  - cs.LG
  - cs.LG
published: '2026-07-14T16:00:29Z'
fetched_at: '2026-07-15T23:03:05.478Z'
---
We study the online binary sequential calibration problem. A recent breakthrough by \citet{dagan2024breaking} overcomes the classical \(T^{2/3}\) barrier for calibration error. Building on this result, we present an efficient randomized forecaster that achieves an expected calibration error \(O(T^{2/3-\varepsilon})\) for some constant \(\varepsilon&gt;0\). Our forecaster combines the \textsc{SPR-Calibration} procedure \citep{dagan2024breaking} with an outer Blackwell-style correction layer. The \textsc{SPR-Calibration} procedure controls calibration with respect to a surrogate sequence of conditional-mean estimates, while the correction layer controls the additional error incurred when these surrogates are used to approximate the true outcomes. The analysis decomposes the total calibration error into the surrogate calibration error and the residual discrepancy between the surrogate sequence and the true outcomes. The former is bounded by the \textsc{SPR-Calibration} guarantee in \citet{dagan2024breaking}, and the latter is controlled using a quadratic potential argument together with the sparsity of the \textsc{SPR-Calibration} forecaster.

Authors: Zihan Zhang
Categories: cs.LG, cs.LG
