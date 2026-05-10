---
title: 'Exploration Hacking: Can LLMs Learn to Resist RL Training?'
url: >-
  https://www.alignmentforum.org/posts/eeFFpKCDWE9gjfzsk/exploration-hacking-can-llms-learn-to-resist-rl-training-2
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-01T20:54:42.000Z'
fetched_at: '2026-05-10T05:29:09.002Z'
---
We empirically investigate exploration hacking (EH) — where models strategically alter their exploration to resist RL training — by creating model organisms that resist capability elicitation, evaluating countermeasures, and auditing frontier models for their propensity.
Authors: Eyon Jang*, Damon Falck*, Joschka Braun*, Nathalie Kirch, Achu Menon, Perusha Moodley, Scott Emmons, Roland S. Zimmermann, David Lindner 
(*Equal contribution, random order)
Paper: arXiv | Code: GitHub | Models: HuggingFace
We present the first empirical investigation of exploration hacking — when a model strategically alters its exploration during RL training to influence the training outcome. In our earlier post, we introduced a conceptual framework for this threat model. Here, we summarize the key empirical results of our paper: we create model organisms that resist RL-based capability elicitation, evaluate detection methods against them, and audit frontier models for their propensity to engage in exploration hacking.
TL;DR:

We build model organisms that successfully resist our RL capability elicitation on biosecurity and AI R&D tasks. They currently rely on explicit chain-of-thought reasoning.
We use these model organisms to study what makes RL elicitation robust or fragile, and find that black-box and white-box detection methods (CoT monitors, action-only monitors, weight noising) reliably detect them.
From our frontier model audits, we find they can reason about exploration hacking when incentivized but lack the spontaneous propensity to do so.

Background
RL is increasingly central to reasoning capabilities, alignment, and dangerous capability assessments. Developers rely on RL working as expected: that it develops intended behaviors and elicits maximum capability so that safety cases hold. But RL depends on the model exploring sufficiently diverse actions. Unlike supervised learning, where training data is fixed, in on-policy RL the model generates its own training data through exp
