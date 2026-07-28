---
title: 'ERUnderstand: Evaluating Vision-Language Models on Structured ER Diagrams'
url: 'https://arxiv.org/abs/2607.24707v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ali Ansari
  - Yasmin Mohammadi
  - Farnoush Nili
  - Parsa Esmaeilkhani
  - Longin Jan Latecki
categories:
  - cs.AI
  - cs.CV
  - cs.DB
  - cs.AI
published: '2026-07-27T17:46:43Z'
fetched_at: '2026-07-28T11:02:16.572Z'
---
Entity-Relationship Diagrams (ERDs) are central to conceptual database design, yet they are typically available only as rendered images rather than machine-readable schemas, limiting AI-assisted database engineering. We introduce ERUnderstand, the first large-scale benchmark for structured understanding of ER diagrams, comprising 2,960 diagrams collected from curated educational sources, real-world schemas, and synthetically generated examples spanning diverse domains, notations, complexity levels, and Extended Entity-Relationship (EER) constructs. Each diagram is paired with a standardized machine-readable representation for fine-grained evaluation of schema elements. Evaluating state-of-the-art Vision-Language Models (VLMs), we find that while common ERD elements are recovered reliably (F1 &gt; 0.74), performance drops sharply on weak entities (as low as 0.28 F1), multivalued attributes (0.14 F1), and N-ary relationships (0.07 F1). Reasoning-augmented models improve overall performance by 15-25% but remain sensitive to linguistic priors and increasing diagram complexity. ERUnderstand provides a standardized benchmark for evaluating multimodal understanding of conceptual database schemas. The benchmark, dataset, evaluation toolkit, and generation code are publicly available at https://github.com/salinaria/ERUnderstand.

Authors: Ali Ansari, Yasmin Mohammadi, Farnoush Nili, Parsa Esmaeilkhani, Longin Jan Latecki
Categories: cs.AI, cs.CV, cs.DB, cs.AI
