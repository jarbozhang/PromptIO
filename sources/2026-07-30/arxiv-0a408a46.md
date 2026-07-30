---
title: >-
  Skillful forecasting of offshore winds from satellite scatterometer
  constellations
url: 'https://arxiv.org/abs/2607.27152v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Francesco Pinto
  - Luca Lanzilao
  - Paco Lopez Dekker
  - Angela Meyer
categories:
  - cs.LG
  - cs.LG
published: '2026-07-29T17:31:20Z'
fetched_at: '2026-07-30T11:02:59.253Z'
---
Accurate intraday forecasts of offshore wind are becoming increasingly important for power system operation and the integration of growing shares of offshore wind energy. Operational forecasts rely predominantly on numerical weather prediction (NWP), which is not optimized for lead times of minutes to hours, where initial-condition accuracy dominates forecast skill. Although satellite scatterometer observations are routinely assimilated into NWP, they have not previously been used directly for forecasting. Here we present WindCastNet, the first satellite-based nowcasting framework for offshore wind speed and direction, introducing a new paradigm for intraday forecasting that learns from spatiotemporally irregular satellite observations. WindCastNet predicts offshore wind fields from observations acquired by satellite scatterometer constellations. WindCastNet employs a partial convolutional long short-term memory network that exploits microwave radar observations from the European, Chinese, and Indian scatterometers despite their irregular spatial coverage, asynchronous sampling, and variable revisit times. Spatial observation masks and inter-observation intervals are encoded, while a continuous temporal representation enables forecasts at arbitrary lead times. Evaluated over the North Sea, WindCastNet reduces the root-mean-square error by 23% and 7% relative to the HARMONIE MEPS model at lead times of 1 and 2 h, respectively, and outperforms persistence by 9-15% during the fi

Authors: Francesco Pinto, Luca Lanzilao, Paco Lopez Dekker, Angela Meyer
Categories: cs.LG, cs.LG
