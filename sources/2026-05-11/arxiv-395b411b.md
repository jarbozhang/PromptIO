---
title: >-
  EmambaIR: Efficient Visual State Space Model for Event-guided Image
  Reconstruction
url: 'https://arxiv.org/abs/2605.08073v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wei Yu
  - Yunhang Qian
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-08T17:56:01Z'
fetched_at: '2026-05-11T08:20:12.070Z'
---
Recent event-based image reconstruction methods predominantly rely on Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs) to process complementary event information. However, these architectures face fundamental limitations: CNNs often fail to capture global feature correlations, whereas ViTs incur quadratic computational complexity (e.g., $O(n^2)$), hindering their application in high-resolution scenarios. To address these bottlenecks, we introduce EmambaIR, an Efficient visual State Space Model designed for image reconstruction using spatially sparse and temporally continuous event streams. Our framework introduces two key components: the cross-modal Top-k Sparse Attention Module (TSAM) and the Gated State-Space Module (GSSM). TSAM efficiently performs pixel-level top-k sparse attention to guide cross-modal interactions, yielding rich yet sparse fusion features. Subsequently, GSSM utilizes a nonlinear gated unit to enhance the temporal representation of vanilla linear-complexity ($O(n)$) SSMs, effectively capturing global contextual dependencies without the typical computational overhead. Extensive experiments on six datasets across three diverse image reconstruction tasks - motion deblurring, deraining, and High Dynamic Range (HDR) enhancement - demonstrate that EmambaIR significantly outperforms state-of-the-art methods while offering substantial reductions in memory consumption and computational cost. The source code and data are publicly available at: ht

Authors: Wei Yu, Yunhang Qian
Categories: cs.CV, cs.AI, cs.CV
