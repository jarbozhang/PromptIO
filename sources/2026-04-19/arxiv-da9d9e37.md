---
title: Benchmarking Optimizers for MLPs in Tabular Deep Learning
url: 'https://arxiv.org/abs/2604.15297v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yury Gorishniy
  - Ivan Rubachev
  - Dmitrii Feoktistov
  - Artem Babenko
categories:
  - cs.LG
  - cs.LG
published: '2026-04-16T17:57:02Z'
fetched_at: '2026-04-19T01:16:45.153Z'
---
MLP is a heavily used backbone in modern deep learning (DL) architectures for supervised learning on tabular data, and AdamW is the go-to optimizer used to train tabular DL models. Unlike architecture design, however, the choice of optimizer for tabular DL has not been examined systematically, despite new optimizers showing promise in other domains. To fill this gap, we benchmark \Noptimizers optimizers on \Ndatasets tabular datasets for training MLP-based models in the standard supervised learning setting under a shared experiment protocol. Our main finding is that the Muon optimizer consistently outperforms AdamW, and thus should be considered a strong and practical choice for practitioners and researchers, if the associated training efficiency overhead is affordable. Additionally, we find exponential moving average of model weights to be a simple yet effective technique that improves AdamW on vanilla MLPs, though its effect is less consistent across model variants.

Authors: Yury Gorishniy, Ivan Rubachev, Dmitrii Feoktistov, Artem Babenko
Categories: cs.LG, cs.LG
