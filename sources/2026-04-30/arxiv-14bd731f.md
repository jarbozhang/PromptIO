---
title: 'ClawGym: A Scalable Framework for Building Effective Claw Agents'
url: 'https://arxiv.org/abs/2604.26904v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Fei Bai
  - Huatong Song
  - Shuang Sun
  - Daixuan Cheng
  - Yike Yang
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-04-29T17:12:22Z'
fetched_at: '2026-04-30T08:51:20.278Z'
---
Claw-style environments support multi-step workflows over local files, tools, and persistent workspace states. However, scalable development around these environments remains constrained by the absence of a systematic framework, especially one for synthesizing verifiable training data and integrating it with agent training and diagnostic evaluation. To address this challenge, we present ClawGym, a scalable framework that supports the full lifecycle of Claw-style personal agent development. Concretely, we construct ClawGym-SynData, a diverse dataset of 13.5K filtered tasks synthesized from persona-driven intents and skill-grounded operations, paired with realistic mock workspaces and hybrid verification mechanisms. We then train a family of capable Claw-style models, termed ClawGym-Agents, through supervised fine-tuning on black-box rollout trajectories, and further explore reinforcement learning via a lightweight pipeline that parallelizes rollouts across per-task sandboxes.To support reliable evaluation, we further construct ClawGym-Bench, a benchmark of 200 instances calibrated through automated filtering and human-LLM review. Relevant resources will be soon released at https://github.com/ClawGym.

Authors: Fei Bai, Huatong Song, Shuang Sun, Daixuan Cheng, Yike Yang
Categories: cs.CL, cs.AI, cs.LG, cs.CL
