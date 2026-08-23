---
title: >-
  TriViewBench: Controlled Complexity Scaling for Multi-View Structural
  Reasoning in MLLMs
url: 'https://arxiv.org/abs/2606.26029v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yu-Yang Chen
  - Lan-Zhe Guo
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-06-24T17:00:05Z'
fetched_at: '2026-06-25T07:41:52.283Z'
---
Multimodal Large Language Models (MLLMs) demonstrate strong performance on standard visual question answering benchmarks, yet their scalability under controlled structural complexity remains poorly understood. We introduce TriViewBench, a controlled three-view visual reasoning benchmark constructed from synthetic 3D scenes with explicitly parameterized object count and occlusion. The benchmark contains 1,923 scenes and over 14K Question-Answer (QA) pairs organized into four complexity levels and three reasoning categories: Local Decision, Object Counting, and Global Recovery. We evaluate 18 open- and closed-source MLLMs under a unified prompting protocol. All 18 models exhibit an identical capability hierarchy without exception (Local Decision &gt; Object Counting &gt; Global Recovery), and performance degrades monotonically with complexity: Local Decision tasks decline modestly (12.11% relative drop), while Object Counting degrades substantially (59.14%) and Global Recovery collapses severely (80.02%). Error analysis on Object Counting reveals two mechanistically independent failure modes: single-view tasks are dominated by undercounting due to occlusion blindness, whereas the multi-view task reverses to overcounting due to cross-view identity confusion. Chain-of-Thought (CoT) prompting yields near-zero overall benefit ($Δ= -0.16\%$) and its effect on Global Recovery is strongly capability-gated, suggesting that the bottleneck lies in cross-view spatial representation rather

Authors: Yu-Yang Chen, Lan-Zhe Guo
Categories: cs.CV, cs.AI, cs.CV
