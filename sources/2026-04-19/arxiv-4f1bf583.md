---
title: >-
  From Tokens to Steps: Verification-Aware Speculative Decoding for Efficient
  Multi-Step Reasoning
url: 'https://arxiv.org/abs/2604.15244v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kiran Purohit
  - Ramasuri Narayanam
  - Soumyabrata Pal
categories:
  - cs.CL
  - cs.CL
published: '2026-04-16T17:20:13Z'
fetched_at: '2026-04-19T01:16:45.158Z'
---
Speculative decoding (SD) accelerates large language model inference by allowing a lightweight draft model to propose outputs that a stronger target model verifies. However, its token-centric nature allows erroneous steps to propagate. Prior approaches mitigate this using external reward models, but incur additional latency, computational overhead, and limit generalizability. We propose SpecGuard, a verification-aware speculative decoding framework that performs step-level verification using only model-internal signals. At each step, SpecGuard samples multiple draft candidates and selects the most consistent step, which is then validated using an ensemble of two lightweight model-internal signals: (i) an attention-based grounding score that measures attribution to the input and previously accepted steps, and (ii) a log-probability-based score that captures token-level confidence. These signals jointly determine whether a step is accepted or recomputed using the target, allocating compute selectively. Experiments across a range of reasoning benchmarks show that SpecGuard improves accuracy by 3.6% while reducing latency by ~11%, outperforming both SD and reward-guided SD.

Authors: Kiran Purohit, Ramasuri Narayanam, Soumyabrata Pal
Categories: cs.CL, cs.CL
