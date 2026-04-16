---
title: Neural architectures for resolving references in program code
url: 'https://arxiv.org/abs/2604.14073v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gergő Szalay
  - Gergely Zsolt Kovács
  - Sándor Teleki
  - Balázs Pintér
  - Tibor Gregorics
categories:
  - cs.LG
  - cs.NE
  - cs.LG
published: '2026-04-15T16:44:56Z'
fetched_at: '2026-04-16T06:07:35.559Z'
---
Resolving and rewriting references is fundamental in programming languages. Motivated by a real-world decompilation task, we abstract reference rewriting into the problems of direct and indirect indexing by permutation. We create synthetic benchmarks for these tasks and show that well-known sequence-to-sequence machine learning architectures are struggling on these benchmarks. We introduce new sequence-to-sequence architectures for both problems. Our measurements show that our architectures outperform the baselines in both robustness and scalability: our models can handle examples that are ten times longer compared to the best baseline. We measure the impact of our architecture in the real-world task of decompiling switch statements, which has an indexing subtask. According to our measurements, the extended model decreases the error rate by 42%. Multiple ablation studies show that all components of our architectures are essential.

Authors: Gergő Szalay, Gergely Zsolt Kovács, Sándor Teleki, Balázs Pintér, Tibor Gregorics
Categories: cs.LG, cs.NE, cs.LG
