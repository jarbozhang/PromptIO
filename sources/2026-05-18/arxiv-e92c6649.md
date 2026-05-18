---
title: 'MeMo: Memory as a Model'
url: 'https://arxiv.org/abs/2605.15156v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ryan Wei Heng Quek
  - Sanghyuk Lee
  - Alfred Wei Lun Leong
  - Arun Verma
  - Alok Prakash
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-05-14T17:51:34Z'
fetched_at: '2026-05-18T00:51:02.181Z'
---
Large language models (LLMs) achieve strong performance across a wide range of tasks, but remain frozen after pretraining until subsequent updates. Many real-world applications require timely, domain-specific information, motivating the need for efficient mechanisms to incorporate new knowledge. In this paper, we introduce MeMo (Memory as a Model), a modular framework that encodes new knowledge into a dedicated memory model while keeping the LLM parameters unchanged. Compared to existing methods, MeMo offers several advantages: (a) it captures complex cross-document relationships, (b) it is robust to retrieval noise, (c) it avoids catastrophic forgetting in the LLM, (d) it does not require access to the LLM's weights or output logits, enabling plug-and-play integration with both open and proprietary closed-source LLMs, and (e) its retrieval cost is independent of corpus size at inference time. Our experimental results on three benchmarks, BrowseComp-Plus, NarrativeQA, and MuSiQue, show that MeMo achieves strong performance compared to existing methods across diverse settings.

Authors: Ryan Wei Heng Quek, Sanghyuk Lee, Alfred Wei Lun Leong, Arun Verma, Alok Prakash
Categories: cs.CL, cs.AI, cs.LG, cs.CL
