---
title: 'ASMR-Bench: Auditing for Sabotage in ML Research'
url: 'https://arxiv.org/abs/2604.16286v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Eric Gan
  - Aryan Bhatt
  - Buck Shlegeris
  - Julian Stastny
  - Vivek Hebbar
categories:
  - cs.AI
  - cs.AI
published: '2026-04-17T17:47:32Z'
fetched_at: '2026-04-21T00:54:57.866Z'
---
As AI systems are increasingly used to conduct research autonomously, misaligned systems could introduce subtle flaws that produce misleading results while evading detection. We introduce ASMR-Bench (Auditing for Sabotage in ML Research), a benchmark for evaluating the ability of auditors to detect sabotage in ML research codebases. ASMR-Bench consists of 9 ML research codebases with sabotaged variants that produce qualitatively different experimental results. Each sabotage modifies implementation details, such as hyperparameters, training data, or evaluation code, while preserving the high-level methodology described in the paper. We evaluated frontier LLMs and LLM-assisted human auditors on ASMR-Bench and found that both struggled to reliably detect sabotage: the best performance was an AUROC of 0.77 and a top-1 fix rate of 42%, achieved by Gemini 3.1 Pro. We also tested LLMs as red teamers and found that LLM-generated sabotages were weaker than human-generated ones but still sometimes evaded same-capability LLM auditors. We release ASMR-Bench to support research on monitoring and auditing techniques for AI-conducted research.

Authors: Eric Gan, Aryan Bhatt, Buck Shlegeris, Julian Stastny, Vivek Hebbar
Categories: cs.AI, cs.AI
