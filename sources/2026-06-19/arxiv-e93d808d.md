---
title: Multi-Task Bayesian In-Context Learning
url: 'https://arxiv.org/abs/2606.20538v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Qingyang Zhu
  - Eric Karl Oermann
  - Kyunghyun Cho
categories:
  - cs.LG
  - cs.LG
published: '2026-06-18T17:50:10Z'
fetched_at: '2026-06-19T14:36:30.215Z'
---
Bayesian predictive inference provides a principled framework for uncertainty quantification, data efficiency, and robust generalization. However, exact inference is often intractable, and scalable approximations may remain computationally expensive or require restrictive modeling assumptions that degrade predictive performance. Prior-Data Fitted and in-context models have recently emerged as an amortized alternative by learning to map datasets directly to predictive distributions, but existing approaches are tightly coupled to the support of the training prior and lack explicit mechanisms for adapting to new priors at test time, resulting in limited robustness under distribution shift. We introduce a multi-task in-context learning framework for amortized hierarchical Bayesian predictive inference that explicitly represents prior information as a prefix of in-context datasets. A transformer trained on sequences of prior and target tasks learns to adapt its predictions across families of priors. On a suite of evaluations with increasing difficulty, including out-of-meta-distribution priors and priors with high-dimensional latent structures, our method matches oracle Bayesian predictors while being orders of magnitude faster. We further demonstrate its practical relevance on a real-world spatiotemporal temperature prediction benchmark. Code is available at https://github.com/martianmartina/multi-task-bayesian-icl/.

Authors: Qingyang Zhu, Eric Karl Oermann, Kyunghyun Cho
Categories: cs.LG, cs.LG
