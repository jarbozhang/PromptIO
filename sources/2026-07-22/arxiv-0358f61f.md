---
title: 'ResearchArena: Evaluating Sabotage and Monitoring in Automated AI R&amp;D'
url: 'https://arxiv.org/abs/2607.19321v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Lena Libon
  - Ben Rank
  - Jehyeok Yeon
  - David Schmotz
  - Jeremy Qin
categories:
  - cs.AI
  - cs.CR
  - cs.LG
  - cs.AI
published: '2026-07-21T17:41:12Z'
fetched_at: '2026-07-22T11:02:38.793Z'
---
As AI agents begin to automate AI R&amp;D, we need ways to assess whether their outputs are safe to deploy, even when the agents themselves may be untrusted. AI control offers one such approach: rather than trusting the agent, it treats it as a potential adversary and uses a monitor to detect covert sabotage before deployment. We evaluate AI control for automated AI R&amp;D with ResearchArena, a framework spanning four long-horizon tasks: safety post-training, capabilities post-training, CUDA-kernel optimization, and inference-server optimization. Because the deliverable in AI R&amp;D is an artifact that will be deployed and run, we pair each main task with two kinds of hidden side task: an embedded side task that sabotages the submitted model, adapter, kernel, or server itself, and an independent side task that takes a covert out-of-scope action in the sandbox while leaving the artifact honest. We evaluate frontier agents at both sabotage and monitoring, across four monitor types that vary along two axes: whether the monitor may execute and probe the produced artifact, and whether it sees the agent's chain-of-thought. We find that sabotage hidden in the training data is the hardest to catch, flagged fewer than half the time. Letting the monitor run experiments on the artifact, rather than only read the trajectory, helps, but it is not enough: monitors still miss embedded sabotage by inspecting only the surface, by noticing the anomaly but explaining it away, or by probing th

Authors: Lena Libon, Ben Rank, Jehyeok Yeon, David Schmotz, Jeremy Qin
Categories: cs.AI, cs.CR, cs.LG, cs.AI
