---
title: Process Reward Agents for Steering Knowledge-Intensive Reasoning
url: 'https://arxiv.org/abs/2604.09482v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jiwoong Sohn
  - Tomasz Sternal
  - Kenneth Styppa
  - Torsten Hoefler
  - Michael Moor
categories:
  - cs.AI
  - cs.AI
published: '2026-04-10T16:45:44Z'
fetched_at: '2026-04-13T08:33:54.777Z'
---
Reasoning in knowledge-intensive domains remains challenging as intermediate steps are often not locally verifiable: unlike math or code, evaluating step correctness may require synthesizing clues across large external knowledge sources. As a result, subtle errors can propagate through reasoning traces, potentially never to be detected. Prior work has proposed process reward models (PRMs), including retrieval-augmented variants, but these methods operate post hoc, scoring completed trajectories, which prevents their integration into dynamic inference procedures. Here, we introduce Process Reward Agents (PRA), a test-time method for providing domain-grounded, online, step-wise rewards to a frozen policy. In contrast to prior retrieval-augmented PRMs, PRA enables search-based decoding to rank and prune candidate trajectories at every generation step. Experiments on multiple medical reasoning benchmarks demonstrate that PRA consistently outperforms strong baselines, achieving 80.8% accuracy on MedQA with Qwen3-4B, a new state of the art at the 4B scale. Importantly, PRA generalizes to unseen frozen policy models ranging from 0.5B to 8B parameters, improving their accuracy by up to 25.7% without any policy model updates. More broadly, PRA suggests a paradigm in which frozen reasoners are decoupled from domain-specific reward modules, allowing the deployment of new backbones in complex domains without retraining.

Authors: Jiwoong Sohn, Tomasz Sternal, Kenneth Styppa, Torsten Hoefler, Michael Moor
Categories: cs.AI, cs.AI
