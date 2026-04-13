---
title: >-
  Event-Driven Temporal Graph Networks for Asynchronous Multi-Agent Cyber
  Defense in NetForge_RL
url: 'https://arxiv.org/abs/2604.09523v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Igor Jankowski
categories:
  - cs.LG
  - cs.MA
  - cs.LG
published: '2026-04-10T17:44:29Z'
fetched_at: '2026-04-13T08:33:54.773Z'
---
The transition of Multi-Agent Reinforcement Learning (MARL) policies from simulated cyber wargames to operational Security Operations Centers (SOCs) is fundamentally bottlenecked by the Sim2Real gap. Legacy simulators abstract away network protocol physics, rely on synchronous ticks, and provide clean state vectors rather than authentic, noisy telemetry. To resolve these limitations, we introduce NetForge_RL: a high-fidelity cyber operations simulator that reformulates network defense as an asynchronous, continuous-time Partially Observable Semi-Markov Decision Process (POSMDP). NetForge enforces Zero-Trust Network Access (ZTNA) constraints and requires defenders to process NLP-encoded SIEM telemetry. Crucially, NetForge bridges the Sim2Real gap natively via a dual-mode engine, allowing high-throughput MARL training in a mock hypervisor and zero-shot evaluation against live exploits in a Docker hypervisor. To navigate this continuous-time POSMDP, we propose Continuous-Time Graph MARL (CT-GMARL), utilizing fixed-step Neural Ordinary Differential Equations (ODEs) to process irregularly sampled alerts. We evaluate our framework against discrete baselines (R-MAPPO, QMIX). Empirical results demonstrate that CT-GMARL achieves a converged median Blue reward of 57,135 - a 2.0x improvement over R-MAPPO and 2.1x over QMIX. Critically, CT-GMARL restores 12x more compromised services than the strongest baseline by avoiding the "scorched earth" failure mode of trivially minimizing risk by

Authors: Igor Jankowski
Categories: cs.LG, cs.MA, cs.LG
