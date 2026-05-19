---
title: 'DexHoldem: Playing Texas Hold''em with Dexterous Embodied System'
url: 'https://arxiv.org/abs/2605.18727v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Feng Chen
  - Tianzhe Chu
  - Li Sun
  - Pei Zhou
  - Zhuxiu Xu
categories:
  - cs.RO
  - cs.AI
  - cs.RO
published: '2026-05-18T17:51:34Z'
fetched_at: '2026-05-19T07:53:23.210Z'
---
Evaluating embodied systems on real dexterous hardware requires more than isolated primitive skills: an agent must perceive a changing tabletop scene, choose a context-appropriate action, execute it with a dexterous hand, and leave the scene usable for later decisions. We introduce DexHoldem, a real-world system-level benchmark built around Texas Hold'em dexterous manipulation with a ShadowHand. DexHoldem provides 1,470 teleoperated demonstrations across 14 Texas Hold'em manipulation primitives, a standardized physical policy benchmark, and an agentic perception benchmark that tests whether agents can recover the structured game state needed for embodied decision making. On primitive execution, $π_{0.5}$ obtains the highest task completion rate ($61.2\%$), while $π_{0.5}$ and $π_0$ tie on scene-preserving success rate ($47.5\%$). On agentic perception, Opus 4.7 obtains the best strict problem-level accuracy ($34.3\%$), while GPT 5.5 obtains the best average field-wise accuracy ($66.8\%$), exposing a gap between isolated visual sub-capabilities and complete routing-relevant state recovery. Finally, we instantiate the full embodied-agent loop in three case studies, where waiting, recovery dispatches, human-help requests, and repeated primitive execution reveal how perception and policy errors accumulate during closed-loop deployment. DexHoldem therefore evaluates dexterous tabletop execution, agentic perception, and embodied decision routing in a shared physical setting. Projec

Authors: Feng Chen, Tianzhe Chu, Li Sun, Pei Zhou, Zhuxiu Xu
Categories: cs.RO, cs.AI, cs.RO
