---
title: Integrated electro-optic attention nonlinearities for transformers
url: 'https://arxiv.org/abs/2604.09512v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Luis Mickeler
  - Kai Lion
  - Alfonso Nardi
  - Jost Kellner
  - Pierre Didier
categories:
  - cs.LG
  - physics.optics
  - cs.LG
published: '2026-04-10T17:30:51Z'
fetched_at: '2026-04-13T08:33:54.775Z'
---
Transformers have emerged as the dominant neural-network architecture, achieving state-of-the-art performance in language processing and computer vision. At the core of these models lies the attention mechanism, which requires a nonlinear, non-negative mapping using the Softmax function. However, although Softmax operations account for less than 1% of the total operation count, they can disproportionately bottleneck overall inference latency. Here, we use thin-film lithium niobate (TFLN) Mach-Zehnder modulators (MZMs) as analog nonlinear computational elements to drastically reduce the latency of nonlinear computations. We implement electro-optic alternatives to digital Softmax and Sigmoid, and evaluate their performance in Vision Transformers and Large Language Models. Our system maintains highly competitive accuracy, even under aggressive 4-bit input-output quantization of the analog units. We further characterize system noise at encoding speeds up to 10 GBaud and assess model robustness under various noise conditions. Our findings suggest that TFLN modulators can serve as nonlinear function units within hybrid co-packaged hardware, enabling high-speed and energy-efficient nonlinear computation.

Authors: Luis Mickeler, Kai Lion, Alfonso Nardi, Jost Kellner, Pierre Didier
Categories: cs.LG, physics.optics, cs.LG
