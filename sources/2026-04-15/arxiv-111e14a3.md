---
title: 'RePAIR: Interactive Machine Unlearning through Prompt-Aware Model Repair'
url: 'https://arxiv.org/abs/2604.12820v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jagadeesh Rachapudi
  - Pranav Singh
  - Ritali Vatsi
  - Praful Hambarde
  - Amit Shukla
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-04-14T14:44:45Z'
fetched_at: '2026-04-15T02:22:53.567Z'
---
Large language models (LLMs) inherently absorb harmful knowledge, misinformation, and personal data during pretraining on large-scale web corpora, with no native mechanism for selective removal. While machine unlearning offers a principled solution, existing approaches are provider-centric, requiring retraining pipelines, curated retain datasets, and direct intervention by model service providers (MSPs), thereby excluding end users from controlling their own data. We introduce Interactive Machine Unlearning (IMU), a new paradigm in which users can instruct LLMs to forget targeted knowledge through natural language at inference time. To realize IMU, we propose RePAIR, a prompt-aware model repair framework comprising (i) a watchdog model for unlearning intent detection, (ii) a surgeon model for generating repair procedures, and (iii) a patient model whose parameters are updated autonomously. At the core of RePAIR, we develop Steering Through Activation Manipulation with PseudoInverse (STAMP), a training-free, single-sample unlearning method that redirects MLP activations toward a refusal subspace via closed-form pseudoinverse updates. Its low-rank variant reduces computational complexity from O(d^3) to O(r^3 + r^2 * d), enabling efficient on-device unlearning with up to ~3x speedup over training-based baselines. Extensive experiments across harmful knowledge suppression, misinformation correction, and personal data erasure demonstrate that RePAIR achieves near-zero forget score

Authors: Jagadeesh Rachapudi, Pranav Singh, Ritali Vatsi, Praful Hambarde, Amit Shukla
Categories: cs.AI, cs.CL, cs.AI
