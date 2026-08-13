---
title: >-
  Calibration Bets on the Past: Post-Training Quantization for Financial
  Time-Series Forecasting
url: 'https://arxiv.org/abs/2608.12259v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Junyi Ye
  - Ivy Gateri Wanjiku
categories:
  - cs.LG
  - q-fin.ST
  - cs.LG
published: '2026-08-12T17:02:06Z'
fetched_at: '2026-08-13T11:03:17.821Z'
---
Financial forecasting models are typically developed in full precision, yet production deployment often requires low-precision inference to reduce memory and computational cost. Post-training quantization (PTQ) enables such deployment without retraining. However, reliable activation quantization requires calibration: activation ranges are estimated from historical data before deployment and then remain fixed during future inference. The importance of this deployment choice for financial forecasting remains poorly understood. We present a systematic study of activation calibration for PTQ in cross-sectional volatility forecasting on the S&amp;P 500. Our evaluation covers seven representative neural architectures, eight walk-forward test years (2018-2025), and 560 trained models. We find that activation calibration has little effect at 8 bits but becomes the primary determinant of predictive performance at 4 bits. Under default absolute-maximum (abs-max) calibration, static 4-bit quantization of both weights and activations removes 11-62% of the full-precision mean information coefficient in affected architectures. Replacing abs-max with percentile calibration recovers 53-94% of this degradation in the four most affected architectures. The preferred activation range also varies across market periods. Narrow ranges improve resolution under typical market conditions but lose part of their advantage when test-period market dispersion exceeds the calibration history. These findings

Authors: Junyi Ye, Ivy Gateri Wanjiku
Categories: cs.LG, q-fin.ST, cs.LG
