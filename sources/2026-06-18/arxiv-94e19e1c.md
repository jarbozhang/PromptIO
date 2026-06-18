---
title: Explaining Attention with Program Synthesis
url: 'https://arxiv.org/abs/2606.19317v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Amiri Hayes
  - Belinda Li
  - Jacob Andreas
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-17T17:40:55Z'
fetched_at: '2026-06-18T08:58:17.276Z'
---
A longstanding goal of research on interpretable deep learning is to replace opaque neural computations with human-meaningful symbolic descriptions. In this paper, we propose an approach for approximating the behavior of components of deep networks with executable programs. We focus on attention heads in transformer language models. For a given head, we first compute its associated attention matrices on a collection of randomly selected training examples. Next, we prompt a pre-trained language model with a summary of these matrices, and instruct it to generate a set of Python programs that can reproduce the associated attention patterns given only text from the input sentence. Finally, we re-rank programs according to how well our final set of programs predict behavior on held-out inputs. We demonstrate that a set of fewer than 1,000 such generated programs can reproduce the attention patterns of heads in GPT-2, TinyLlama-1.1B, and Llama-3B, achieving an average Intersection-over-Union similarity above 75% on TinyStories. Moreover, the best-fit programs can replace neural attention heads without substantially affecting model behavior: replacing 25% of attention heads with programmatic surrogates across the three models incurs only a 16% average perplexity increase, while maintaining performance on a variety of downstream question answering benchmarks. This work contributes a scalable pipeline for reverse-engineering attention heads in transformer models using human-readable, 

Authors: Amiri Hayes, Belinda Li, Jacob Andreas
Categories: cs.LG, cs.AI, cs.LG
