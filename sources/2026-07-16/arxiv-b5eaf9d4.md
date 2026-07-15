---
title: >-
  FormalAnalyticGeo: A Neural-Symbolic Based Framework for Multimodal Analytic
  Geometry Problem Generation
url: 'https://arxiv.org/abs/2607.12982v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ruoran Xu
  - Wending Gao
  - Qiufeng Wang
categories:
  - cs.AI
  - cs.MA
  - cs.SC
  - cs.AI
published: '2026-07-14T17:24:57Z'
fetched_at: '2026-07-15T23:03:05.477Z'
---
Math reasoning has achieved significant progress with the rapid advancement of Multimodal Large Language Models (MLLMs), however analytic geometry remains largely underexplored, primarily due to the scarcity of annotated samples. Existing diagram generation approaches struggle with analytic geometry: template methods cannot handle constraint-driven layouts, and generative models lack the geometric precision to render annotated conic curves correctly. We present FormalAnalyticGeo, a scalable framework for fully automatic generation of multimodal analytic geometry problems. Leveraging the rigor of formal languages, we design the framework around CDL (Condition Description Language), a formal intermediate representation that bridges free-form problem text with precise diagram rendering via a Signed Distance Field (SDF) engine. The framework employs four specialized LLM components in sequence: a Generator that produces diverse analytic geometry problems, a Formalizer that converts each problem into CDL for SDF-based rendering, a Measurer that extracts ground-truth answers through vision-based measurement on the rendered diagrams, and a Quality Verifier that checks outputs at three stages. Structured feedback from the Quality Verifier drives automatic retry, forming a closed loop that eliminates any need for human annotation. Applying FormalAnalyticGeo at scale yields AnalyticGeo7K, a dataset of over 7K verified multimodal problems, each with aligned text, diagram, formal annotati

Authors: Ruoran Xu, Wending Gao, Qiufeng Wang
Categories: cs.AI, cs.MA, cs.SC, cs.AI
