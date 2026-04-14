---
title: >-
  Case-Grounded Evidence Verification: A Framework for Constructing
  Evidence-Sensitive Supervision
url: 'https://arxiv.org/abs/2604.09537v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Soroosh Tayebi Arasteh
  - Mehdi Joodaki
  - Mahshad Lotfinia
  - Sven Nebelung
  - Daniel Truhn
categories:
  - cs.CL
  - cs.AI
  - cs.IR
  - cs.LG
  - cs.CL
published: '2026-04-10T17:55:38Z'
fetched_at: '2026-04-14T00:33:19.758Z'
---
Evidence-grounded reasoning requires more than attaching retrieved text to a prediction: a model should make decisions that depend on whether the provided evidence supports the target claim. In practice, this often fails because supervision is weak, evidence is only loosely tied to the claim, and evaluation does not test evidence dependence directly. We introduce case-grounded evidence verification, a general framework in which a model receives a local case context, external evidence, and a structured claim, and must decide whether the evidence supports the claim for that case. Our key contribution is a supervision construction procedure that generates explicit support examples together with semantically controlled non-support examples, including counterfactual wrong-state and topic-related negatives, without manual evidence annotation. We instantiate the framework in radiology and train a standard verifier on the resulting support task. The learned verifier substantially outperforms both case-only and evidence-only baselines, remains strong under correct evidence, and collapses when evidence is removed or swapped, indicating genuine evidence dependence. This behavior transfers across unseen evidence articles and an external case distribution, though performance degrades under evidence-source shift and remains sensitive to backbone choice. Overall, the results suggest that a major bottleneck in evidence grounding is not only model capacity, but the lack of supervision that en

Authors: Soroosh Tayebi Arasteh, Mehdi Joodaki, Mahshad Lotfinia, Sven Nebelung, Daniel Truhn
Categories: cs.CL, cs.AI, cs.IR, cs.LG, cs.CL
