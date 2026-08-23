---
title: 'Beyond Trial-and-Error: Agentic Optimization for Image-to-Video Adherence'
url: 'https://arxiv.org/abs/2608.12290v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aman Tyagi
  - Hemanth Boinpally
  - Jonathan Chen
  - Douglas Gebert
  - Steven Hickson
categories:
  - cs.CV
  - cs.AI
  - cs.MM
  - cs.CV
published: '2026-08-12T17:35:16Z'
fetched_at: '2026-08-13T11:03:17.819Z'
---
Modern black-box Image-to-Video (I2V) models offer powerful capabilities in automated content creation, yet their lack of fine-grained control and reliability presents significant challenges in professional workflows. Their inherent stochasticity causes minor variations in textual prompts or hyperparameters to yield drastically different outputs often necessitating inefficient, brute-force trial-and-error processes. To address these limitations, we introduce the ``Agentic Self-Improvement" framework, which reframes video synthesis into a closed-loop, goal-directed optimization. Our framework systematically navigates the generation parameter space using a novel two-stage approach. In the first stage, an iterative prompt optimization loop uses a multimodal Large Language Model (mLLM) to refine the input prompt. This refinement implements two automated evaluations: Davidsonian Scene Graph (DSG) queries ensure semantic adherence, and Common Mistake Questions (CMQ) for artifact detection. At the second stage, we use Bayesian optimization to efficiently co-optimize stochastic seeds and CFG scales. This search is guided by a suite of quality metrics, including the novel Video-Text Adherence (VTA) score derived from the DSG and CMQ evaluations. Our framework significantly outperforms unguided search methods: in human preference studies, videos generated via our agentic approach were strongly preferred over baseline outputs, achieving win rates up to 69\%. This work provides a practic

Authors: Aman Tyagi, Hemanth Boinpally, Jonathan Chen, Douglas Gebert, Steven Hickson
Categories: cs.CV, cs.AI, cs.MM, cs.CV
