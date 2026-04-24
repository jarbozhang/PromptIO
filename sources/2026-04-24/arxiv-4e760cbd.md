---
title: Addressing Image Authenticity When Cameras Use Generative AI
url: 'https://arxiv.org/abs/2604.21879v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Umar Masud
  - Abhijith Punnappurath
  - Luxi Zhao
  - David B. Lindell
  - Michael S. Brown
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-23T17:22:51Z'
fetched_at: '2026-04-24T03:00:18.079Z'
---
The ability of generative AI (GenAI) methods to photorealistically alter camera images has raised awareness about the authenticity of images shared online. Interestingly, images captured directly by our cameras are considered authentic and faithful. However, with the increasing integration of deep-learning modules into cameras' capture-time hardware -- namely, the image signal processor (ISP) -- there is now a potential for hallucinated content in images directly output by our cameras. Hallucinated capture-time image content is typically benign, such as enhanced edges or texture, but in certain operations, such as AI-based digital zoom or low-light image enhancement, hallucinations can potentially alter the semantics and interpretation of the image content. As a result, users may not realize that the content in their camera images is not authentic. This paper addresses this issue by enabling users to recover the 'unhallucinated' version of the camera image to avoid misinterpretation of the image content. Our approach works by optimizing an image-specific multi-layer perceptron (MLP) decoder together with a modality-specific encoder so that, given the camera image, we can recover the image before hallucinated content was added. The encoder and MLP are self-contained and can be applied post-capture to the image without requiring access to the camera ISP. Moreover, the encoder and MLP decoder require only 180 KB of storage and can be readily saved as metadata within standard ima

Authors: Umar Masud, Abhijith Punnappurath, Luxi Zhao, David B. Lindell, Michael S. Brown
Categories: cs.CV, cs.AI, cs.CV
