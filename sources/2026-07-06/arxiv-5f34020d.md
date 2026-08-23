---
title: >-
  Towards Robustness against Typographic Attack with Training-free Concept
  Localization
url: 'https://arxiv.org/abs/2607.02494v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Bohan Liu
  - Wenqian Ye
  - Guangzhi Xiong
  - Zhenghao He
  - Sanchit Sinha
categories:
  - cs.CV
  - cs.CL
  - cs.CV
published: '2026-07-02T17:55:24Z'
fetched_at: '2026-07-05T23:02:48.000Z'
---
Models trained via Contrastive Language-Image Pretraining (CLIP) serve as the foundational vision encoders for most modern Large Vision Language Models (LVLMs). Despite their widespread adoption, CLIP models exhibit a critical yet underexplored failure mode: irrelevant text appearing within images confounds visual representations, biasing them toward lexical meaning rather than true visual semantics. This robustness issue, commonly described as a Typographic Attack (TA), exposes a vulnerability that poses a significant risk to safety-critical applications such as autonomous driving. To achieve interpretable and effective robustness against TA, we propose a novel, training-free mechanistic interpretability method. Our method provides sampling-based interpretations of hidden state representations and quantitatively attributes semantic versus lexical focus to individual attention heads. Through probabilistic analysis and circuit mining, we isolate specific Vision Transformer (ViT) components that disproportionately encode lexical information, thereby identifying the mechanistic source of TA. We further show that simple interventions applied directly to the identified circuits, without any additional training, can substantially improve robustness against Typographic Attacks in object classification. These interventions, such as selective adjustment of attention weights, also outperform both supervised and training-free defense methods. Our experiments demonstrate that applying th

Authors: Bohan Liu, Wenqian Ye, Guangzhi Xiong, Zhenghao He, Sanchit Sinha
Categories: cs.CV, cs.CL, cs.CV
