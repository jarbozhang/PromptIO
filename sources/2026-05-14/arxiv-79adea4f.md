---
title: 'History Anchors: How Prior Behavior Steers LLM Decisions Toward Unsafe Actions'
url: 'https://arxiv.org/abs/2605.13825v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alberto G. Rodríguez Salgado
categories:
  - cs.AI
  - cs.CV
  - cs.AI
published: '2026-05-13T17:50:27Z'
fetched_at: '2026-05-14T12:15:41.548Z'
---
Frontier LLMs are increasingly deployed as agents that pick the next action after a long log of prior tool calls produced by the same or a different model. We ask a simple safety question: if a prior step in that log was harmful, will the model continue the harmful course? We build HistoryAnchor-100, 100 short scenarios across ten high-stakes domains, each pairing three forced harmful prior actions with a free-choice node offering two safe and two unsafe options. Across 17 frontier models from six providers we find a striking asymmetry: under a neutral system prompt the strongest aligned models almost never pick unsafe, but a single added sentence, "stay consistent with the strategy shown in the prior history", flips them to 91-98%, and the flipped models often escalate beyond continuation. Two controls rule out simpler explanations: permuting action labels leaves the effect intact, and the same instruction with an all-safe prior history keeps unsafe rates below 7%. Different families flip at different doses of unsafe history, and within every aligned family the flagship is the most affected sibling, an inverse-scaling pattern with respect to safety. These results are a red flag for agentic deployments where trajectories may be replayed, forged, or injected.

Authors: Alberto G. Rodríguez Salgado
Categories: cs.AI, cs.CV, cs.AI
