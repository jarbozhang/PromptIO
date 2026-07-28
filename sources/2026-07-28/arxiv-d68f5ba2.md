---
title: >-
  Beyond Scale and Generation: Understanding Language Model-based Entity
  Matching
url: 'https://arxiv.org/abs/2607.24688v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zeyu Zhang
  - Xue Li
  - Iacer Calixto
  - Paul Groth
  - Sebastian Schelter
categories:
  - cs.DB
  - cs.CL
  - cs.LG
  - cs.DB
published: '2026-07-27T17:29:18Z'
fetched_at: '2026-07-28T11:02:16.572Z'
---
Entity matching identifies records that refer to the same real-world entity. Language models can be adapted to this task through bi-encoder, cross-encoder, and generative matcher architectures. However, prior studies often conflate matcher architecture with differences in model backbone, model variant(reflecting different pretraining objectives), and model size, making it difficult to isolate the sources of performance gains. We address this issue through a controlled factorial study spanning three matcher architectures, three model variants and three model sizes from the Qwen3 family, and nine datasets, totaling 1,215 fine-tuning runs. We also evaluate cross-dataset transferability and computational cost. Our results show that model variant is critical for bi-encoders: embedding-oriented variants provide stronger initialization and more favorable representation geometry predictive of downstream matching performance. Cross-encoders retain a consistent advantage over bi-encoders because they jointly encode record pairs rather than representing each record independently, although larger models partially narrow this gap. Generative matchers do not universally outperform cross-encoders. Instead, their advantages concentrate under distribution shift, including subtle unseen differences in record schemas and cross-dataset transfer. We further find that larger models rely more heavily on shortcut learning and therefore do not necessarily perform better. These findings clarify the fa

Authors: Zeyu Zhang, Xue Li, Iacer Calixto, Paul Groth, Sebastian Schelter
Categories: cs.DB, cs.CL, cs.LG, cs.DB
