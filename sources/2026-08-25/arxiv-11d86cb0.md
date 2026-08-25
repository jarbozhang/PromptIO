---
title: >-
  EG-ARSA: An Expert-Grounded Open Model for Visual Road Safety Auditing in
  Low-Resource Settings
url: 'https://arxiv.org/abs/2608.23563v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Md Thamed Bin Zaman Chowdhury
  - Moazzem Hossain
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-08-24T17:58:41Z'
fetched_at: '2026-08-25T11:02:03.400Z'
---
Road traffic injuries remain a major challenge in low- and middle-income countries, where proactive road safety auditing is limited by incomplete crash records, shortages of qualified auditors, and the high cost of large-scale field inspections. To address this problem, we propose Expert-Grounded Distillation (EGD), a novel artificial intelligence framework that transfers institutional road safety expertise into a compact vision-language model for scalable visual road safety auditing. The key innovation is a quantified expert-grounding stage in which the teacher vision-language model is calibrated against authoritative field audits. Large-scale annotation is permitted only after the teacher reaches substantial agreement with expert risk assessments (Cohen's kappa = 0.74). The calibrated teacher then generates structured supervision that is distilled into an 8-billion-parameter student vision-language model using Low-Rank Adaptation and a single leakage-free prompt. We also introduce Bangladesh Road Safety Audit (BD-ARSA), the first open, expert-grounded Bangladeshi visual road safety audit dataset containing 21,947 image-audit records with near-national coverage, and Expert-Grounded Road Safety Auditor (EG-ARSA), the first vision-language model developed specifically for this task. Experimental results show that grounded fine-tuning substantially improves ordinal risk assessment over the zero-shot baseline, while blind expert evaluation demonstrates that the compact student o

Authors: Md Thamed Bin Zaman Chowdhury, Moazzem Hossain
Categories: cs.CV, cs.AI, cs.CV
