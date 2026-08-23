---
title: >-
  PolicyGuard: From Organizational Policies to Neuro-SymbolicCompliance Review
  Engines
url: 'https://arxiv.org/abs/2606.32004v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sameer Malik
  - Ayush Singh
  - Amar Prakash Azad
categories:
  - cs.AI
  - cs.LG
  - cs.LO
  - cs.SC
  - cs.AI
published: '2026-06-30T17:37:57Z'
fetched_at: '2026-07-01T23:03:14.710Z'
---
Policy-grounded document review requires determining whether a target document complies with organization-specific policies, guidelines, or playbooks. While large language models can assist with policy interpretation and document analysis, end-to-end prompting leaves the applied policy logic implicit, making compliance decisions difficult to inspect, update, and test. We present PolicyGuard, a neuro-symbolic framework for policy-grounded document compliance review. PolicyGuard converts organizational policy guidance into an executable review engine consisting of typed relational logic rules and atom-level extraction questions. During review, LLMs answer these local questions using retrieved document evidence, and a symbolic evaluator applies the formal rules to detect non-compliance. We instantiate and evaluate PolicyGuard on company-specific NDA compliance review, where contract clauses must be checked against organization-specific negotiation policies. By separating policy formalization, local document interpretation, and symbolic compliance evaluation, PolicyGuard makes document review more explicit, maintainable, and systematically testable.

Authors: Sameer Malik, Ayush Singh, Amar Prakash Azad
Categories: cs.AI, cs.LG, cs.LO, cs.SC, cs.AI
