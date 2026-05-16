---
title: >-
  MetaBackdoor: Exploiting Positional Encoding as a Backdoor Attack Surface in
  LLMs
url: 'https://arxiv.org/abs/2605.15172v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Rui Wen
  - Mark Russinovich
  - Andrew Paverd
  - Jun Sakuma
  - Ahmed Salem
categories:
  - cs.CR
  - cs.CL
  - cs.CR
published: '2026-05-14T17:56:22Z'
fetched_at: '2026-05-16T14:12:26.804Z'
---
Backdoor attacks pose a serious security threat to large language models (LLMs), which are increasingly deployed as general-purpose assistants in safety- and privacy-critical applications. Existing LLM backdoors rely primarily on content-based triggers, requiring explicit modification of the input text. In this work, we show that this assumption is unnecessary and limiting. We introduce MetaBackdoor, a new class of backdoor attacks that exploits positional information as the trigger, without modifying textual content. Our key insight is that Transformer-based LLMs necessarily encode token positions to process ordered sequences. As a result, length-correlated positional structure is reflected in the model's internal computation and can be used as an effective non-content trigger signal. We demonstrate that even a simple length-based positional trigger is sufficient to activate stealthy backdoors. Unlike prior attacks, MetaBackdoor operates on visibly and semantically clean inputs and enables qualitatively new capabilities. We show that a backdoored LLM can be induced to disclose sensitive internal information, including proprietary system prompts, once a length condition is satisfied. We further demonstrate a self-activation scenario, where normal multi-turn interaction can move the conversation context into the trigger region and induce malicious tool-call behavior without attacker-supplied trigger text. In addition, MetaBackdoor is orthogonal to content-based backdoors and c

Authors: Rui Wen, Mark Russinovich, Andrew Paverd, Jun Sakuma, Ahmed Salem
Categories: cs.CR, cs.CL, cs.CR
