---
title: >-
  Shift Aware Transfer Learning with Adaptive Dual-Encoder Fusion for PM
  Forecasting in Data-Limited Environments
url: 'https://arxiv.org/abs/2608.14456v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shahab Band
  - Hamed Mohammadi
categories:
  - cs.AI
  - cs.AI
published: '2026-08-14T16:41:16Z'
fetched_at: '2026-08-17T11:03:44.075Z'
---
Short-horizon forecasting of fine particulate matter (PM2.5) remains difficult when observations from the target domain are limited and the statistical properties of the source and target domains differ. In these settings, models trained only on local data may not capture complex temporal dynamics, while direct transfer learning can result in negative transfer. This study develops a shift-aware dual-encoder transfer framework that combines source-domain knowledge with target-specific representation learning. The source encoder was pretrained using hourly observations from 10 U.S. monitoring locations. The framework was then adapted and evaluated using two years of hourly observations from 77 stations in Taiwan under a chronological train-validation-test protocol. Among the four principal baselines, the frozen-source dual-encoder model achieved the best performance, with MSE = 21.8960, MAE = 3.1597, and R^2 = 0.8725. This corresponds to an MSE reduction of approximately 7.1% relative to TL-v1 and 4.1% relative to TL-v2. The ablation analysis showed that removing the Taiwan-specific branch caused the largest decline in performance. Allowing the source encoder to adapt produced the best overall result, with MSE = 21.6575, MAE = 3.1383, and R^2 = 0.8739. SHAP analysis indicated that predictions were driven mainly by recent PM2.5 observations and meteorological variables related to pollutant transport and dispersion. These results suggest that source-domain knowledge is most effec

Authors: Shahab Band, Hamed Mohammadi
Categories: cs.AI, cs.AI
