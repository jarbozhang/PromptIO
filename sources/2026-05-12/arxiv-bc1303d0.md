---
title: 'DataMaster: Towards Autonomous Data Engineering for Machine Learning'
url: 'https://arxiv.org/abs/2605.10906v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yaxin Du
  - Xiyuan Yang
  - Zhifan Zhou
  - Wanxu Liu
  - Zixing Lei
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-11T17:46:24Z'
fetched_at: '2026-05-12T11:42:53.212Z'
---
As model families, training recipes, and compute budgets become increasingly standardized, further gains in machine learning systems depend increasingly on data. Yet data engineering remains largely manual and ad hoc: practitioners repeatedly search for external datasets, adapt them to existing pipelines, validate candidate data through downstream training, and carry forward lessons from prior attempts. We study task-conditioned autonomous data engineering, where an autonomous agent improves a fixed learning algorithm by optimizing only the data side, including external data discovery, data selection and composition, cleaning and transformation. The goal is to obtain a stronger downstream solution while leaving the learning algorithm unchanged. To address the open-ended search space, branch-dependent refinement, and delayed validation inherent in autonomous data engineering, we propose DataMaster, a data-agent framework that integrates tree-structured search, shared candidate data, and cumulative memory. DataMaster consists of three key components: a DataTree that organizes alternative data-engineering branches, a shared Data Pool that stores discovered external data sources for reuse, and a Global Memory that records node outcomes, artifacts, and reusable findings. Together, these components allow the agent to discover candidate data, construct executable training inputs, evaluate them through downstream feedback, and carry useful evidence across branches. We evaluate DataMa

Authors: Yaxin Du, Xiyuan Yang, Zhifan Zhou, Wanxu Liu, Zixing Lei
Categories: cs.LG, cs.AI, cs.LG
