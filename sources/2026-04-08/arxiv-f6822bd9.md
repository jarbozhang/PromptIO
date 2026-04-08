---
title: >-
  Paper Circle: An Open-source Multi-agent Research Discovery and Analysis
  Framework
url: 'https://arxiv.org/abs/2604.06170v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Komal Kumar
  - Aman Chadha
  - Salman Khan
  - Fahad Shahbaz Khan
  - Hisham Cholakkal
categories:
  - cs.CL
  - cs.CL
published: '2026-04-07T17:59:58Z'
fetched_at: '2026-04-08T02:58:13.561Z'
---
The rapid growth of scientific literature has made it increasingly difficult for researchers to efficiently discover, evaluate, and synthesize relevant work. Recent advances in multi-agent large language models (LLMs) have demonstrated strong potential for understanding user intent and are being trained to utilize various tools. In this paper, we introduce Paper Circle, a multi-agent research discovery and analysis system designed to reduce the effort required to find, assess, organize, and understand academic literature. The system comprises two complementary pipelines: (1) a Discovery Pipeline that integrates offline and online retrieval from multiple sources, multi-criteria scoring, diversity-aware ranking, and structured outputs; and (2) an Analysis Pipeline that transforms individual papers into structured knowledge graphs with typed nodes such as concepts, methods, experiments, and figures, enabling graph-aware question answering and coverage verification. Both pipelines are implemented within a coder LLM-based multi-agent orchestration framework and produce fully reproducible, synchronized outputs including JSON, CSV, BibTeX, Markdown, and HTML at each agent step. This paper describes the system architecture, agent roles, retrieval and scoring methods, knowledge graph schema, and evaluation interfaces that together form the Paper Circle research workflow. We benchmark Paper Circle on both paper retrieval and paper review generation, reporting hit rate, MRR, and Recall 

Authors: Komal Kumar, Aman Chadha, Salman Khan, Fahad Shahbaz Khan, Hisham Cholakkal
Categories: cs.CL, cs.CL
