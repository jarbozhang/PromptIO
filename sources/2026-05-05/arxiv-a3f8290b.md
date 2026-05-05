---
title: 'FlexSQL: Flexible Exploration and Execution Make Better Text-to-SQL Agents'
url: 'https://arxiv.org/abs/2605.02815v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Quang Hieu Pham
  - Yang He
  - Ping Nie
  - Canwen Xu
  - Davood Rafiei
categories:
  - cs.CL
  - cs.CL
published: '2026-05-04T16:51:31Z'
fetched_at: '2026-05-05T09:52:13.895Z'
---
Text-to-SQL over large analytical databases requires navigating complex schemas, resolving ambiguous queries, and grounding decisions in actual data. Most current systems follow a fixed pipeline where schema elements are retrieved once upfront and the database is only revisited for post-hoc repair, limiting recovery from early mistakes. We present FlexSQL, a text-to-SQL agent whose core design principle is flexible database interaction: the agent can explore schema structure, inspect data values, and run verification queries at any point during reasoning. FlexSQL generates diverse execution plans to cover multiple query interpretations, implements each plan in either SQL or Python depending on the task, and uses a two-tiered repair mechanism that can backtrack from code-level errors to plan-level revisions. On Spider2-Snow, using gpt-oss-120b, FlexSQL achieves a 65.4\% score, outperforming strong open-source baselines that use stronger, larger models such as gpt-o3 and DeepSeek-R1. When integrated into a general-purpose coding agent (as skills in Claude Code), our approach yields over 10\% relative improvement on Spider2-Snow. Further analysis shows that flexible exploration and flexible execution jointly contribute to the effectiveness of our approach, highlighting flexibility as a key design principle. Our code is available at: https://github.com/StringNLPLAB/FlexSQL

Authors: Quang Hieu Pham, Yang He, Ping Nie, Canwen Xu, Davood Rafiei
Categories: cs.CL, cs.CL
