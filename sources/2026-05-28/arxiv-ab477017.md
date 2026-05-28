---
title: >-
  Can LLMs Use Linguistic Uncertainty Markers to Reliably Reflect Intrinsic
  Confidence?
url: 'https://arxiv.org/abs/2605.28778v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gabrielle Kaili-May Liu
  - Arman Cohan
categories:
  - cs.CL
  - cs.CL
published: '2026-05-27T17:38:00Z'
fetched_at: '2026-05-28T03:17:22.087Z'
---
LLMs' linguistically expressed confidence should faithfully reflect their intrinsic uncertainty. While recent work shows LLMs struggle to use epistemic markers (e.g., "it is likely...") in a human-aligned fashion, it remains unclear whether models can apply their own linguistic confidence framework to associate markers with specific confidence levels in a stable and generalizable way, and how contextual features impact this ability. We conduct the first systematic study of this question, formalizing _marker internal confidence_ (MIC) as the estimated intrinsic confidence a model associates with a specific epistemic marker in a given task domain. We present 7 metrics to evaluate the stability of MICs within and across distributions. Applying our analysis framework to diverse models and tasks, we find that LLMs remain faithfully miscalibrated even under model-centric interpretation of marker meanings, struggling to differentiate markers by internal confidence across distributions despite preserving a somewhat consistent ranking order across tasks. This supplies critical, complementary evidence to existing work toward a holistic understanding of faithful calibration in LLMs, emphasizing the need for more aligned and stable marker use to improve trustworthiness and reliability.

Authors: Gabrielle Kaili-May Liu, Arman Cohan
Categories: cs.CL, cs.CL
