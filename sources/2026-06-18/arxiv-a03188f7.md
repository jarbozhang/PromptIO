---
title: >-
  The Chandra-Gaia Catalog of Counterparts: Resolving ambiguous Gaia matches to
  X-ray sources in the Chandra Source Catalog using Machine Learning
url: 'https://arxiv.org/abs/2606.19329v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - V. Samuel Pérez-Díaz
  - Vinay L. Kashyap
  - Joshua D. Ingram
  - David Fouhey
  - Juan Rafael Martínez-Galarza
categories:
  - astro-ph.IM
  - cs.LG
  - astro-ph.IM
published: '2026-06-17T17:54:52Z'
fetched_at: '2026-06-18T08:58:17.275Z'
---
We present a framework to cross-match sources from the Chandra Source Catalog (CSC v2.1) with optical sources from Gaia Data Release 3. Unlike purely spatial approaches, we use source properties such as magnitudes, colors, and distances to identify true counterparts, detect chance coincidences, and resolve ambiguities when multiple plausible candidates exist. We define a training set of high-confidence matches using NWAY, a Bayesian cross-matching framework that accounts for positional errors and source densities. We train a gradient-boosted classifier (LightGBM) on a variety of features from both catalogs. Of the ~$254$k unique X-ray sources, we find counterparts for ~$113$k sources, of which plausible multiple counterparts are found for ~$7$k. We find no counterparts for ~$20$k sources for which separation-based cross-matching does find a match, and attribute half of these to chance coincidences. We validate the pipeline on the Chandra Orion Ultradeep Project (COUP), where the machine-learning matches reproduce 95% of NWAY cross-matches without using any positional information. We release a catalog of the ~$113$k Chandra-Gaia counterparts, together with ~$7$k alternative matches and ~$20$k ambiguous NWAY associations, supporting future population studies of sources detectable by both Chandra and Gaia. We discuss limitations and provide a generalization of the framework that is applicable in other cross-matching scenarios.

Authors: V. Samuel Pérez-Díaz, Vinay L. Kashyap, Joshua D. Ingram, David Fouhey, Juan Rafael Martínez-Galarza
Categories: astro-ph.IM, cs.LG, astro-ph.IM
