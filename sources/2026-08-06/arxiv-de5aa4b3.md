---
title: 'Argus: A General-Purpose Agentic Runtime for Long-Horizon Reasoning'
url: 'https://arxiv.org/abs/2608.05144v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Boxiu Li
  - Zimo Wen
  - Yijia Fan
  - Junxiang Lei
  - Sufeng Guo
categories:
  - cs.AI
  - cs.AI
published: '2026-08-05T17:58:58Z'
fetched_at: '2026-08-06T11:02:48.669Z'
---
Long-horizon reasoning requires an agentic runtime that can persist when evidence supports its current approach and pivot when measurements reveal failure, hidden constraints, or a misspecified objective. We present Argus, a persistent, self-evolving runtime in which Manager, Planner, Engineer, and Reviewer execute bounded missions over durable project state. Argus separates stable user intent from operational objectives, constraints, and verification criteria, and admits memories, skills, procedures, verifiers, routing decisions, and rejected routes only after role-owned review and, when available, task-native verification. Model weights remain fixed; self-evolution occurs through persistent runtime state and control policy, with autonomous execution between operator-owned escalation points. Across seven GPT-5.5 benchmark arenas, Argus achieves about 78% on SWE-Bench Pro versus 59% for Direct Copilot while using 1.41 times the aggregate tokens. After verification-gated self-evolution, mature SWE-Bench waves use 21% fewer solve-input tokens and 15% less active workflow time per task than startup waves, while recording 34 verifier recoveries and 22 strict review-loop rescues. Argus also reaches 76.8% on AARRI-Bench and a 28.0-point gap on mathematical data synthesis, with competitive GPU-kernel and language-model-training results. Beyond benchmarks, an optimized RWKV6 kernel was merged upstream; a multi-day mathematics campaign retained falsified routes and proof-backed fronti

Authors: Boxiu Li, Zimo Wen, Yijia Fan, Junxiang Lei, Sufeng Guo
Categories: cs.AI, cs.AI
