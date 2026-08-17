---
title: 'Twin: Playing an Unknown Game with a Test-Time Digital Twin'
url: 'https://arxiv.org/abs/2608.14490v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alexy Skoutnev
  - Kirill Acharya
  - Gaston Longhitano
  - Madeleine Udell
  - Kevin Ellis
categories:
  - cs.AI
  - cs.AI
published: '2026-08-14T17:06:00Z'
fetched_at: '2026-08-17T11:03:44.074Z'
---
We present a Test-time World-model Inference (Twin) system, in which a frontier coding agent writes an executable world model for completing continual learning tasks, such as ARC-AGI-3 games. Traditional approaches hand-engineer such models, one custom design per task. Each game hides its rules and goal, and our system constructs them from simulation and interaction alone. Its inductive prior over grid games is strong enough to recover the true transitions of the game and the goal on nearly all levels. Replay validation happens in a twin world model. The harness enforces that an action is not made until the program reproduces every previous observed game transition. Each mismatch between a world model prediction and the actual action result becomes a counterexample that is used to repair the world model. Twin clears 179 out of 183 levels (97.8%), and does so more efficiently than humans in 158 out of 179 levels (88.3%). The system infers the goal before any reward on 156 of the levels it clears (87.2%), and in the remaining levels automatically discovers the goal by search. The benchmark scores completion and action efficiency, between 0 and 100, against humans playing each game for the first time. Played directly, the base model scores only 7.8%; an off-the-shelf harness increases it to 61.1%, whereas our twin world model increases the same base model to 93.3%, clearing 23 out of 25 games. Building a usable world model is simpler than anticipated, whereas the harder problem 

Authors: Alexy Skoutnev, Kirill Acharya, Gaston Longhitano, Madeleine Udell, Kevin Ellis
Categories: cs.AI, cs.AI
