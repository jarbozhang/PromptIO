---
title: 'Decoding-Level Taboo: A Diagnostic Stress Test for LLM Robustness'
url: 'https://arxiv.org/abs/2608.09900v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tadanobu Chuyo Kamijo
  - Ori Rottenstreich
  - Javier Conde
  - Gonzalo Martínez
  - Pedro Reviriego
categories:
  - cs.CL
  - cs.CL
published: '2026-08-10T17:47:24Z'
fetched_at: '2026-08-11T11:02:16.307Z'
---
Large language model evaluations typically focus on performance under nominal conditions, creating an illusion of capability where models comfortably walk a narrow, highly optimized generation corridor. In real-world deployments, however, complex system prompts, safety guardrails, and structural constraints continuously force models off this nominal path, driving a divergence between benchmark scores and deployment performance. To address this issue, we introduce Decoding-Level Taboo, a zero-prompt diagnostic stress test that intervenes directly in logit space at runtime, forcing models out of their nominal paths. By dynamically masking primary candidate tokens at word boundaries, Taboo forces machine circumlocution. Evaluating Taboo across several open-weight model families reveals that off-path robustness is heavily influenced by both parameter scale and post-training instruction alignment, with robustness generally improving with model size and alignment. Beyond the results presented in this paper, Taboo provides a novel primitive for generating diverse synthetic datasets, stress-testing runtime safety guardrails, and auditing model reliability prior to real-world deployment.

Authors: Tadanobu Chuyo Kamijo, Ori Rottenstreich, Javier Conde, Gonzalo Martínez, Pedro Reviriego
Categories: cs.CL, cs.CL
