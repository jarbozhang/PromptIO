---
title: Active Query Synthesis for Preference Learning
url: 'https://arxiv.org/abs/2605.26072v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Namrata Nadagouda
  - Nauman Ahad
  - Maegan Tucker
  - Mark A. Davenport
categories:
  - cs.LG
  - cs.LG
published: '2026-05-25T17:37:58Z'
fetched_at: '2026-05-27T01:19:09.171Z'
---
Efficient learning of user preferences is crucial for many modern decision making systems but typically requires costly labeled data. Active learning reduces this cost, yet standard methods are computationally expensive due to pool-based evaluation. Further, most methods assume all query feedback is equally reliable, ignoring that pairwise queries between nearly identical or entirely dissimilar items yield ambiguous, low-confidence responses. To address the issue of feedback reliability, we introduce a novel confidence aware response model that explicitly accounts for these ambiguous comparisons. To overcome the computational bottleneck of pool-based evaluation, we propose an active query synthesis framework, Info-Synth that generates optimal queries by maximizing a mutual information-based objective within a continuous space. Moreover, we propose two strategies, Pair M-dist and Pair Opt-dist, that extend Info-Synth to select effective queries even when restricted to finite query pools. We demonstrate our framework's versatility and performance across synthetic preference learning, constrained text summary datasets, and subjective, continuous-space controller gain tuning for a simulated mobile robot.

Authors: Namrata Nadagouda, Nauman Ahad, Maegan Tucker, Mark A. Davenport
Categories: cs.LG, cs.LG
