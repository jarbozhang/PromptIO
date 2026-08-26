---
title: >-
  StarHarness: Evolving Harnesses with Stratified Search for Enterprise
  Environments
url: 'https://arxiv.org/abs/2608.24804v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Esakkivel Esakkiraja
  - Denis Akhiyarov
  - Vikas Yadav
  - Sai Rajeswar
  - Patrice Bechard
categories:
  - cs.AI
  - cs.SE
  - cs.AI
published: '2026-08-25T16:48:05Z'
fetched_at: '2026-08-26T11:02:45.135Z'
---
We present StarHarness, a framework for evolving environment-specific agent harnesses while keeping model weights fixed. The evolved harness can include prompt and task framing, tool interfaces, skills, MCP-backed providers, subagent structure, and agent-loop configuration. StarHarness constructs a compact evolution pool by stratifying tasks according to baseline failure behavior, separates proposer-visible search tasks from proposer-hidden selection tasks, and reserves held-out tasks for evaluating generalization. Across ITBench SRE, EnterpriseOps-Gym ITSM, and AutomationBench Finance, harness evolution improves full-benchmark performance by 20-35 percentage points over the default harness after 4-12 accepted changes per environment. These gains persist on tasks excluded from evolution and transfer without re-evolution across GPT and Qwen model families. Trace analysis links the improvements to interface repairs, environment conventions, and operational knowledge that compresses search, with fewer false-positive diagnoses and shorter trajectories in several settings. StarHarness therefore offers a practical way to reduce persistent model-environment mismatch in tool-rich enterprise tasks.

Authors: Esakkivel Esakkiraja, Denis Akhiyarov, Vikas Yadav, Sai Rajeswar, Patrice Bechard
Categories: cs.AI, cs.SE, cs.AI
