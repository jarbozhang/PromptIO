---
title: >-
  PAST-Bench: Benchmarking the Foundations of Recursive Self-Improvement in
  Personal Agents
url: 'https://arxiv.org/abs/2608.04003v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shuhan Xue
  - Zixin Ding
  - Yichen Shen
  - Yinjie Wang
  - Zhenfei Yin
categories:
  - cs.CL
  - cs.CL
published: '2026-08-04T17:58:05Z'
fetched_at: '2026-08-05T11:02:38.580Z'
---
Recursive self-improvement requires agents to turn accumulated experience into better future behavior. Personal AI agents offer a concrete setting for studying this capability because they retain preferences, task histories, tool routines, and learned skills across sessions. Yet whether retained experience actually improves them over time has not been systematically tested. We introduce PAST-Bench, a benchmark designed to isolate this question. Each agent runs through ordered sequences of fresh-session tasks under matched conditions that turn retained experience on and off. It spans 26 scenarios and 204 episodes across memory, procedural reuse, information gathering, and update. We report both later-task gains and whether those gains follow the intended save, retrieve, and update pathway. Across seven base models and four agent frameworks, improvement is real but uneven across capabilities. Agents with the same headline gain can differ markedly in whether that gain is supported by evidence of the intended pathway. Guided by these findings, we develop Hermes+, which extends Hermes with five targeted interventions across stages of the agent loop. Hermes+ raises the average gain from retained experience and provides clearer pathway evidence, with its strongest improvement on tasks requiring outdated state to be replaced, although the effect remains capability- and model-dependent. Together, PAST-Bench and Hermes+ provide an evaluation and diagnostic foundation for studying how p

Authors: Shuhan Xue, Zixin Ding, Yichen Shen, Yinjie Wang, Zhenfei Yin
Categories: cs.CL, cs.CL
