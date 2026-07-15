---
title: >-
  Form, Not Content? A Preregistered, Placebo-Controlled Evaluation of Learned
  Error-Conditioned Self-Repair Through Prompts and Weights in Frozen Small Code
  Models
url: 'https://arxiv.org/abs/2607.12962v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mehmet Iscan
categories:
  - cs.SE
  - cs.AI
  - cs.LG
  - cs.SE
published: '2026-07-14T16:59:42Z'
fetched_at: '2026-07-15T23:03:05.477Z'
---
Frozen small code LLMs are deployed locally, yet the information guiding a retry after a failed attempt is still measured without placebo controls in the self-repair literature. We treat a failed program as a conjecture and an execution counterexample as an oracle-relative refutation, and introduce PoPE (Popperian Placebo-controlled Evaluation): a methodology for measuring whether evidence that falsifies LLM-generated code can be used operationally by that same model. In PoPE, error content is paired with channel-specific placebos that keep the predeclared scaffold while ablating task-relevant content or deranging the task-error assignment. Frozen small code models (0.5-1.5B) are evaluated under preregistered rules through a prompt channel and a weight channel (small-data adapter training), with four generations per arm-unit pair. In the prompt channel, public-tier screening unlocked 12 units under the content-ablated form placebo versus 10 under the live error-pattern arm on a 40-unit resistant band; the result was recorded as mechanism-null. In the weight channel, an 8-8 tie was observed between the error-content adapter and the intervention-free baseline (p=1.0), while the SHA-deranged placebo adapter stayed ahead with 10 unlocks; content-attributable superiority was not confirmed. These results do not constitute evidence of equivalence or non-inferiority. Equivalence was not tested separately. Findings are restricted to the public-tier screening endpoint; hidden-tier conf

Authors: Mehmet Iscan
Categories: cs.SE, cs.AI, cs.LG, cs.SE
