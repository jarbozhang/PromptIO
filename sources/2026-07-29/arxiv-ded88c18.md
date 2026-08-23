---
title: >-
  CHARM: A Multimodal Graph Foundation Model with Hierarchical Context Modeling
  for Zero-Shot Transfer
url: 'https://arxiv.org/abs/2607.26023v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ankang Yang
  - Jitao Zhao
  - Di Jin
  - Yuxiao Huang
  - Dongxiao He
categories:
  - cs.AI
  - cs.AI
published: '2026-07-28T17:35:26Z'
fetched_at: '2026-07-29T11:02:31.057Z'
---
Graph foundation models (GFMs) have emerged as a promising paradigm for transferring knowledge across graph domains and tasks. Real-world graphs associate nodes with text, images, and other modalities, making multimodal graphs essential for representing complex entities and relations. Moreover, collecting labels and adapting models for every new graph domain is costly and often infeasible, motivating zero-shot transfer. Unfortunately, zero-shot transfer on multimodal graphs remains underexplored. Existing GNN-based graph foundation models typically require downstream adaptation, whereas LLM-based graph methods mainly address unimodal graphs or tasks within a single domain. This setting presents two key challenges. First, models must generalize knowledge from individual modalities while capturing transferable cross-modal relations. Second, without target-domain fine-tuning, node representations remain entangled with domain-specific structures and modality-specific characteristics, obscuring shared concepts in unseen domains. To address these challenges, we propose CHARM, a multimodal graph foundation model with hierarchical context modeling for zero-shot transfer. CHARM replaces isolated raw nodes with hierarchical graph contexts that capture multimodal semantics and cross-modal relations. These contexts map domain-specific node patterns to shared high-level concepts, reducing reliance on target-domain supervision or adaptation. A modality-aware graph context encoder integrate

Authors: Ankang Yang, Jitao Zhao, Di Jin, Yuxiao Huang, Dongxiao He
Categories: cs.AI, cs.AI
