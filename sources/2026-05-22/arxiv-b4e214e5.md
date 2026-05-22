---
title: Mitigating Label Bias with Interpretable Rubric Embeddings
url: 'https://arxiv.org/abs/2605.21455v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Calvin Isley
  - Johann D. Gaebler
  - Sharad Goel
categories:
  - cs.LG
  - cs.LG
published: '2026-05-20T17:46:08Z'
fetched_at: '2026-05-22T00:18:38.674Z'
---
Statistical decision algorithms are increasingly deployed in domains where ground-truth labels are hard to obtain, such as hiring, university admissions, and content moderation. In these settings, models are typically trained on historical human evaluations -- for example, using past hiring decisions as a proxy for true applicant quality. However, if past evaluations unjustly favor certain groups, models trained on these labels may inherit those biases. To address this problem, we propose basing predictions on rubric embeddings, a representation framework that replaces standard black-box embeddings with features derived from expert-defined criteria that align with the underlying construct of interest. By anchoring predictions to semantically meaningful dimensions, this approach guards against biased proxy signals. We provide both theoretical and empirical evidence that rubric embeddings mitigate label bias under plausible conditions. Empirically, we evaluate our method on a novel dataset of applications to a large master's program. We find that models trained on rubric embeddings reduce group disparities while improving measures of cohort quality. Our results suggest that basing predictions on interpretable, domain-grounded representations offers a practical approach to learning in the presence of biased labels.

Authors: Calvin Isley, Johann D. Gaebler, Sharad Goel
Categories: cs.LG, cs.LG
