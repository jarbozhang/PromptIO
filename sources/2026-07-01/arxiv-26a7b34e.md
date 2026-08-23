---
title: Uncertainty-Aware Generation and Decision-Making Under Ambiguity
url: 'https://arxiv.org/abs/2606.30578v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nico Daheim
  - Iryna Gurevych
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-06-29T17:20:43Z'
fetched_at: '2026-06-30T23:02:51.944Z'
---
With rapidly improving capabilities, Large Language Models (LLMs) are increasingly used in many complex real-world tasks. Beyond requiring in-depth knowledge and reasoning skills, many of these tasks exhibit a high degree of subjectivity and require that the outputs of the model can be trusted. While a lot of progress has been made to train better models, decision-making algorithms have received less attention. In this work, we present and evaluate various uncertainty-aware decision-making algorithms based on Bayesian decision theory and risk-averse decision making on the tasks of tutoring and automatic peer reviewing. Concretely, we take uncertainty over tutoring strategies and review scores into account when generating a tutor response or review and use conformal prediction to provide guarantees over strategy and score. We find empirically that these algorithms can improve the utility of the generations but need to be carefully implemented when ambiguity is high. For example, risk-averse rules can degrade performance by optimizing for generic outputs, while Bayesian methods tend to perform better. Our work uses techniques from decision theory to improve LLM-based decision-making and outlines open challenges for the community.

Authors: Nico Daheim, Iryna Gurevych
Categories: cs.CL, cs.LG, cs.CL
