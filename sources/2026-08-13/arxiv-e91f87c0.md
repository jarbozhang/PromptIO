---
title: >-
  Earth observation embeddings are effective sub-grid descriptors for
  probabilistic weather downscaling
url: 'https://arxiv.org/abs/2608.12271v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Pedro Sousa
  - Will Tebbutt
  - Sadiq Jaffer
  - Robin Young
  - Anil Madhavapeddy
categories:
  - cs.LG
  - physics.ao-ph
  - cs.LG
published: '2026-08-12T17:10:42Z'
fetched_at: '2026-08-13T11:03:17.821Z'
---
Global weather reanalyses and forecasts resolve the evolving atmospheric state on coarse grids, but site-specific applications require predictions at arbitrary locations where near-surface conditions also depend on unresolved terrain and land-surface properties. Existing probabilistic downscalers address this gap using hand-crafted topographic descriptors. We ask instead whether Earth observation foundation models can provide transferable sub-grid surface representations for probabilistic weather downscaling. We augment a convolutional conditional neural process that downscales coarse ERA5 reanalysis fields at ~25 km resolution with a learned local surface descriptor, obtained by compressing a patch of TESSERA embeddings at 10 m resolution. Although these embeddings summarise surface conditions over annual timescales, they improve downscaling of instantaneous 2 m temperature and 10 m wind speed by encoding persistent surface properties that capture a location's departure from the coarse-grid atmospheric state. Across five climatically diverse regions, the embedding improves point and probabilistic skill at stations held out in both space and time, overall improving CRPS skill by 11.5% for 2 m temperature and 6.2% for 10 m wind speed. We further analyse how its contribution differs by variable, finding that topography explains more of temperature's sub-grid structure, while TESSERA provides additional surface information for wind speed. These improvements persist when the coar

Authors: Pedro Sousa, Will Tebbutt, Sadiq Jaffer, Robin Young, Anil Madhavapeddy
Categories: cs.LG, physics.ao-ph, cs.LG
