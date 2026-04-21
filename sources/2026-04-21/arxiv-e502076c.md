---
title: >-
  Joint-Centric Dual Contrastive Alignment with Structure-Preserving and
  Information-Balanced Regularization
url: 'https://arxiv.org/abs/2604.16247v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Habibeh Naderi
  - Behrouz Haji Soleimani
  - Stan Matwin
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-17T17:07:35Z'
fetched_at: '2026-04-21T00:54:57.877Z'
---
We propose HILBERT (HIerarchical Long-sequence Balanced Embedding with Reciprocal contrastive Training), a cross-attentive multimodal framework for learning document-level audio-text representations from long, segmented sequences in low-resource data settings. HILBERT leverages frozen pre-trained speech and language encoders to extract segment-level features, which are aggregated via cross-modal attention and self-attentive pooling to form modality-specific document representations and a joint cross-attentive embedding. To align modalities while preserving modality-specific structure under severe audio-text dimensional imbalance, we introduce a reciprocal dual contrastive objective that simultaneously aligns audio-to-joint and text-to-joint representations, rather than directly contrasting audio and text alone. Two auxiliary regularizers further stabilize long-sequence fusion: a Centered Kernel Alignment (CKA) loss that preserves structural consistency between each modality and the joint embedding, and a mutual information balancing loss that prevents dominance of a single modality by equalizing information flow from audio and text into the joint space. For downstream prediction, HILBERT employs a Mixture-of-Experts (MoE) classifier over concatenated audio, text, and joint representations to accommodate heterogeneous label regimes. Extensive evaluation across multiple audio-text backbone combinations demonstrates that HILBERT learns semantically meaningful long-sequence repre

Authors: Habibeh Naderi, Behrouz Haji Soleimani, Stan Matwin
Categories: cs.LG, cs.AI, cs.LG
