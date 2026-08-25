---
title: Interpretable AI with Local Distillation
url: 'https://arxiv.org/abs/2608.23538v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Erin Craig
  - Yiling Huang
  - Snigdha Panigrahi
categories:
  - stat.ME
  - cs.LG
  - stat.ML
  - stat.ME
published: '2026-08-24T17:43:07Z'
fetched_at: '2026-08-25T11:02:03.411Z'
---
Modern AI models such as tabular foundation models and gradient-boosted ensembles can outpredict classical methods, but provide little basis for reasoning about their predictions. High-stakes decisions call for models that are both accurate and interpretable as built. Local linear modeling offers a path forward: a smooth regression function is locally well approximated by a linear one, allowing a linear fit near each query point to achieve high accuracy without sacrificing transparency. The challenges lie in learning what is "local" and developing statistical tools for interpretation. Here, we propose local distillation, in which a black-box "teacher" guides a regularized linear "student" model at each query point. The teacher (1) defines locality by upweighting training observations with similar predicted outcomes, and (2) anchors the fit with its prediction at the query point, included as a pseudo-observation whose weight is estimated from the data. For interpretation, we add a small amount of Gaussian randomization to the local objective and use refits to assess stability: selection frequencies identify reliable features at a query point, and clustering the randomized fits identifies stable subgroups across the data. Under the lasso penalty, we prove that this randomization yields feature-selection probabilities that are stable under small perturbations of the training responses. Across 17 benchmark datasets, local distillation nearly matches its AI teacher's accuracy whil

Authors: Erin Craig, Yiling Huang, Snigdha Panigrahi
Categories: stat.ME, cs.LG, stat.ML, stat.ME
