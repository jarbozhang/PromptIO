---
title: 'EntityBench: Towards Entity-Consistent Long-Range Multi-Shot Video Generation'
url: 'https://arxiv.org/abs/2605.15199v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ruozhen He
  - Meng Wei
  - Ziyan Yang
  - Vicente Ordonez
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-14T17:59:55Z'
fetched_at: '2026-05-18T00:51:02.171Z'
---
Multi-shot video generation extends single-shot generation to coherent visual narratives, yet maintaining consistent characters, objects, and locations across shots remains a challenge over long sequences. Existing evaluations typically use independently generated prompt sets with limited entity coverage and simple consistency metrics, making standardized comparison difficult. We introduce EntityBench, a benchmark of 140 episodes (2,491 shots) derived from real narrative media, with explicit per-shot entity schedules tracking characters, objects, and locations simultaneously across easy / medium / hard tiers of up to 50 shots, 13 cross-shot characters, 8 cross-shot locations, 22 cross-shot objects, and recurrence gaps spanning up to 48 shots. It is paired with a three-pillar evaluation suite that disentangles intra-shot quality, prompt-following alignment, and cross-shot consistency, with a fidelity gate that admits only accurate entity appearances into cross-shot scoring. As a baseline, we propose EntityMem, a memory-augmented generation system that stores verified per-entity visual references in a persistent memory bank before generation begins. Experiments show that cross-shot entity consistency degrades sharply with recurrence distance in existing methods, and that explicit per-entity memory yields the highest character fidelity (Cohen's d = +2.33) and presence among methods evaluated. Code and data are available at https://github.com/Catherine-R-He/EntityBench/.

Authors: Ruozhen He, Meng Wei, Ziyan Yang, Vicente Ordonez
Categories: cs.CV, cs.AI, cs.CV
