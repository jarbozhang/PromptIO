---
title: >-
  Graph Neural ODE Digital Twins for Control-Oriented Reactor Thermal-Hydraulic
  Forecasting Under Partial Observability
url: 'https://arxiv.org/abs/2604.07292v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Akzhol Almukhametov
  - Doyeong Lim
  - Rui Hu
  - Yang Liu
categories:
  - cs.LG
  - cs.LG
published: '2026-04-08T16:58:14Z'
fetched_at: '2026-04-10T00:43:39.932Z'
---
Real-time supervisory control of advanced reactors requires accurate forecasting of plant-wide thermal-hydraulic states, including locations where physical sensors are unavailable. Meeting this need calls for surrogate models that combine predictive fidelity, millisecond-scale inference, and robustness to partial observability. In this work, we present a physics-informed message-passing Graph Neural Network coupled with a Neural Ordinary Differential Equation (GNN-ODE) to addresses all three requirements simultaneously. We represent the whole system as a directed sensor graph whose edges encode hydraulic connectivity through flow/heat transfer-aware message passing, and we advance the latent dynamics in continuous time via a controlled Neural ODE. A topology-guided missing-node initializer reconstructs uninstrumented states at rollout start; prediction then proceeds fully autoregressively. The GNN-ODE surrogate achieves satisfactory results for the system dynamics prediction. On held-out simulation transients, the surrogate achieves an average MAE of 0.91 K at 60 s and 2.18 K at 300 s for uninstrumented nodes, with $R^2$ up to 0.995 for missing-node state reconstruction. Inference runs at approximately 105 times faster than simulated time on a single GPU, enabling 64-member ensemble rollouts for uncertainty quantification. To assess sim-to-real transfer, we adapt the pretrained surrogate to experimental facility data using layerwise discriminative fine-tuning with only 30 tra

Authors: Akzhol Almukhametov, Doyeong Lim, Rui Hu, Yang Liu
Categories: cs.LG, cs.LG
