---
title: 'Multi-LCB: Extending LiveCodeBench to Multiple Programming Languages'
url: 'https://arxiv.org/abs/2606.20517v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Maria Ivanova
  - Pavel Zadorozhny
  - Rodion Levichev
  - Ivan Petrov
  - Adamenko Pavel
categories:
  - cs.AI
  - cs.PL
  - cs.AI
published: '2026-06-18T17:35:57Z'
fetched_at: '2026-06-23T01:36:30.449Z'
---
LiveCodeBench (LCB) has recently become a widely adopted benchmark for evaluating large language models (LLMs) on code-generation tasks. By curating competitive programming problems, constantly adding fresh problems to the set, and filtering them by release dates, LCB provides contamination-aware evaluation and offers a holistic view of coding capability. However, LCB remains restricted to Python, leaving open the question of whether LLMs can generalize across the diverse programming languages required in real-world software engineering. We introduce Multi-LCB, a benchmark for evaluating LLMs across twelve programming languages, including Python. Multi-LCB transforms Python tasks from the LCB dataset into equivalent tasks in other languages while preserving LCB's contamination controls and evaluation protocol. Because it is fully compatible with the original LCB format, Multi-LCB will automatically track future LCB updates, enabling systematic assessment of cross-language code generation competence and requiring models to sustain performance well beyond Python. We evaluated 24 LLMs for instruction and reasoning on Multi-LCB, uncovering evidence of Python overfitting, language-specific contamination, and substantial disparities in multilingual performance. Our results establish Multi-LCB as a rigorous new benchmark for multi-programming-language code evaluation, directly addressing LCB's primary limitation and exposing critical gaps in current LLM capabilities.

Authors: Maria Ivanova, Pavel Zadorozhny, Rodion Levichev, Ivan Petrov, Adamenko Pavel
Categories: cs.AI, cs.PL, cs.AI
