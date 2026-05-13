---
title: 'MEME: Multi-entity &amp; Evolving Memory Evaluation'
url: 'https://arxiv.org/abs/2605.12477v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seokwon Jung
  - Alexander Rubinstein
  - Arnas Uselis
  - Sangdoo Yun
  - Seong Joon Oh
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-05-12T17:55:10Z'
fetched_at: '2026-05-13T10:19:24.403Z'
---
LLM-based agents increasingly operate in persistent environments where they must store, update, and reason over information across many sessions. While prior benchmarks evaluate only single-entity updates, MEME defines six tasks spanning the full space defined by the multi-entity and evolving axes, including three not scored by prior work: Cascade and Absence (dependency reasoning) and Deletion (post-removal state). Evaluating six memory systems spanning three memory paradigms on 100 controlled episodes, we find that all systems collapse on dependency reasoning under the default configuration (Cascade: 3%, Absence: 1% in average accuracy) despite adequate static retrieval performance. Prompt optimization, deeper retrieval, reduced filler noise, and most stronger LLMs fail to close this gap. Only a file-based agent paired with Claude Opus 4.7 as its internal LLM partially closes the gap, but at ~70x the baseline cost, indicating closure currently depends on configurations that are not practical at scale. Code and data are available on the project page: https://seokwonjung-jay.github.io/meme-eval/.

Authors: Seokwon Jung, Alexander Rubinstein, Arnas Uselis, Sangdoo Yun, Seong Joon Oh
Categories: cs.LG, cs.CL, cs.LG
