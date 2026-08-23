---
title: >-
  Breaking Database Lock-in: Agentic Regeneration of High Performance Storage
  Readers for Database Bypass
url: 'https://arxiv.org/abs/2607.07696v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Victor Giannakouris
  - Immanuel Trummer
categories:
  - cs.DB
  - cs.AI
  - cs.DB
published: '2026-07-08T17:55:00Z'
fetched_at: '2026-07-09T23:02:05.090Z'
---
Analytical workloads operating on data stored in external database systems face a fundamental bottleneck: data access is guarded entirely by the database driver, like JDBC or ODBC, forcing all reads through query execution and other driver layers that are not designed for bulk columnar analytics. We present Jailbreak, an approach that bypasses the database engine entirely by reading storage files directly and materializing data as in-memory columnar buffers. Jailbreak's key insight is that database file formats, while complex, are fully specified by their source code and documentation, artifacts that Large Language Models (LLMs) can ingest to regenerate operator-specific table reading components without human-engineered parsing logic. Jailbreak leverages LLM-assisted code synthesis for database storage decoding, turning a traditionally opaque format into a directly queryable artifact. We evaluate Jailbreak on PostgreSQL and MySQL storage files, targeting analytical snapshot scenarios common in read replicas and offline processing pipelines. The generated reader produces Apache Arrow buffers consumable directly by most of the widely known query engines, including DuckDB, Apache Spark, and GPU-accelerated frameworks such as cuDF and Spark RAPIDS. We validate correctness against JDBC/ODBC-based baselines using the TPC-H benchmark across all query results, and demonstrate significant performance improvements in end-to-end analytical throughput, achieving up to 27x speedups. Our r

Authors: Victor Giannakouris, Immanuel Trummer
Categories: cs.DB, cs.AI, cs.DB
