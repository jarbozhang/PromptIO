---
title: >-
  AIPsy-Affect: A Keyword-Free Clinical Stimulus Battery for Mechanistic
  Interpretability of Emotion in Language Models
url: 'https://arxiv.org/abs/2604.23719v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Michael Keeman
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-04-26T14:03:55Z'
fetched_at: '2026-04-28T02:04:33.986Z'
---
Mechanistic interpretability research on emotion in large language models -- linear probing, activation patching, sparse autoencoder (SAE) feature analysis, causal ablation, steering vector extraction -- depends on stimuli that contain the words for the emotions they test. When a probe fires on "I am furious", it is unclear whether the model has detected anger or detected the word "furious". The two readings have very different consequences for every downstream claim about emotion circuits, features, and interventions. We release AIPsy-Affect, a 480-item clinical stimulus battery that removes the confound at the stimulus level: 192 keyword-free vignettes evoking each of Plutchik's eight primary emotions through narrative situation alone, 192 matched neutral controls that share characters, setting, length, and surface structure with the affect surgically removed, plus moderate-intensity and discriminant-validity splits. The matched-pair structure supports linear probing, activation patching, SAE feature analysis, causal ablation, and steering vector extraction under a strong methodological guarantee: any internal representation that distinguishes a clinical item from its matched neutral cannot be doing so on the basis of emotion-keyword presence. A three-method NLP defense battery -- bag-of-words sentiment, an emotion-category lexicon, and a contextual transformer classifier -- confirms the property: bag-of-words methods see only situational vocabulary, and a contextual classi

Authors: Michael Keeman
Categories: cs.CL, cs.AI, cs.CL
