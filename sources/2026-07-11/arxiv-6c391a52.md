---
title: 'Workflow as Knowledge: Semantic Persistence for LLM-Mediated Workflows'
url: 'https://arxiv.org/abs/2607.08740v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Emanuele Quinto
  - Carlo Andrea Rozzi
  - Francesco Zanitti
categories:
  - cs.AI
  - cs.PL
  - cs.SE
  - cs.AI
published: '2026-07-09T17:40:46Z'
fetched_at: '2026-07-10T23:02:58.068Z'
---
Large language model (LLM) applications increasingly use explicit workflows for tool use, retrieval, branching, checkpointing, and human approval. Existing workflow systems already address many execution concerns. This paper proposes a Lisp-inspired but language-independent conceptual model: symbolic forms, object identity, and live-image thinking are used as explanatory lenses, not implementation commitments. In this model, workflow definitions, workflow instances, inference records, context snapshots, and dependency relations are represented as persistent knowledge objects in a shared knowledge substrate. Its central semantic distinction is between derive and infer: derive is deterministic computation over available state; infer is mediated LLM judgment under declared context and executor-controlled capability policy. The result is a preliminary conceptual account of semantic persistence: workflows do not merely produce knowledge and leave traces, but can themselves be represented as inspectable, resumable, and reviewable knowledge objects, while formal transition semantics remain future work.

Authors: Emanuele Quinto, Carlo Andrea Rozzi, Francesco Zanitti
Categories: cs.AI, cs.PL, cs.SE, cs.AI
