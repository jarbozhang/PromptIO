---
title: Predicting When RL Training Breaks Chain-of-Thought Monitorability
url: >-
  https://www.alignmentforum.org/posts/SvxaKP5KdkksZPcG7/predicting-when-rl-training-breaks-chain-of-thought
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-01T10:23:01.000Z'
fetched_at: '2026-04-15T02:22:05.690Z'
---
Crossposted from the DeepMind Safety Research Medium Blog. Read our full paper about this topic by Max Kaufmann, David Lindner, Roland S. Zimmermann, and Rohin Shah.
Overseeing AI agents by reading their intermediate reasoning “scratchpad” is a promising tool for AI safety. This approach, known as Chain-of-Thought (CoT) monitoring, allows us to check what a model is thinking before it acts, often helping us catch concerning behaviors like reward hacking and scheming.
However, CoT monitoring can fail if a model’s chain-of-thought is not a good representation of the reasoning process we want to monitor. For example, training LLMs with reinforcement learning (RL) to avoid outputting problematic reasoning can result in a model learning to hide such reasoning without actually removing problematic behavior.
Previous work produced an inconsistent picture of whether RL training hurts CoT monitorability. In some prior work, monitorability degrades and models learn to obfuscate their reasoning. In other settings, the CoT remains legible despite RL optimization pressure.
Why does this happen? Which properties of an RL training process cause CoT to become less monitorable? In this post, and our full technical paper, we introduce a conceptual framework that helps predict when CoT monitorability degrades under optimization pressure, and we test it empirically.
Our work can help anticipate which training processes might hurt CoT monitorability and help prevent changes that do so unnecessarily. We hope that our conceptual framework can form the basis of an industry-wide approach to preserving CoT monitorability.


Our conceptual framework predicts which rewards can cause Chain-of-Thought to become unmonitorable. For instance, in a coin-flip state tracking task, an “In-Conflict” length penalty forces the model to use abbreviations that no longer allow us to unambiguously tell what the model is reasoning about. “Orthogonal” or “Aligned” reward penalties preserve transparent reasoning
