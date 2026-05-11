---
title: 'Rubric-Grounded RL: Structured Judge Rewards for Generalizable Reasoning'
url: 'https://arxiv.org/abs/2605.08061v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Manish Bhattarai
  - Ismael Boureima
  - Nishath Rajiv Ranasinghe
  - Scott Pakin
  - Dan O'Malley
categories:
  - cs.AI
  - cs.AI
published: '2026-05-08T17:48:58Z'
fetched_at: '2026-05-11T08:20:12.072Z'
---
We argue that decomposing reward into weighted, verifiable criteria and using an LLM judge to score them provides a partial-credit optimization signal: instead of a binary outcome or a single holistic score, each response is graded along multiple task-specific criteria. We formalize \emph{rubric-grounded reinforcement learning (RL)}: a framework in which the policy is optimized against a structured, multi-criterion reward produced by a frozen LLM judge that conditions on auxiliary grounding the policy never sees. We instantiate the framework by deriving rubrics from an Office of Scientific and Technical Information (OSTI)-derived corpus of roughly 100,000 scientific and technical documents and training Llama-3.1-8B-Instruct with Group Relative Policy Optimization (GRPO). With GRPO-based training, the model achieves $71.7\%$ normalized reward on held-out rubric evaluation. The GRPO-tuned policy also improves over the base model on four reasoning benchmarks not derived from the training corpus -- GSM8K, MATH, GPQA Main, and GPQA Diamond. These results provide evidence that structured, document-grounded rewards can improve held-out rubric performance and induce transferable reasoning behaviors beyond the corpus used to construct the training environment.

Authors: Manish Bhattarai, Ismael Boureima, Nishath Rajiv Ranasinghe, Scott Pakin, Dan O'Malley
Categories: cs.AI, cs.AI
