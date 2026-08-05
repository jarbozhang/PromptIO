---
title: 'SocietyBench: Forecasting Counterfactual Social-World Evolution'
url: 'https://arxiv.org/abs/2608.04009v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhenran Wang
  - Zhonghan Bian
  - Jinsong Li
  - Zhangyang Qi
categories:
  - cs.CL
  - cs.CL
published: '2026-08-04T17:59:56Z'
fetched_at: '2026-08-05T11:02:38.579Z'
---
Large language models (LLMs), and the agents built on top of them, are now benchmarked heavily on whether they can finish a task -- fix a bug, drive a browser, operate a GUI. A complementary social ability, namely how well a model understands and forecasts the way real social events unfold, has barely been measured. We introduce SocietyBench, an end-to-end benchmark that takes a one-line event topic, collects Web news and social-media posts across five platforms, distills them into a date-indexed timeline that keeps factual events and a public-opinion layer separate, and then turns every cutoff date on that timeline into an audited bank of forecasting questions. Questions are scored on two orthogonal 100-point axes: probability calibration and temporal accuracy. Before any model sees a timeline, a three-phase procedure replaces every named entity and shifts every date by a per-event constant, turning a real arc into a counterfactual social world -- structurally identical to what happened, but stripped of the surface labels a model could match against pre-training memory. On five heterogeneous events and 125 prediction points in Chinese and English editions, the strongest of six frontier LLMs reaches only 75.0 out of 100, against a trivial anchor of 50. The two axes come apart: a model can be calibration-strong but time-weak, or the reverse. Three agent frameworks built on a shared base model fail to improve on that base, and two model-free heuristics trail every LLM. Per-even

Authors: Zhenran Wang, Zhonghan Bian, Jinsong Li, Zhangyang Qi
Categories: cs.CL, cs.CL
