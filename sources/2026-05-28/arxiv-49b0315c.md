---
title: >-
  Affective Music Recommendation: A Rollout-Based World Model for Offline
  Preference Optimization
url: 'https://arxiv.org/abs/2605.28810v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Audrey Chan
  - Aaron Labbé
  - Jacob Lavoie
  - Jordan Bannister
  - Arsène Fansi Tchango
categories:
  - cs.LG
  - cs.IR
  - cs.SD
  - cs.LG
published: '2026-05-27T17:58:46Z'
fetched_at: '2026-05-28T03:17:22.084Z'
---
Functional music applications, from consumer focus and sleep aids to clinical interventions, share a distinctive recommendation problem: success is defined by the listener's affective state, but online experimentation on emotion is ethically constrained, particularly for clinical populations who cannot reliably skip a song or report distress. We describe AMRS, the Affective Music Recommendation System deployed on LUCID's health-and-wellness platforms, which serve clinical users (primarily older adults with neurocognitive conditions) and consumer-wellness users across energize, focus, calm, and sleep modes. AMRS is built around a rollout-based world model: a causal transformer trained on logged listening data to jointly predict engagement, binary rating, and self-reported valence and arousal. The world model serves both as an in-silico simulator for offline policy training and as a stress-testing tool before deployment. A recommender policy initialized by behaviour cloning is fine-tuned offline with Direct Preference Optimization (DPO) against a configurable multi-objective utility function. Under a strict cold-start protocol, the world model predicts both behavioural and affective signals with usable fidelity; DPO improves predicted valence and arousal over the cloned baseline while maintaining a similar diversity profile and avoiding the distributional collapse produced by greedy optimization. We position the work as an early deployed validation of a methodology for affectiv

Authors: Audrey Chan, Aaron Labbé, Jacob Lavoie, Jordan Bannister, Arsène Fansi Tchango
Categories: cs.LG, cs.IR, cs.SD, cs.LG
