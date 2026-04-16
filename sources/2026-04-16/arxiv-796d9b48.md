---
title: >-
  From Feelings to Metrics: Understanding and Formalizing How Users Vibe-Test
  LLMs
url: 'https://arxiv.org/abs/2604.14137v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Itay Itzhak
  - Eliya Habba
  - Gabriel Stanovsky
  - Yonatan Belinkov
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-04-15T17:57:08Z'
fetched_at: '2026-04-16T06:07:35.553Z'
---
Evaluating LLMs is challenging, as benchmark scores often fail to capture models' real-world usefulness. Instead, users often rely on ``vibe-testing'': informal experience-based evaluation, such as comparing models on coding tasks related to their own workflow. While prevalent, vibe-testing is often too ad hoc and unstructured to analyze or reproduce at scale. In this work, we study how vibe-testing works in practice and then formalize it to support systematic analysis. We first analyze two empirical resources: (1) a survey of user evaluation practices, and (2) a collection of in-the-wild model comparison reports from blogs and social media. Based on these resources, we formalize vibe-testing as a two-part process: users personalize both what they test and how they judge responses. We then introduce a proof-of-concept evaluation pipeline that follows this formulation by generating personalized prompts and comparing model outputs using user-aware subjective criteria. In experiments on coding benchmarks, we find that combining personalized prompts and user-aware evaluation can change which model is preferred, reflecting the role of vibe-testing in practice. These findings suggest that formalized vibe-testing can serve as a useful approach for bridging benchmark scores and real-world experience.

Authors: Itay Itzhak, Eliya Habba, Gabriel Stanovsky, Yonatan Belinkov
Categories: cs.CL, cs.AI, cs.LG, cs.CL
