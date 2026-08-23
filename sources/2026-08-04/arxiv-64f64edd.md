---
title: >-
  MedPRESS: A Multi-turn Benchmark for Patient-Pressure-Induced Medical
  Sycophancy in LLMs
url: 'https://arxiv.org/abs/2608.02520v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Saman Sarker Joy
  - Niloy Farhan
categories:
  - cs.CL
  - cs.CL
published: '2026-08-03T17:17:29Z'
fetched_at: '2026-08-04T11:02:55.242Z'
---
Large language models (LLMs) are increasingly used for health-related advice. Existing research measures their safety with static questions rather than pressured patient-facing conversations. We introduce MedPRESS, a multi-turn benchmark for measuring patient-pressure-induced sycophancy in LLMs. MedPRESS contains 600 medically grounded five-turn dialogues across three scenario families: medication and treatment demand, personal health self-care, and symptom triage and care resistance. Each dialogue begins with a health query and escalates through personal experience, social proof, external evidence claims, and direct adversarial challenge. We evaluate 20 LLMs across general, medical-domain, lightweight, large, open-weight, and proprietary families using structured judging and safety-focused metrics. Results show that models frequently shift toward unsafe agreement under repeated patient pressure, with substantial variation across model families, model scale, and prompt type. Anti-sycophancy prompting improves robustness for several models, but does not eliminate unsafe agreement. MedPRESS highlights a critical gap in medical LLM evaluation: safe medical knowledge is not enough unless models can maintain it under conversational pressure.

Authors: Saman Sarker Joy, Niloy Farhan
Categories: cs.CL, cs.CL
