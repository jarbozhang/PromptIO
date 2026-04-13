---
title: >-
  RecaLLM: Addressing the Lost-in-Thought Phenomenon with Explicit In-Context
  Retrieval
url: 'https://arxiv.org/abs/2604.09494v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kyle Whitecross
  - Negin Rahimi
categories:
  - cs.CL
  - cs.AI
  - cs.IR
  - cs.LG
  - cs.CL
published: '2026-04-10T17:04:32Z'
fetched_at: '2026-04-13T08:33:54.776Z'
---
We propose RecaLLM, a set of reasoning language models post-trained to make effective use of long-context information. In-context retrieval, which identifies relevant evidence from context, and reasoning are deeply intertwined: retrieval supports reasoning, while reasoning often determines what must be retrieved. However, their interaction remains largely underexplored. In preliminary experiments on several open-source LLMs, we observe that in-context retrieval performance substantially degrades even after a short reasoning span, revealing a key bottleneck for test-time scaling that we refer to as lost-in-thought: reasoning steps that improve performance also make subsequent in-context retrieval more challenging. To address this limitation, RecaLLM interleaves reasoning with explicit in-context retrieval, alternating between reasoning and retrieving context information needed to solve intermediate subproblems. We introduce a negligible-overhead constrained decoding mechanism that enables verbatim copying of evidence spans, improving the grounding of subsequent generation. Trained on diverse lexical and semantic retrieval tasks, RecaLLM achieves strong performance on two long-context benchmarks, RULER and HELMET, significantly outperforming baselines. Notably, we observe consistent gains at context windows of up to 128K tokens using training samples of at most 10K tokens, far shorter than those used by existing long-context approaches, highlighting a promising path toward impr

Authors: Kyle Whitecross, Negin Rahimi
Categories: cs.CL, cs.AI, cs.IR, cs.LG, cs.CL
