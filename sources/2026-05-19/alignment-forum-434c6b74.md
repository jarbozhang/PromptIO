---
title: >-
  Natural Language Autoencoders Produce Unsupervised Explanations of LLM
  Activations
url: >-
  https://www.alignmentforum.org/posts/oeYesesaxjzMAktCM/natural-language-autoencoders-produce-unsupervised
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-07T20:21:22.000Z'
fetched_at: '2026-05-19T07:52:38.654Z'
---
Abstract

We introduce Natural Language Autoencoders (NLAs), an unsupervised method for generating natural language explanations of LLM activations. An NLA consists of two LLM modules: an activation verbalizer (AV) that maps an activation to a text description and an activation reconstructor (AR) that maps the description back to an activation. We jointly train the AV and AR with reinforcement learning to reconstruct residual stream activations. Although we optimize for activation reconstruction, the resulting NLA explanations read as plausible interpretations of model internals that, according to our quantitative evaluations, grow more informative over training.
We apply NLAs to model auditing. During our pre-deployment audit of Claude Opus 4.6, NLAs helped diagnose safety-relevant behaviors and surfaced unverbalized evaluation awareness—cases where Claude believed, but did not say, that it was being evaluated. We present these audit findings as case studies and corroborate them using independent methods. On an automated auditing benchmark requiring end-to-end investigation of an intentionally-misaligned model, NLA-equipped agents outperform baselines and can succeed even without access to the misaligned model’s training data.
NLAs offer a convenient interface for interpretability, with expressive natural language explanations that we can directly read. To support further work, we release training code and trained NLAs for popular open models.

Twitter thread

New Anthropic research: Natural Language Autoencoders.
Models like Claude talk in words but think in numbers. The numbers—called activations—encode Claude’s thoughts, but not in a language we can read.
Here, we train Claude to translate its activations into human-readable text.

Natural language autoencoders (NLAs) convert opaque AI activations into legible text explanations. These explanations aren’t perfect, but they’re often useful.
For example: NLAs show that, when asked to complete a couplet, Claude plan
