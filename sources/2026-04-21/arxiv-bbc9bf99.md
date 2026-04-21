---
title: >-
  Do Vision-Language Models Truly Perform Vision Reasoning? A Rigorous Study of
  the Modality Gap
url: 'https://arxiv.org/abs/2604.16256v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yige Xu
  - Yongjie Wang
  - Zizhuo Wu
  - Kaisong Song
  - Jun Lin
categories:
  - cs.CV
  - cs.CL
  - cs.CV
published: '2026-04-17T17:15:18Z'
fetched_at: '2026-04-21T00:54:57.876Z'
---
Reasoning in vision-language models (VLMs) has recently attracted significant attention due to its broad applicability across diverse downstream tasks. However, it remains unclear whether the superior performance of VLMs stems from genuine vision-grounded reasoning or relies predominantly on the reasoning capabilities of their textual backbones. To systematically measure this, we introduce CrossMath, a novel multimodal reasoning benchmark designed for controlled cross-modal comparisons. Specifically, we construct each problem in text-only, image-only, and image+text formats guaranteeing identical task-relevant information, verified by human annotators. This rigorous alignment effectively isolates modality-specific reasoning differences while eliminating confounding factors such as information mismatch. Extensive evaluation of state-of-the-art VLMs reveals a consistent phenomenon: a substantial performance gap between textual and visual reasoning. Notably, VLMs excel with text-only inputs, whereas incorporating visual data (image+text) frequently degrades performance compared to the text-only baseline. These findings indicate that current VLMs conduct reasoning primarily in the textual space, with limited genuine reliance on visual evidence. To mitigate this limitation, we curate a CrossMath training set for VLM fine-tuning. Empirical evaluations demonstrate that fine-tuning on this training set significantly boosts reasoning performance across all individual and joint modalit

Authors: Yige Xu, Yongjie Wang, Zizhuo Wu, Kaisong Song, Jun Lin
Categories: cs.CV, cs.CL, cs.CV
