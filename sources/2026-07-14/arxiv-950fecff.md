---
title: 'Lean-QIT: Towards a Formal Infrastructure for Quantum Information Theory'
url: 'https://arxiv.org/abs/2607.09632v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Chengkai Zhu
  - Ziao Tang
  - Guocheng Zhen
  - Yimeng Cao
  - Yusheng Zhao
categories:
  - quant-ph
  - cs.AI
  - quant-ph
published: '2026-07-10T17:28:26Z'
fetched_at: '2026-07-13T23:03:29.909Z'
---
Quantum information theory (QIT) characterizes the capabilities and fundamental limits of quantum information processing, underpinning quantum communication, computation, and error correction. Formalizing its coding theorems requires connecting finite-block protocols, analytic inequalities, and asymptotic limits within a unified machine-checked framework. Existing developments, however, lack a reusable operational layer that defines codes, error criteria, achievable rates, and capacities independently of their information-theoretic characterizations. In this work, we present LeanQIT, a Lean 4 library for finite-dimensional QIT. It provides composable, kernel-checked interfaces for quantum states and channels, source and channel codes, finite-block performance criteria, hypothesis testing, one-shot quantities, and asymptotic rate constructions. Using this infrastructure, we formalize Schumacher's quantum source-coding theorem, the Holevo--Schumacher--Westmoreland classical-capacity theorem, and the entanglement-assisted classical-capacity theorem together with its strong converse. By separating operational definitions from analytic characterizations and exposing reusable achievability, converse, and asymptotic components, Lean-QIT provides a machine-readable foundation for formal QIT and a compositional knowledge substrate for emerging AI-assisted formalization, automated proof search, and agentic reasoning in quantum information and computation.

Authors: Chengkai Zhu, Ziao Tang, Guocheng Zhen, Yimeng Cao, Yusheng Zhao
Categories: quant-ph, cs.AI, quant-ph
