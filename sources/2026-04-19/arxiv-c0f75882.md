---
title: >-
  Diagnosing LLM Judge Reliability: Conformal Prediction Sets and Transitivity
  Violations
url: 'https://arxiv.org/abs/2604.15302v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Manan Gupta
  - Dhruv Kumar
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-04-16T17:58:21Z'
fetched_at: '2026-04-19T01:16:45.153Z'
---
LLM-as-judge frameworks are increasingly used for automatic NLG evaluation, yet their per-instance reliability remains poorly understood. We present a two-pronged diagnostic toolkit applied to SummEval: $\textbf{(1)}$ a transitivity analysis that reveals widespread per-input inconsistency masked by low aggregate violation rates ($\barρ = 0.8$-$4.1\%$), with $33$-$67\%$ of documents exhibiting at least one directed 3-cycle; and $\textbf{(2)}$ split conformal prediction sets over 1-5 Likert scores providing theoretically-guaranteed $\geq(1{-}α)$ coverage, with set width serving as a per-instance reliability indicator ($r_s = {+}0.576$, $N{=}1{,}918$, $p &lt; 10^{-100}$, pooled across all judges). Critically, prediction set width shows consistent cross-judge agreement ($\bar{r} = 0.32$-$0.38$), demonstrating it captures document-level difficulty rather than judge-specific noise. Across four judges and four criteria, both diagnostics converge: criterion matters more than judge, with relevance judged most reliably (avg. set size $\approx 3.0$) and coherence moderately so (avg. set size $\approx 3.9$), while fluency and consistency remain unreliable (avg. set size $\approx 4.9$). We release all code, prompts, and cached results.

Authors: Manan Gupta, Dhruv Kumar
Categories: cs.AI, cs.CL, cs.LG, cs.AI
