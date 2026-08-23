---
title: >-
  Same Evidence, Different Answer: Auditing Order Sensitivity in Multimodal
  Large Language Models
url: 'https://arxiv.org/abs/2606.26079v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Akshay Paruchuri
  - Sanmi Koyejo
  - Ehsan Adeli
categories:
  - cs.CL
  - cs.CV
  - cs.LG
  - cs.CL
published: '2026-06-24T17:53:26Z'
fetched_at: '2026-06-25T07:41:52.268Z'
---
Standard benchmarks for multimodal large language models (MLLMs) score each item on one canonical ordering and miss whether order-irrelevant shuffling changes the answer, a baseline reliability property called for by emerging AI evaluation guidelines. We introduce Facet-Probe, a five-facet audit (option, evidence-chunk, document-rank, image-set, and mixed-modality ordering) of 18 frontier and open-weight MLLMs. A Bayesian item-response model separates ordering noise from per-facet bias, and a same-ordering control estimates the decoder-stochastic floor for observed flips. We find that none of the 18 MLLMs we audit are order-invariant: screened per-facet panel-mean flip rates span 24-50%. A Gemini same-ordering control at temperature 0 estimates a substantial ordering excess over a same-input decoder-noise floor in verified cells. Capability predicts but does not eliminate flips; the best model still flips on 13.4% of trials. In our Gemini mitigation tests, training-free prompt changes are modality-conditional and do not transfer from text to visual reasoning. These results suggest that prompt-level mitigation alone is unlikely to provide general order robustness, motivating future work on training-time and architectural approaches. We propose cross-ordering flip rate as a standard reporting axis for MLLMs.

Authors: Akshay Paruchuri, Sanmi Koyejo, Ehsan Adeli
Categories: cs.CL, cs.CV, cs.LG, cs.CL
