---
title: How to Verify Consistency of Probabilistic Claims
url: 'https://arxiv.org/abs/2608.11181v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Orr Paradise
  - Oliver Richardson
  - Yoshua Bengio
  - Shafi Goldwasser
categories:
  - cs.CC
  - cs.AI
  - cs.LG
  - cs.CC
published: '2026-08-11T17:41:39Z'
fetched_at: '2026-08-12T11:02:39.399Z'
---
When a probabilistic predictor answers many conditional-probability queries, are its answers self-consistent, and can this be verified in polynomial time? This problem is of interest for AI safety, where safety is derived from honesty about probabilistic predictions of unwanted outcomes potentially caused by an AI action. We construct an interactive PCP as follows. Let a predictive model be specified by a probability circuit P and a circuit Q which outputs confidence in predictions. Together, P and Q implicitly specify exponentially many probabilistic claims. We show a protocol in which a polynomial-time verifier can verify the approximate consistency of (P,Q). The verifier is given the pair of circuits (P,Q), which it evaluates at only a few points; alongside them it is given a proof oracle, an encoding of a witnessing probability distribution allegedly consistent with the predictions of (P,Q), which it reads at a few locations while interacting with a single untrusted prover. En route, we must ensure the existence of a sparse witnessing distribution consistent with the model's predictions. To do so, we first consider witness distributions for the consistency of explicit probabilistic claims, rather than claims specified by a predictor: say m claims, each of the form Pr[Y = 1 | X = x] = p, over n Boolean variables. Building on work initiated by Nilsson (Artif. Intell., 1986), we place l_2-approximate probabilistic consistency of explicit claims in NP, with certificates of le

Authors: Orr Paradise, Oliver Richardson, Yoshua Bengio, Shafi Goldwasser
Categories: cs.CC, cs.AI, cs.LG, cs.CC
