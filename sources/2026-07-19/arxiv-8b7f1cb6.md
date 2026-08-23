---
title: 'Partition, Prompt, Aggregate: Statistical Self-Consistency in Language Models'
url: 'https://arxiv.org/abs/2607.15277v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Patrik Wolf
  - Thomas Kleine Buening
  - Andreas Krause
  - Celestine Mendler-Dünner
categories:
  - cs.CL
  - cs.CL
published: '2026-07-16T17:59:31Z'
fetched_at: '2026-07-18T23:02:02.541Z'
---
In-context learning is commonly interpreted as a form of conditional inference, in which the prompt specifies a context and the model's output is treated as an estimate of the corresponding conditional distribution. If this interpretation holds, then LLM estimates should satisfy basic probabilistic identities. In particular, the law of total probability asserts that prior-weighted conditional distributions aggregate into population-level marginals over any valid partition of the population. In this work, we investigate to what extent LLM estimates adhere to this self-consistency principle. We use binary trees as an evaluation scaffold to recursively partition a population into increasingly fine-grained subpopulations. We then prompt LLMs with verbalized subpopulation descriptions in context, aggregate the resulting estimates back into population-level estimates, and compare them across partitions of varying granularity. Applying this protocol across problem domains and state-of-the-art frontier models, we show widespread violations of basic consistency properties. An in-depth study of persona prompting reveals a pattern we call the macro fallacy: estimates reconstructed from more fine-grained subpopulation responses are often better aligned with human reference data than direct population-level estimates. This effect persists across variations in tree structure and estimation task, and can be partially recovered through implicit prompting. Together, these findings suggest tha

Authors: Patrik Wolf, Thomas Kleine Buening, Andreas Krause, Celestine Mendler-Dünner
Categories: cs.CL, cs.CL
