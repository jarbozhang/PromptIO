---
title: Decision-Aware Training for Sample-Based Generative Models
url: 'https://arxiv.org/abs/2607.01171v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kornelius Raeth
  - Nicole Ludwig
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-07-01T17:02:23Z'
fetched_at: '2026-07-02T23:01:57.297Z'
---
Sample-based generative models are increasingly used for probabilistic forecasting in high-stakes decision settings, yet their training objectives are blind to the decision maker's cost structure. These models are commonly trained with strictly proper scoring rules, such as the energy score, which allocate their training signal in proportion to data density, with no awareness of where forecast errors are most costly for downstream decisions. We therefore propose decision-aware training for sample-based generative models, augmenting the energy score objective with a differentiable decision loss that directly penalises the cost incurred by acting on the model's forecast. This combined loss is theoretically grounded, as the decision loss is itself a proper scoring rule. We validate our method on one synthetic and two real-world tasks, showing targeted improvements in cost-sensitive regions while retaining full probabilistic forecasts.

Authors: Kornelius Raeth, Nicole Ludwig
Categories: cs.LG, stat.ML, cs.LG
