---
title: >-
  CA-SQL: Complexity-Aware Inference Time Reasoning for Text-to-SQL via
  Exploration and Compute Budget Allocation
url: 'https://arxiv.org/abs/2605.08057v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - James Petullo
  - Nianwen Xue
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-05-08T17:44:15Z'
fetched_at: '2026-05-11T08:20:12.072Z'
---
While recent advancements in inference-time learning have improved LLM reasoning on Text-to-SQL tasks, current solutions still struggle to perform well on the most challenging tasks in the Bird-Bench (BIRD) benchmark. This is due to inadequate solution space exploration, which is necessary to uncover promising candidate queries that can be further refined to produce the correct output. To address this challenge, we introduce CA-SQL, a novel Text-to-SQL pipeline that utilizes the estimated difficulty of a task to dynamically scale the breadth of the exploration for generating solution candidates. In addition, we use a custom prompt seeding method, based on principles of evolutionary search, to further elicit exploratory behavior from the base LLM and a novel voting method to select the best candidate solution at the end of the search. Experiments demonstrate that our solution achieves a state-of-the-art score of 51.72% on the "challenging" tier of BIRD development set problems, using only GPT-4o-mini, out-performing other in-context learning approaches, even those that leverage larger models. Overall, our method attains a competitive 61.06% execution accuracy and 68.77% Soft F1 score on the BIRD development dataset.

Authors: James Petullo, Nianwen Xue
Categories: cs.CL, cs.AI, cs.CL
