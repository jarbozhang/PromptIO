---
title: 'Program-as-Weights: A Programming Paradigm for Fuzzy Functions'
url: 'https://arxiv.org/abs/2607.02512v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wentao Zhang
  - Liliana Hotsko
  - Woojeong Kim
  - Pengyu Nie
  - Stuart Shieber
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.LG
published: '2026-07-02T17:59:50Z'
fetched_at: '2026-07-06T23:02:22.283Z'
---
Many everyday programming tasks resist clean rule-based implementation, such as alerting on important log lines, repairing malformed JSON, or ranking search results by intent, and are increasingly outsourced to large language model APIs at the cost of locality, reproducibility, and price. We propose fuzzy-function programming: compiling such a function from a natural-language specification into a compact, locally-executable neural artifact. We instantiate this paradigm with Program-as-Weights (PAW), in which a 4B compiler trained on FuzzyBench, a 10M-example dataset we release, emits parameter-efficient adapters for a frozen, lightweight interpreter. A 0.6B Qwen3 interpreter executing PAW programs matches the performance of direct prompting of Qwen3-32B, while using roughly one fiftieth of the inference memory and running at 30 tokens/s on a MacBook M3. PAW reframes the foundation model from a per-input problem solver into a tool builder: invoked once per function definition, it produces a small reusable artifact whose subsequent calls per function application are cheap and offline.

Authors: Wentao Zhang, Liliana Hotsko, Woojeong Kim, Pengyu Nie, Stuart Shieber
Categories: cs.LG, cs.AI, cs.CL, cs.LG
