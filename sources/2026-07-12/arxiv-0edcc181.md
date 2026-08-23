---
title: 'Validity of LLMs as data annotators: AMALIA on authority'
url: 'https://arxiv.org/abs/2607.08731v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Manuel Pita
categories:
  - cs.CL
  - cs.AI
  - cs.CY
  - cs.CL
published: '2026-07-09T17:34:25Z'
fetched_at: '2026-07-11T23:02:41.610Z'
---
A national language model offers a linguistic community its own instrument for measuring what its citizens say and value. Portugal's AMALIA, a publicly funded 9B-parameter model for European Portuguese, appears competitive on agreement alone: asked to code the moral foundation of authority, it agrees with trained human coders to within six F1 points of open models eight to thirteen times its size. Yet agreement is reliability, not validity. For theoretical constructs that must be inferred rather than read from surface features, the question is whether the model follows the construct's theory or reaches the right code by correlated shortcuts. We test this with the recovery gap: the loss in performance when a holistic prompt is decomposed into the codebook's atomic clauses and recombined by the theory's explicit rule. If calibration closes that gap, some portability should survive across models and languages; where it does not, the construct-model instrument is the likely locus of failure. We ask whether a calibrated English instrument transfers to AMALIA-9B and to European Portuguese. For one construct and one corpus, it does not. Decomposition recovers only about half of AMALIA's holistic performance, and error analysis suggests reliance on surface correlates, especially moral outrage near authority figures. An open multilingual LLM closes the gap on the same Portuguese corpus under the same instructions, pointing away from the corpus as the main explanation. AMALIA can still

Authors: Manuel Pita
Categories: cs.CL, cs.AI, cs.CY, cs.CL
