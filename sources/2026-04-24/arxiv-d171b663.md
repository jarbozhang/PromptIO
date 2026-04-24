---
title: >-
  Revealing Geography-Driven Signals in Zone-Level Claim Frequency Models: An
  Empirical Study using Environmental and Visual Predictors
url: 'https://arxiv.org/abs/2604.21893v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sherly Alfonso-Sánchez
  - Cristián Bravo
  - Kristina G. Stankova
categories:
  - stat.ML
  - cs.LG
  - q-fin.RM
  - stat.ML
published: '2026-04-23T17:44:52Z'
fetched_at: '2026-04-24T03:00:18.075Z'
---
Geographic context is often consider relevant to motor insurance risk, yet public actuarial datasets provide limited location identifiers, constraining how this information can be incorporated and evaluated in claim-frequency models. This study examines how geographic information from alternative data sources can be incorporated into actuarial models for Motor Third Party Liability (MTPL) claim prediction under such constraints. Using the BeMTPL97 dataset, we adopt a zone-level modeling framework and evaluate predictive performance on unseen postcodes. Geographic information is introduced through two channels: environmental indicators from OpenStreetMap and CORINE Land Cover, and orthoimagery released by the Belgian National Geographic Institute for academic use. We evaluate the predictive contribution of coordinates, environmental features, and image embeddings across three baseline models: generalized linear models (GLMs), regularized GLMs, and gradient-boosted trees, while raw imagery is modeled using convolutional neural networks. Our results show that augmenting actuarial variables with constructed geographic information improves accuracy. Across experiments, both linear and tree-based models benefit most from combining coordinates with environmental features extracted at 5 km scale, while smaller neighborhoods also improve baseline specifications. Generally, image embeddings do not improve performance when environmental features are available; however, when such feature

Authors: Sherly Alfonso-Sánchez, Cristián Bravo, Kristina G. Stankova
Categories: stat.ML, cs.LG, q-fin.RM, stat.ML
