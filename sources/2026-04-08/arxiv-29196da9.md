---
title: >-
  Topological Characterization of Churn Flow and Unsupervised Correction to the
  Wu Flow-Regime Map in Small-Diameter Vertical Pipes
url: 'https://arxiv.org/abs/2604.06167v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Brady Koenig
  - Sushovan Majhi
  - Atish Mitra
  - Abigail Stein
  - Burt Todd
categories:
  - cs.LG
  - math.AT
  - cs.LG
published: '2026-04-07T17:59:15Z'
fetched_at: '2026-04-08T02:58:13.561Z'
---
Churn flow-the chaotic, oscillatory regime in vertical two-phase flow-has lacked a quantitative mathematical definition for over $40$ years. We introduce the first topology-based characterization using Euler Characteristic Surfaces (ECS). We formulate unsupervised regime discovery as Multiple Kernel Learning (MKL), blending two complementary ECS-derived kernels-temporal alignment ($L^1$ distance on the $χ(s,t)$ surface) and amplitude statistics (scale-wise mean, standard deviation, max, min)-with gas velocity. Applied to $37$ unlabeled air-water trials from Montana Tech, the self-calibrating framework learns weights $β_{ECS}=0.14$, $β_{amp}=0.50$, $β_{ugs}=0.36$, placing $64\%$ of total weight on topology-derived features ($β_{ECS} + β_{amp}$). The ECS-inferred slug/churn transition lies $+3.81$ m/s above Wu et al.'s (2017) prediction in $2$-in. tubing, quantifying reports that existing models under-predict slug persistence in small-diameter pipes where interfacial tension and wall-to-wall interactions dominate flow. Cross-facility validation on $947$ Texas A&amp;M University images confirms $1.9\times$ higher topological complexity in churn vs. slug ($p &lt; 10^{-5}$). Applied to $45$ TAMU pseudo-trials, the same unsupervised framework achieves $95.6\%$ $4$-class accuracy and $100\%$ churn recall-without any labeled training data-matching or exceeding supervised baselines that require thousands of annotated examples. This work provides the first mathematical definition of ch

Authors: Brady Koenig, Sushovan Majhi, Atish Mitra, Abigail Stein, Burt Todd
Categories: cs.LG, math.AT, cs.LG
