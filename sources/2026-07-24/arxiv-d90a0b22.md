---
title: 'OpenForgeRL: Train Harness-native Agents in Any Environment'
url: 'https://arxiv.org/abs/2607.21557v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiao Yu
  - Baolin Peng
  - Ruize Xu
  - Hao Zou
  - Qianhui Wu
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-07-23T17:38:30Z'
fetched_at: '2026-07-24T11:02:45.977Z'
---
Modern AI agents rely on elaborate inference harnesses such as Claude Code, Codex, and OpenClaw to drive multi-turn reasoning, tool use, and access to external systems. While powerful, these complex harnesses also make agents hard to train end-to-end with open infrastructure, whose SFT/RL stacks cannot natively express stateful, multi-process harness inference. To address this, we present OpenForgeRL, an open-source framework for training harness-based agents end-to-end in diverse environments. OpenForgeRL achieves this with a lightweight proxy that serves the harness's model calls while recording them as training data for a standard RL codebase (e.g., veRL), and a Kubernetes orchestrator that runs each rollout in its own remote container, together enabling training on any harness in any environment at scale. By decoupling training and inference, OpenForgeRL allows researchers to easily train, study, and improve agents directly in the real harnesses and environments they are deployed with. We validate our framework across diverse, complex harnesses and environments, spanning tool/claw-based agents and multimodal GUI browser- and computer-use agents. Using only hundreds to a few thousand tasks, OpenForgeClaw reaches 31.7 pass^3 and 55.9 pass@3 on ClawEval and 33.7 on QwenClawBench. OpenForgeGUI reaches 37.7 on OSWorld-Verified, 63.0 on Online-Mind2Web, and 72.3 on WebVoyager. Both outperform open baselines of similar size on nearly all benchmarks, and in the GUI setting match 

Authors: Xiao Yu, Baolin Peng, Ruize Xu, Hao Zou, Qianhui Wu
Categories: cs.AI, cs.CL, cs.AI
