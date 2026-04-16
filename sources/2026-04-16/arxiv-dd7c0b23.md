---
title: Momentum Further Constrains Sharpness at the Edge of Stochastic Stability
url: 'https://arxiv.org/abs/2604.14108v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arseniy Andreyev
  - Advikar Ananthkumar
  - Marc Walden
  - Tomaso Poggio
  - Pierfrancesco Beneventano
categories:
  - cs.LG
  - math.DS
  - math.OC
  - stat.ML
  - cs.LG
published: '2026-04-15T17:28:46Z'
fetched_at: '2026-04-16T06:07:35.555Z'
---
Recent work suggests that (stochastic) gradient descent self-organizes near an instability boundary, shaping both optimization and the solutions found. Momentum and mini-batch gradients are widely used in practical deep learning optimization, but it remains unclear whether they operate in a comparable regime of instability. We demonstrate that SGD with momentum exhibits an Edge of Stochastic Stability (EoSS)-like regime with batch-size-dependent behavior that cannot be explained by a single momentum-adjusted stability threshold. Batch Sharpness (the expected directional mini-batch curvature) stabilizes in two distinct regimes: at small batch sizes it converges to a lower plateau $2(1-β)/η$, reflecting amplification of stochastic fluctuations by momentum and favoring flatter regions than vanilla SGD; at large batch sizes it converges to a higher plateau $2(1+β)/η$, where momentum recovers its classical stabilizing effect and favors sharper regions consistent with full-batch dynamics. We further show that this aligns with linear stability thresholds and discuss the implications for hyperparameter tuning and coupling.

Authors: Arseniy Andreyev, Advikar Ananthkumar, Marc Walden, Tomaso Poggio, Pierfrancesco Beneventano
Categories: cs.LG, math.DS, math.OC, stat.ML, cs.LG
