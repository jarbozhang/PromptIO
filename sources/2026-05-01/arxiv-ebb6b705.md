---
title: >-
  Explainable Load Forecasting with Covariate-Informed Time Series Foundation
  Models
url: 'https://arxiv.org/abs/2604.28149v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Matthias Hertel
  - Alexandra Nikoltchovska
  - Sebastian Pütz
  - Ralf Mikut
  - Benjamin Schäfer
categories:
  - cs.LG
  - cs.LG
published: '2026-04-30T17:36:24Z'
fetched_at: '2026-05-01T02:24:44.543Z'
---
Time Series Foundation Models (TSFMs) have recently emerged as general-purpose forecasting models and show considerable potential for applications in energy systems. However, applications in critical infrastructure like power grids require transparency to ensure trust and reliability and cannot rely on pure black-box models. To enhance the transparency of TSFMs, we propose an efficient algorithm for computing Shapley Additive Explanations (SHAP) tailored to these models. The proposed approach leverages the flexibility of TSFMs with respect to input context length and provided covariates. This property enables efficient temporal and covariate masking (selectively withholding inputs), allowing for a scalable explanation of model predictions using SHAP. We evaluate two TSFMs - Chronos-2 and TabPFN-TS - on a day-ahead load forecasting task for a transmission system operator (TSO). In a zero-shot setting, both models achieve predictive performance competitive with a Transformer model trained specifically on multiple years of TSO data. The explanations obtained through our proposed approach align with established domain knowledge, particularly as the TSFMs appropriately use weather and calendar information for load prediction. Overall, we demonstrate that TSFMs can serve as transparent and reliable tools for operational energy forecasting.

Authors: Matthias Hertel, Alexandra Nikoltchovska, Sebastian Pütz, Ralf Mikut, Benjamin Schäfer
Categories: cs.LG, cs.LG
