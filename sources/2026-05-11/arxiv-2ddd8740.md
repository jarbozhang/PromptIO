---
title: >-
  VecCISC: Improving Confidence-Informed Self-Consistency with Reasoning Trace
  Clustering and Candidate Answer Selection
url: 'https://arxiv.org/abs/2605.08070v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - James Petullo
  - Sonny George
  - Dylan Cashman
  - Nianwen Xue
categories:
  - cs.AI
  - cs.AI
published: '2026-05-08T17:54:38Z'
fetched_at: '2026-05-11T08:20:12.071Z'
---
A standard technique for scaling inference-time reasoning is Self-Consistency, whereby multiple candidate answers are sampled from an LLM and the most common answer is selected. More recently, it has been shown that weighted majority voting (e.g. Confidence-Informed Self Consistency (CISC)), which assigns a confidence value to each candidate answer and chooses the answer with the largest accumulated score, tends to be more accurate on a wide range of popular benchmarks. In practice, weighted majority voting necessitates calling a critic LLM on each candidate's reasoning trace to produce the answer's confidence score. This secondary series of LLM calls greatly increases the overhead and cost of weighted majority voting, despite its potential performance benefits. To reduce this expense, we propose VecCISC, a lightweight, adaptive framework that uses a measure of semantic similarity to filter reasoning traces that are semantically equivalent to others, degenerate, or hallucinated, thus decreasing the number of candidate answers that must be evaluated by the critic. To ensure adequate experimental thoroughness, we evaluate VecCISC on five challenging, widely-adopted datasets spanning the domains of mathematics, chemistry, biology, commonsense reasoning, and the humanities. Our results demonstrate that VecCISC reduces the total token usage by 47%, while maintaining or exceeding the accuracy of CISC.

Authors: James Petullo, Sonny George, Dylan Cashman, Nianwen Xue
Categories: cs.AI, cs.AI
