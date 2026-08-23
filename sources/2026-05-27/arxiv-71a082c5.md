---
title: >-
  MobileGym: A Verifiable and Highly Parallel Simulation Platform for Mobile GUI
  Agent Research
url: 'https://arxiv.org/abs/2605.26114v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Dingbang Wu
  - Rui Hao
  - Haiyang Wang
  - Shuzhe Wu
  - Han Xiao
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-05-25T17:59:49Z'
fetched_at: '2026-05-27T01:19:09.160Z'
---
We present MobileGym, a browser-hosted, lightweight, fully controllable environment for everyday mobile use, targeting interaction fidelity without replicating proprietary backends. It enables two capabilities previously out of reach for everyday apps: verifiable outcome signals through deterministic state-based judging over structured JSON state, and scalable online RL through low-cost parallel rollouts. The full environment state is captured, configured, forked, and compared as structured JSON, and a single server can host hundreds of parallel instances, with about 400 MB memory per instance and about 3 s cold start. A layered state model and a declarative task-definition framework keep state programmability and task creation practical at scale, and a single programmatic judging mechanism delivers both deterministic evaluation verdicts and dense RL rewards. The accompanying MobileGym-Bench provides 416 parameterized task templates, including 256 test and 160 train templates, over 28 apps, with deterministic judges and a structured AnswerSheet protocol that avoids free-text matching failures. In a Sim-to-Real case study, GRPO on Qwen3-VL-4B-Instruct gains +12.8 percentage points on the 256-task test set, and on a 59-task real-device signal subset, real-device execution retains 95.1% of the simulation-side training gain. Project page: https://mobilegym.github.io.

Authors: Dingbang Wu, Rui Hao, Haiyang Wang, Shuzhe Wu, Han Xiao
Categories: cs.AI, cs.CL, cs.AI
