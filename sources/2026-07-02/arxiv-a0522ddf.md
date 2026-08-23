---
title: Generative Skill Composition for LLM Agents
url: 'https://arxiv.org/abs/2606.32025v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xinyu Zhao
  - Zhen Tan
  - Vaishnav Tadiparthi
  - Nakul Agarwal
  - Kwonjoon Lee
categories:
  - cs.CL
  - cs.CL
published: '2026-06-30T17:53:09Z'
fetched_at: '2026-07-01T23:03:14.693Z'
---
Recent LLM agents benefit from skills for solving complex tasks. Skills encapsulate modular packages of procedural knowledge and instructions for performing specialized tasks, such as setting up a sandboxed environment, running a test suite, or refactoring a function across multiple files. As skill libraries grow and become reusable across tasks and domains, selecting an appropriate skill composition has emerged as a central bottleneck. Existing approaches fall into two categories. One exposes the agent's reasoning to the entire skill collection; the other performs skill retrieval via embeddings or LLM-based rerankers. Both provide useful insights; however, they miss the structural nature of skill composition, which is a joint decision over which skills, how many, and in what order -- three dimensions that cannot be decoupled. We formalize this as structured skill composition: given a task and a skill library, predict an executable skill plan that jointly specifies the activated subset, count, and execution order. We propose SkillComposer, which instantiates structured skill composition as task-conditioned skill sequence prediction. SkillComposer uses a constrained autoregressive decoder over skill identifiers, so subset, count, and order emerge jointly from a single decoding pass, and dependencies between successive skills are captured naturally. We build a training set of task-composition pairs from a real, human-curated skill library. We then evaluate SkillComposer along t

Authors: Xinyu Zhao, Zhen Tan, Vaishnav Tadiparthi, Nakul Agarwal, Kwonjoon Lee
Categories: cs.CL, cs.CL
