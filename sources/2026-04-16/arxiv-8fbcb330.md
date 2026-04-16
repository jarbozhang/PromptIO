---
title: >-
  Correct Prediction, Wrong Steps? Consensus Reasoning Knowledge Graph for
  Robust Chain-of-Thought Synthesis
url: 'https://arxiv.org/abs/2604.14121v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zipeng Ling
  - Shuliang Liu
  - Shenghong Fu
  - Yuehao Tang
  - Seonil Son
categories:
  - cs.CL
  - cs.CL
published: '2026-04-15T17:43:10Z'
fetched_at: '2026-04-16T06:07:35.553Z'
---
LLM reasoning traces suffer from complex flaws -- *Step Internal Flaws* (logical errors, hallucinations, etc.) and *Step-wise Flaws* (overthinking, underthinking), which vary by sample. A natural approach would be to provide ground-truth labels to guide LLMs' reasoning. Contrary to intuition, we show that this yields no improvement in reasoning ability. We then propose CRAFT, a unified framework that mitigates both types of Step flaws, which builds a Reasoning Knowledge Graph (RKG) based on the consensus parts of multiple candidate traces, and synthesizes a high-quality trace through topological generation. Our approach improves label-prediction accuracy by 10+% on average, and consistently outperforms all baselines across both logical and mathematical reasoning benchmarks. Further, detailed benchmark evaluation proves that our method also improves the quality of LLMs' reasoning traces in multiple dimensions.

Authors: Zipeng Ling, Shuliang Liu, Shenghong Fu, Yuehao Tang, Seonil Son
Categories: cs.CL, cs.CL
