---
title: Multilingual Reasoning Cascades Need More Context
url: 'https://arxiv.org/abs/2606.27306v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arnav Mazumder
  - Dengjia Zhang
  - Shuyue Stella Li
  - Yulia Tsvetkov
  - Niyati Bafna
categories:
  - cs.CL
  - cs.CL
published: '2026-06-25T17:26:46Z'
fetched_at: '2026-06-28T23:02:11.930Z'
---
Translation cascades for reasoning translate the query from another language to English, reason in English, and translate the answer back to the original language. This is a competitive approach to multilingual reasoning, but structurally lossy, since each stage discards information later stages may need, including cues for cultural grounding, register, and disambiguation. We examine the benefits of a simple and training-free intervention: a context-aware translation cascade, which additionally provides the original question, the English translated question, and the reasoning trace to the context of the final translation module. We evaluate gains across nine multilingual benchmarks including various task types, three backbone models, and 285 high-, mid-, and low-resource languages, and demonstrate strong gains for open-ended generation across models and resource regimes. We show that the original language question carries most of the beneficial context. Our study emphasizes the need to better design information flow in machine translation cascades for mitigating error propagation, and provides a simple and actionable default strategy: preserve the original user question until the end of the pipeline.

Authors: Arnav Mazumder, Dengjia Zhang, Shuyue Stella Li, Yulia Tsvetkov, Niyati Bafna
Categories: cs.CL, cs.CL
