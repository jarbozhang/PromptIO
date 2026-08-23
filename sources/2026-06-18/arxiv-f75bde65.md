---
title: 'Trade-offs in Medical LLM Adaptation: An Empirical Study in French QA'
url: 'https://arxiv.org/abs/2606.19266v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ikram Belmadani
  - Oumaima El Khettari
  - Carlos Ramisch
  - Frederic Bechet
  - Richard Dufour
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-06-17T16:42:22Z'
fetched_at: '2026-06-18T08:58:17.279Z'
---
The development of large language models (LLMs) has led to an increased focus on their adaptation to specialized domains and languages, yet the effectiveness of domain adaptation strategies remains unclear. We present a study of medical domain adaptation using French medical question-answering (QA) as a case study. We compare continual pretraining (CPT), supervised fine-tuning (SFT), and their combination across three model families, multiple sizes, and three initialization types, explicitly disentangling adaptation effects from base model choice. We evaluate both multiple-choice (MCQA) and open-ended QA (OEQA) under greedy and constrained decoding using automatic metrics and LLM-as-a-Judge evaluation. For MCQA, CPT+SFT most often achieves the best scores, but gains over SFT are small and frequently not statistically significant, making SFT a strong and cost-effective default. For OEQA, CPT consistently improves overlap-based metrics, while SFT often degrades generation quality; instruction tuning and CPT+SFT are preferred by LLM-based evaluation. Cross-lingual experiments further show effective transfer from French adaptation to English benchmarks. Overall, we provide practical guidelines for selecting adaptation strategies under computational constraints.

Authors: Ikram Belmadani, Oumaima El Khettari, Carlos Ramisch, Frederic Bechet, Richard Dufour
Categories: cs.CL, cs.AI, cs.CL
