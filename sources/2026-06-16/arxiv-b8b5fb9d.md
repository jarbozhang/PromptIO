---
title: >-
  Hierarchical Advantage Weighting for Online RL Fine-Tuning of VLAs from Sparse
  Episode Outcomes
url: 'https://arxiv.org/abs/2606.17043v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tongyan Fang
  - Siyuan Huang
  - Naiyu Fang
  - Ganlong Zhao
  - Zhongjin Luo
categories:
  - cs.RO
  - cs.LG
  - cs.RO
published: '2026-06-15T17:57:14Z'
fetched_at: '2026-06-16T06:33:00.400Z'
---
When pretrained VLA policies are fine-tuned through online RL, each rollout episode produces only a single binary outcome (success or failure), yet the actor update requires per-transition supervision. Existing approaches commonly reduce this sparse outcome to a single scalar reward or advantage signal, which conflates distinct forms of transition-level feedback and provides limited guidance once basic task success becomes achievable. First, a single scalar signal conflates the two objectives of viability and efficiency; once basic success is achieved, the binary label provides no gradient to distinguish efficient completions from slow ones. Second, real-world rollouts mix autonomous and intervention segments; naively assigning episode outcomes across these boundaries introduces incorrect credit assignment. To address these issues, we propose Hierarchical Advantage-Weighted Behavior Cloning (HABC), which trains separate critic heads for these two objectives on different data subsets and combines their outputs with a state-adaptive balance. A state-adaptive gate $g_t$ merges their one-step advantages, prioritizing viability when success is uncertain and shifting to efficiency only when viability is high, and converts the result into per-transition weights on the actor loss. Intervention-aware credit assignment further restricts outcome labels to segments executed by the current policy, preventing supervision from leaking across intervention boundaries. In real-robot experiment

Authors: Tongyan Fang, Siyuan Huang, Naiyu Fang, Ganlong Zhao, Zhongjin Luo
Categories: cs.RO, cs.LG, cs.RO
