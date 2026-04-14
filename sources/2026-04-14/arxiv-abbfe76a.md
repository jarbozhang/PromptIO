---
title: >-
  Seeing is Believing: Robust Vision-Guided Cross-Modal Prompt Learning under
  Label Noise
url: 'https://arxiv.org/abs/2604.09532v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zibin Geng
  - Xuefeng Jiang
  - Jia Li
  - Zheng Li
  - Tian Wen
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-10T17:48:56Z'
fetched_at: '2026-04-14T00:33:19.759Z'
---
Prompt learning is a parameter-efficient approach for vision-language models, yet its robustness under label noise is less investigated. Visual content contains richer and more reliable semantic information, which remains more robust under label noise. However, the prompt itself is highly susceptible to label noise. Motivated by this intuition, we propose VisPrompt, a lightweight and robust vision-guided prompt learning framework for noisy-label settings. Specifically, we exploit a cross-modal attention mechanism to reversely inject visual semantics into prompt representations. This enables the prompt tokens to selectively aggregate visual information relevant to the current sample, thereby improving robustness by anchoring prompt learning to stable instance-level visual evidence and reducing the influence of noisy supervision. To address the instability caused by using the same way of injecting visual information for all samples, despite differences in the quality of their visual cues, we further introduce a lightweight conditional modulation mechanism to adaptively control the strength of visual information injection, which strikes a more robust balance between text-side semantic priors and image-side instance evidence. The proposed framework effectively suppresses the noise-induced disturbances, reduce instability in prompt updates, and alleviate memorization of mislabeled samples. VisPrompt significantly improves robustness while keeping the pretrained VLM backbone frozen

Authors: Zibin Geng, Xuefeng Jiang, Jia Li, Zheng Li, Tian Wen
Categories: cs.CV, cs.AI, cs.CV
