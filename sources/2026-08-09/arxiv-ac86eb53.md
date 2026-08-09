---
title: >-
  Tytan: Interactive Neurosymbolic Construction of Analytic Semantic Schemas
  from Relational Data
url: 'https://arxiv.org/abs/2608.06331v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Donna Hooshmand
  - Shubham Shahi
  - Cameron Barrie
  - Abhratanu Dutta
  - Marko Sterbentz
categories:
  - cs.DB
  - cs.AI
  - cs.DB
published: '2026-08-06T17:40:26Z'
fetched_at: '2026-08-09T11:02:09.599Z'
---
From natural-language query interfaces to automated report generation, data analysis tools need a description of the data: the real-world entities it contains, which columns function as measures or identifiers, and how tables connect into units of analysis. Today, this semantic layer is usually written by hand. This is a knowledge-acquisition bottleneck that limits the scalability of analytic systems, keeps non-technical users dependent on experts, and is itself error-prone. We present TYTAN, a system for automatically constructing an analytic semantic schema from a relational database and, when available, a short user-provided description. TYTAN combines symbolic analysis of the database with LLM-based semantic inference for entity proposal, role assignment, and naming. When the evidence leaves a decision ambiguous, TYTAN asks the user a targeted natural-language question. We evaluate TYTAN on eight databases spanning real-world and benchmark domains along the three axes that define a schema's functional utility: (i) coverage, are all important entities and features captured?; (ii) retrieval correctness, do the schema's instructions actually reach the data; and (iii) characterization accuracy, are semantic types correct? Across the seven reference domains, TYTAN reaches every entity, attribute, and aggregable feature of the expert-corrected reference schemas (100% coverage). Additionally, 100% of its retrieval instructions execute correctly (1,678 of 1,678 self-generated cla

Authors: Donna Hooshmand, Shubham Shahi, Cameron Barrie, Abhratanu Dutta, Marko Sterbentz
Categories: cs.DB, cs.AI, cs.DB
