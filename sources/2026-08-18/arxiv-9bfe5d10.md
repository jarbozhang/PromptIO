---
title: >-
  What Do Compliance Detectors Read? An Audit of Activation Probes and Guard
  Models
url: 'https://arxiv.org/abs/2608.16852v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Saisab Sadhu
  - Aadit Sengupta
  - Vinay Kumar Sankarapu
  - Pratinav Seth
categories:
  - cs.AI
  - cs.AI
published: '2026-08-17T17:37:07Z'
fetched_at: '2026-08-18T11:04:07.051Z'
---
Regulatory compliance monitoring in deployed language models is increasingly implemented as a legal and audit control, checking model outputs against written rules spanning data protection, healthcare, financial regulation, and platform policy. Such monitoring is meaningful only if a detector's verdict depends on the stated rule rather than on surface features of the scenario. We show this condition fails across the current class of compliance detectors, a failure we call rule blindness. Deleting, permuting, or substituting the governing rule leaves detection accuracy unchanged for every guard and activation probe we test, including a policy-conditioned guard that correctly cites the governing clause yet barely changes its verdict when that clause is swapped for its permissive counterpart. A purpose-built benchmark crossing two rules with two scenarios, so that neither alone predicts the label, confirms the failure under a design no prior benchmark rules out, and shows that step by step reasoning, not any fast detector we test, is what escapes it. Auditing at scale requires a retraining-free detector, so we introduce the Internal Compliance Score (ICS): a training-free activation readout calibrated from ten labelled pairs and scored by a single projection. We hold ICS to the same scrutiny as the guards it audits: a pre-registered criterion for beating trivial baselines is not met, and a bag-of-words model matches its pooled generalisation exactly. It remains useful because it

Authors: Saisab Sadhu, Aadit Sengupta, Vinay Kumar Sankarapu, Pratinav Seth
Categories: cs.AI, cs.AI
