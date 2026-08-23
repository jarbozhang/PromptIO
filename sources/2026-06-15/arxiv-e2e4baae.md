---
title: >-
  Operadic consistency: a label-free signal for compositional reasoning failures
  in LLMs
url: 'https://arxiv.org/abs/2606.13649v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nathaniel Bottman
  - Yinhong Liu
  - Kyle Richardson
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-06-11T17:50:40Z'
fetched_at: '2026-06-14T23:19:44.404Z'
---
Detecting LLM reasoning failures at inference time without ground-truth labels has motivated a wide range of confidence baselines, including self-consistency, semantic entropy, and P(True), built on within-question sampling and self-evaluation. Operad theory, the formalism for systems built by iterated substitution, suggests a complementary diagnostic: a model's direct answer to a compositional query should agree with the answer it produces by composing a stated decomposition of the same query. We instantiate this idea as operadic consistency (OC), a per-question signal. Across twelve instruction-tuned LLMs (4B to 671B parameters, open-weights and closed-source) on four multi-hop QA datasets, OC is strongly correlated with accuracy on every dataset (Pearson $r \in [0.86, 0.94]$, all $p \leq 0.0004$), and is the only signal we evaluate with $r \geq 0.85$ uniformly across all four datasets. Chain-of-thought self-consistency (CoT-SC; Wang et al., 2023) matches OC on HotpotQA and DROP ($r = 0.93, 0.87$) but drops to $r \approx 0.45$ on MuSiQue and StrategyQA. At the per-question level, OC contributes information beyond CoT-SC and semantic entropy on every dataset (cluster-robust $p \leq 10^{-16}$ for the OC coefficient), and the conclusion is robust to additionally controlling for constructed decomposition-aware baselines ($p \leq 10^{-13}$). The same signal yields selective-prediction improvements (accuracy at fixed coverage) over a tuned CoT-SC baseline at the equal-cost $K = 3

Authors: Nathaniel Bottman, Yinhong Liu, Kyle Richardson
Categories: cs.CL, cs.LG, cs.CL
