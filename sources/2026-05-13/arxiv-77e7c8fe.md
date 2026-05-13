---
title: Reward Hacking in Rubric-Based Reinforcement Learning
url: 'https://arxiv.org/abs/2605.12474v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anas Mahmoud
  - MohammadHossein Rezaei
  - Zihao Wang
  - Anisha Gunjal
  - Bing Liu
categories:
  - cs.AI
  - cs.AI
published: '2026-05-12T17:54:25Z'
fetched_at: '2026-05-13T10:19:24.404Z'
---
Reinforcement learning with verifiable rewards has enabled strong post-training gains in domains such as math and coding, though many open-ended settings rely on rubric-based rewards. We study reward hacking in rubric-based RL, where a policy is optimized against a training verifier but evaluated against a cross-family panel of three frontier judges, reducing dependence on any single evaluator. Our framework separates two sources of divergence: verifier failure, where the training verifier credits rubric criteria that reference verifiers reject, and rubric-design limitations, where even strong rubric-based verifiers favor responses that rubric-free judges rate worse overall. Across medical and science domains, weak verifiers produce large proxy-reward gains that do not transfer to the reference verifiers; exploitation grows over training and concentrates in recurring failures such as partial satisfaction of compound criteria, treating implicit content as explicit, and imprecise topical matching. Stronger verifiers substantially reduce, but do not eliminate, verifier exploitation. We also introduce a self-internalization gap, a verifier-free diagnostic based on policy log-probabilities, which tracks reference-verifier quality, detecting when the policy trained using the weak verifier stops improving. Finally, in our setting, stronger verification does not prevent reward hacking when the rubric leaves important failure modes unspecified: rubric-based verifiers prefer the RL che

Authors: Anas Mahmoud, MohammadHossein Rezaei, Zihao Wang, Anisha Gunjal, Bing Liu
Categories: cs.AI, cs.AI
