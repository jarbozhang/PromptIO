---
title: Consilience for Verifier-Free Test-Time Scaling
url: 'https://arxiv.org/abs/2608.09898v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Lecheng Kong
  - Like Hui
  - Haitao Mao
  - Jun Huan
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-08-10T17:45:44Z'
fetched_at: '2026-08-11T11:02:16.307Z'
---
Test-time scaling often uses an external verifier, such as compilers and test cases in coding or trained value functions in robotics applications, to obtain high-quality rollouts. Verifier-free test-time scaling (or VF-TTS) is gaining extensive attention as a mechanism to enhance Large Language Model (LLM) reasoning, primarily because we do not have access to such high-quality verifiers in many real-world applications. Among existing VF-TTS methods, confidence-based VF-TTS methods, which compute and rank rollouts solely by confidence, are particularly promising. Such methods introduce near-zero overhead for sample evaluation and require minimal access to internal model states, making the methods highly flexible across models and tasks. In this paper, we demonstrate a critical limitation of existing confidence-based VF-TTS methods by showing that such methods catastrophically break down on complex tasks. We observe a very interesting phenomenon: uniformly high confidence frequently indicates a failure to explore, favoring confidently wrong answers. To address this, our core insight is that robust cognitive search requires a specific confidence trajectory pattern: such methods perform exploratory branching at the beginning, as manifested by low initial confidence, and converge to a high final confidence solution. To implement this insight, we introduce consilience, a novel selection framework that explicitly evaluates the temporal asymmetry of confidence in reasoning. We operat

Authors: Lecheng Kong, Like Hui, Haitao Mao, Jun Huan
Categories: cs.CL, cs.LG, cs.CL
