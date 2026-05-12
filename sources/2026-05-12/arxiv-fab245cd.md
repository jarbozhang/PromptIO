---
title: >-
  V4FinBench: Benchmarking Tabular Foundation Models, LLMs, and Standard Methods
  on Corporate Bankruptcy Prediction
url: 'https://arxiv.org/abs/2605.10896v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Marcin Kostrzewa
  - Sebastian Tomczak
  - Roman Furman
  - Anna Poberezhna
  - Michał Furgała
categories:
  - cs.LG
  - cs.LG
published: '2026-05-11T17:38:17Z'
fetched_at: '2026-05-12T11:42:53.213Z'
---
Corporate bankruptcy prediction is a high-stakes financial task characterized by severe class imbalance and multi-horizon forecasting demands. Public datasets supporting it remain scarce and small: widely used free benchmarks contain between 6,000 and 80,000 company-year observations, while larger resources are behind subscription paywalls. To address this gap, we introduce V4FinBench, a benchmark of over one million company-year records from the Visegràd Group (V4) economies (2006-2021), with 131 financial and non-financial features, six prediction horizons, and a composite distress criterion jointly capturing solvency, profitability, and liquidity deterioration. V4FinBench is designed to support the evaluation of tabular and foundation-model methods under realistic class imbalance, with positive rates between 0.19% and 0.36%. We provide reference evaluations of standard tabular baselines, finetuned TabPFN, and QLoRA-finetuned Llama-3-8B. With imbalance-aware finetuning, TabPFN matches or exceeds gradient boosting at longer time horizons on both $F_1$-score and ROC-AUC. In contrast, Llama-3-8B trails gradient boosting on ROC-AUC at every horizon and is generally weaker on $F_1$-score, with the gap widening sharply beyond the immediate horizon. In an external evaluation on the American Bankruptcy Dataset, the V4FinBench-finetuned TabPFN checkpoint improves over vanilla TabPFN, suggesting that adaptation captures transferable financial-distress structure rather than only V4-sp

Authors: Marcin Kostrzewa, Sebastian Tomczak, Roman Furman, Anna Poberezhna, Michał Furgała
Categories: cs.LG, cs.LG
