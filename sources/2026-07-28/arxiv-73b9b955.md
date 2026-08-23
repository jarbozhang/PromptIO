---
title: >-
  A corrective agentic hybrid RAG and an operations-grounded evaluation for a
  scientific facility
url: 'https://arxiv.org/abs/2607.24663v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Rajat Sainju
  - Dariusz Jarosz
  - Hairong Shang
  - Michael Prince
  - Ryan M. Aydelott
categories:
  - physics.acc-ph
  - cs.AI
  - cs.IR
  - physics.acc-ph
published: '2026-07-27T17:01:30Z'
fetched_at: '2026-07-28T11:02:16.574Z'
---
Scientific user facilities accumulate decades of operational knowledge that no single search index covers: electronic logbooks, technical documents, internal wikis, operations chat messages, maintenance records, and live control-system data. We present APS-RAG, Advanced Photon Source Retrieval Augmented Generation, a deployed platform that makes the institutional knowledge at the Advanced Photon Source (APS) accessible to staff through natural-language queries, along with an operations-grounded evaluation. The retrieval engine fuses dense, sparse, and knowledge-graph (KG) channels with query-type-adaptive reciprocal-rank fusion, adds a corrective agentic loop, and runs a native-tool ReAct executor over a Model Context Protocol (MCP) tooling layer. We construct APS-Bench, a 50-question, question-answering (QA) dataset with auditable gold answers. Every retrieval-augmented variant numerically improves strict vital-nugget recall over a naive BM25 baseline (63.8%), with the full corrective Agentic GraphRAG scoring (70.3%). The cross-encoder reranker contributes significantly to answer quality: removing it and allowing the LLM to score relevance drastically reduces strict vital recall by 32.8%. The graph channel and corrective loop contribute positively as expected, but the performance gains are marginal. Additionally, we also compare the performance of open-source and closed-source LLMs in final answer synthesis. We release the APS-Bench construction methodology, the six-layer ev

Authors: Rajat Sainju, Dariusz Jarosz, Hairong Shang, Michael Prince, Ryan M. Aydelott
Categories: physics.acc-ph, cs.AI, cs.IR, physics.acc-ph
