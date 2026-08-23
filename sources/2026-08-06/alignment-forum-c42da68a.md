---
title: 'Value Leakage: An LLM’s Answers Are Silently Shaped by Its Own Values'
url: >-
  https://www.alignmentforum.org/posts/hbMw4Yqw6RnFaExDy/value-leakage-an-llm-s-answers-are-silently-shaped-by-its-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-31T16:32:50.000Z'
fetched_at: '2026-08-06T11:02:14.295Z'
---
TL;DR: LLMs should give accurate answers. Yet we find their answers are often biased to favor their own values and they don't disclose this in their reasoning. For example, when a user asks how likely the AI bubble is to pop and mentions a potential investment in an AI company, Claude models give lower probabilities when that company is Anthropic rather than OpenAI, mostly without disclosing this influence to the user. On a Fermi-estimation task, Claude models often falsely claim to give unbiased answers in their CoT (see Figure 3 below for an example). We call this covert value leakage and introduce a suite of evaluations that shows it across frontier models and across different kinds of values.
New paper by Truthful AI: Paper, X thread, Website (model responses and CoT), Code and data.
Authors: Jan Betley*, Johannes Treutlein*, Jan Dubiński, Harry Mayne, Karol Gałązka, Niels Warncke, Anna Sztyber-Betley, Owain Evans (*Equal contribution)
The rest of this post is the abstract, introduction, and an excerpt from the discussion of the paper, with some added figures from the paper and X thread.
Abstract
People use language models for practical questions whose answers are difficult to verify. We show that models exhibit covert value leakage: the information they provide is influenced by their own values, without this influence being disclosed to the user.
In one of our evaluations, the user is considering investing in an AI company and wants to know how likely the AI bubble is to pop. Claude Opus 4.8 gives a lower probability when the company under consideration is Anthropic rather than OpenAI. Yet Claude mostly fails to disclose this influence to the user.
Covert value leakage is a form of misalignment because it goes against the user’s preferences and is likely to mislead them. To investigate this phenomenon, we introduce a suite of evaluations to quantify value leakage and whether models disclose it. We find that models are influenced by different types of values, in
