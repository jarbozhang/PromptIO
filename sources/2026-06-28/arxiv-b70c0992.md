---
title: >-
  Mapping Political-Elite Networks in Europe with a Multilingual Joint
  Entity-Relation Extraction Pipeline
url: 'https://arxiv.org/abs/2606.27347v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kirill Solovev
  - Jana Lasser
categories:
  - cs.CL
  - cs.CL
published: '2026-06-25T17:51:59Z'
fetched_at: '2026-06-28T00:49:08.583Z'
---
Whether political elites organise into rent-seeking coalitions that capture public resources or civic networks that sustain governance is a central question in comparative politics. Yet observing these complex, informal, and adversarial ties at scale has historically required intensive manual coding, while automated text-as-data methods have largely been limited to simple co-occurrence. Recent large language model (LLM) approaches offer a path forward but often rely on proprietary APIs, lack cross-lingual capability, and struggle with scalable entity resolution. We present a modular, fully open-weight pipeline for multilingual joint entity-relation extraction that builds signed, temporal knowledge graphs from massive unstructured news corpora. It combines span-based named-entity recognition (NER) with a three-stage linking cascade mapping mentions to language-independent Wikidata identifiers; a high-throughput, ontology-constrained mixture-of-experts model then uses guided decoding to extract directed, signed relationships grounded in a domain ontology. A full-coverage spot-check against a 3491-relation gold standard shows high textual correctness (68.2% strict to 93.7% lenient). Two large-scale case studies validate the pipeline against the public record. In Austria, it reconstructs a political party's complete lifecycle, dating internal fractures and tracking personnel into successor factions and court convictions. In a Polish corpus, it uncovers the overlapping economic an

Authors: Kirill Solovev, Jana Lasser
Categories: cs.CL, cs.CL
