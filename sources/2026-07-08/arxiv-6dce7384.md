---
title: 'LLM-as-a-Verifier: A General-Purpose Verification Framework'
url: 'https://arxiv.org/abs/2607.05391v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jacky Kwok
  - Shulu Li
  - Pranav Atreya
  - Yuejiang Liu
  - Yixing Jiang
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.MA
  - cs.RO
  - cs.AI
published: '2026-07-06T17:59:35Z'
fetched_at: '2026-07-07T23:02:35.294Z'
---
Scaling pre-training, post-training, and test-time compute have become the central paradigms for improving the capabilities of LLMs. In this work, we identify verification, the ability to determine the correctness of a solution, as a new scaling axis. To unlock this and demonstrate its effectiveness, we introduce LLM-as-a-Verifier, a general-purpose verification framework that provides fine-grained feedback for agentic tasks without requiring additional training. Unlike standard LM judges that prompt LLMs to produce discrete scores for candidate solutions, LLM-as-a-Verifier computes the expectation over the distribution of scoring token logits to generate continuous scores. This probabilistic formulation enables verification to scale along multiple dimensions: (1) score granularity, (2) repeated evaluation, and (3) criteria decomposition. In particular, we show that scaling the scoring granularity leads to better separation between positive and negative solutions, resulting in more calibrated comparisons. Moreover, scaling repeated evaluation and criteria decomposition consistently lead to additional gains in verification accuracy through variance and complexity reduction. We further introduce a cost-efficient ranking algorithm for selecting the best solution among candidates using the verifier's continuous scores. LLM-as-a-Verifier achieves state-of-the-art performance on Terminal-Bench V2 (86.5%), SWE-Bench Verified (78.2%), RoboRewardBench (87.4%), and MedAgentBench (73.3%

Authors: Jacky Kwok, Shulu Li, Pranav Atreya, Yuejiang Liu, Yixing Jiang
Categories: cs.AI, cs.CL, cs.LG, cs.MA, cs.RO, cs.AI
