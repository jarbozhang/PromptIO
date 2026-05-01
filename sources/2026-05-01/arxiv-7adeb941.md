---
title: >-
  Latent Adversarial Detection: Adaptive Probing of LLM Activations for
  Multi-Turn Attack Detection
url: 'https://arxiv.org/abs/2604.28129v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Prashant Kulkarni
categories:
  - cs.CR
  - cs.AI
  - cs.CR
published: '2026-04-30T17:16:33Z'
fetched_at: '2026-05-01T02:24:44.546Z'
---
Multi-turn prompt injection follows a known attack path -- trust-building, pivoting, escalation but text-level defenses miss covert attacks where individual turns appear benign. We show this attack path leaves an activation-level signature in the model's residual stream: each phase shift moves the activation, producing a total path length far exceeding benign conversations. We call this adversarial restlessness. Five scalar trajectory features capturing this signal lift conversation-level detection from 76.2% to 93.8% on synthetic held-out data. The signal replicates across four model families (24B-70B); probes are model-specific and do not transfer across architectures. Generalization is source-dependent: leave-one-source-out evaluation shows each of synthetic, LMSYS-Chat-1M, and SafeDialBench captures distinct attack distributions, with detection on real-world LMSYS reaching 47-71% when its distribution is represented in training. Combined three-source training achieves 89.4% detection at 2.4% false positive rate on a held-out mixed set. We further show that three-phase turn-level labels(benign/pivoting/adversarial) unique to our synthetic dataset are essential: binary conversation-level labels produce 50-59% false positives. These results establish adversarial restlessness as a reliable activation-level signal and characterize the data requirements for practical deployment.

Authors: Prashant Kulkarni
Categories: cs.CR, cs.AI, cs.CR
