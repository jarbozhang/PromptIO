---
title: Test-Time Training for Modality Order Consistency in Vision-Language Models
url: 'https://arxiv.org/abs/2607.20351v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aditi Gupta
  - Yossi Gandelsman
categories:
  - cs.CV
  - cs.CL
  - cs.CV
published: '2026-07-22T16:37:02Z'
fetched_at: '2026-07-23T11:02:10.168Z'
---
We find that vision-language models are sensitive to a specific semantically irrelevant change: the order in which the image and question are presented. Across three models and three benchmarks, image first prompting consistently outperforms question-first prompting, revealing a repeatable modality order failure. We use this gap to design an order-consistent test-time training method. Our method substantially closes the modality-order gap across all evaluated settings. Surprisingly, it also yields consistent improvements in the stronger image-first branch over the baseline, hence bootstrapping both orderings toward mutual consistency. Activation patching localizes the ordering failure to a narrow mid-network region where representations diverge sharply between prompt orders. We find that the test-time training method repairs this misalignment across layers. Together, our results identify modality-order sensitivity as a circuit-level failure in VLMs and demonstrate that simple, asymmetric test-time adaptation can effectively mitigate it and even improve performance over the baseline.

Authors: Aditi Gupta, Yossi Gandelsman
Categories: cs.CV, cs.CL, cs.CV
