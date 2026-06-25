---
title: 'The Warrant Gap: Claim-Conditioned Re-scoring for Fact-Checking'
url: 'https://arxiv.org/abs/2606.24627v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arka Ujjal Dey
  - John Collomosse
categories:
  - cs.CL
  - cs.CL
published: '2026-06-23T14:23:56Z'
fetched_at: '2026-06-24T01:28:36.379Z'
---
Fact-checking systems built on LLMs achieve high verdict accuracy on standard benchmarks, yet routinely output Supports labels whose cited evidence does not license the claim. Structured decomposition is the natural way to inspect those warrants, but rigid extraction protocols strip the full-claim context that facets need. We introduce SIFT -- claim-conditioned re-scoring of extracted evidence spans against the full claim -- paired with WSP (Warranted Supports Proportion), an automatic NLI check that the cited warrant entails the claim. We evaluate on FEVER, SciFact, 5PILS, and DP across four open-source backbones. SIFT recovers accuracy on cells where naive decomposition costs up to 27.6 points, while raising WSP above direct prompting; WSP itself calibrates against human gold evidence at AUC 0.92 and precision 0.98.

Authors: Arka Ujjal Dey, John Collomosse
Categories: cs.CL, cs.CL
