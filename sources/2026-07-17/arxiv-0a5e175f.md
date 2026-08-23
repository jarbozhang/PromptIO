---
title: 'MetaPerch: Learning from metadata for bioacoustics foundation models'
url: 'https://arxiv.org/abs/2607.14072v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mustafa Chasmai
  - Vincent Dumoulin
  - Jenny Hamer
categories:
  - cs.LG
  - cs.SD
  - cs.LG
published: '2026-07-15T17:42:41Z'
fetched_at: '2026-07-16T23:02:09.819Z'
---
Bioacoustic foundation models rely on large-scale citizen science platforms like Xeno-Canto for geographically and ecologically diverse data. Recent work has shown that supervision alone can produce SotA species detection models when trained on this large-scale data -- however, there remains unutilized potential in the form of recording metadata readily available within these community-driven data hubs. In this work, we explore the use of metadata -- such as location and time -- as auxiliary supervision signals, allowing the model to leverage species-metadata correlations in its learned representation. Auxiliary metadata losses provide additional information beyond vocalizations alone that can encourage a richer, more robust representation that generalizes better to species distribution and acoustic domain shifts -- important challenges for deployment in real-world passive acoustic monitoring (PAM) settings. We introduce MetaPerch, a new foundation model that achieves strong species identification performance across multiple challenging domains and present an extensive empirical study of the effects of 9 diverse metadata sources on 17 bioacoustic datasets.

Authors: Mustafa Chasmai, Vincent Dumoulin, Jenny Hamer
Categories: cs.LG, cs.SD, cs.LG
