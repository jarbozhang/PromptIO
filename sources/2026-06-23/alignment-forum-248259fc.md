---
title: Models May Behave Worse When Eval Aware
url: >-
  https://www.alignmentforum.org/posts/aTcsN5ZZDnMFJvRiG/models-may-behave-worse-when-eval-aware
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-11T09:28:19.000Z'
fetched_at: '2026-06-23T01:35:41.780Z'
---
This is the first in a series of research updates from the Google DeepMind Language Model Interpretability team, in interpretability and adjacent areas.
TL;DR
It's often assumed that models will act more aligned when they can tell they're being evaluated. But we find that Gemini can take “undesired” actions in behavioural evals even when it explicitly reasons that the environments are contrived, and sometimes this reasoning will increase the rate of undesired actions. When we dig into the model's reasoning, we find that this is typically associated with Gemini perceiving an environment as a puzzle where the aim is to achieve the goal by unconventional means (like capture the flag challenges – Gemini’s thoughts often literally call it a “CTF” challenge) or a consequence-free simulation in which it should play along – rather than recognising it as an alignment test. This complicates the usual story about evaluation awareness: detecting that an environment is synthetic doesn't reliably push a model towards better behaviour – it depends on what the model thinks the environment is for.
Introduction & Main Findings
A common concern when conducting behavioural evaluations of AI systems is evaluation awareness. If a model detects it is being evaluated, it might modify its behaviour in response.[1] This hinders our ability to make unbiased inferences about how the same model is likely to behave in deployment.
It’s often assumed that eval awareness nudges models towards acting aligned. That is, when a model realises it is in an eval, it will choose to appear aligned for the sake of the eval. This leaves us uncertain whether the model would behave just as well in deployment. This does seem to be a valid concern for some models: for example, the Claude Opus system card provides evidence that Claude’s misalignment rate is lower when it verbalises eval awareness, and goes up when steering interventions are applied that reduce its verbalisation of eval awareness.[2]
However, in ou
