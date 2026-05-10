---
title: >-
  Cited but Not Verified: Parsing and Evaluating Source Attribution in LLM Deep
  Research Agents
url: 'https://arxiv.org/abs/2605.06635v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hailey Onweller
  - Elias Lumer
  - Austin Huber
  - Pia Ramchandani
  - Vamse Kumar Subbiah
categories:
  - cs.CL
  - cs.CL
published: '2026-05-07T17:46:45Z'
fetched_at: '2026-05-10T05:29:17.426Z'
---
Large language models (LLMs) power deep research agents that synthesize information from hundreds of web sources into cited reports, yet these citations cannot be reliably verified. Current approaches either trust models to self-cite accurately, risking bias, or employ retrieval-augmented generation (RAG) that does not validate source accessibility, relevance, or factual consistency. We introduce the first source attribution evaluation framework that uses a reproducible AST parser to extract and evaluate inline citations from LLM-generated Markdown reports at scale. Unlike methods that verify claims in isolation, our framework closes the loop by retrieving the actual cited content, enabling human or model evaluators to judge each citation against its source. Citations are evaluated along three dimensions. (1) Link Works verifies URL accessibility, (2) Relevant Content measures topical alignment, and (3) Fact Check validates factual accuracy against source content. We benchmark 14 closed-source and open-source LLMs across three evaluation dimensions using rubric-based LLM-as-a-judge evaluators calibrated through human review. Our results reveal that even the strongest frontier models maintain link validity above 94% and relevance above 80%, yet achieve only 39-77% factual accuracy, while fewer than half of open-source models successfully generate cited reports in a one-shot setting. Ablation studies on research depth show that Fact Check accuracy drops by approximately 42% on 

Authors: Hailey Onweller, Elias Lumer, Austin Huber, Pia Ramchandani, Vamse Kumar Subbiah
Categories: cs.CL, cs.CL
