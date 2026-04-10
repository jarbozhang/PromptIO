---
title: >-
  Evaluating In-Context Translation with Synchronous Context-Free Grammar
  Transduction
url: 'https://arxiv.org/abs/2604.07320v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jackson Petty
  - Jaulie Goe
  - Tal Linzen
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-04-08T17:35:44Z'
fetched_at: '2026-04-10T00:43:39.930Z'
---
Low-resource languages pose a challenge for machine translation with large language models (LLMs), which require large amounts of training data. One potential way to circumvent this data dependence is to rely on LLMs' ability to use in-context descriptions of languages, like textbooks and dictionaries. To do so, LLMs must be able to infer the link between the languages' grammatical descriptions and the sentences in question. Here we isolate this skill using a formal analogue of the task: string transduction based on a formal grammar provided in-context. We construct synchronous context-free grammars which define pairs of formal languages designed to model particular aspects of natural language grammar, morphology, and written representation. Using these grammars, we measure how well LLMs can translate sentences from one formal language into another when given both the grammar and the source-language sentence. We vary the size of the grammar, the lengths of the sentences, the syntactic and morphological properties of the languages, and their written script. We note three key findings. First, LLMs' translation accuracy decreases markedly as a function of grammar size and sentence length. Second, differences in morphology and written representation between the source and target languages can strongly diminish model performance. Third, we examine the types of errors committed by models and find they are most prone to recall the wrong words from the target language vocabulary, hal

Authors: Jackson Petty, Jaulie Goe, Tal Linzen
Categories: cs.CL, cs.AI, cs.CL
