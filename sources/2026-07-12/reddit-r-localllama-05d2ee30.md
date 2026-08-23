---
title: >-
  Follow-up: what I learned scaling a SQLite/FTS5 patent database from 3.5M to
  5.36M records
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utl6r5/followup_what_i_learned_scaling_a_sqlitefts5/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T14:11:53.000Z'
fetched_at: '2026-07-11T23:01:42.043Z'
---
A few months ago I posted about classifying 3.5M US patents with Nemotron 9B on a single RTX 5090. This is a follow-up on the data-engineering side. Disclosure up front: I'm a patent lawyer who started coding in Dec 2025, and I build and run the site
 mentioned at the end (free, no signup, no ads — it's a hobby project).
 Things that might save you time:
 - PatentsView moved to the USPTO Open Data Portal in March 2026. The old S3 download links are dead. Abstracts also got split out of g_patent into their own table.
 - Run ANALYZE after bulk-loading. A correlated EXISTS kept picking the wrong index on a 108M-row citation table: 34s per query → 0.16s after ANALYZE.
 - Wide rows punish UPDATEs. My rows average 19KB, so mass-updating a column ≈ rewriting the whole 119GB table. Side tables + JOIN instead.
 - AND beats OR for BM25 at this scale. OR across 3 common words made FTS5 score ~1M candidates; AND/phrase intersection cuts that to thousands. Measured on the live 5.36M-record DB:
  
 Query Behavior Time 
  
 battery management thermal all words must match (AND) 0.48s 
  "battery management" thermal phrase AND word 0.27s 
  "battery management" OR BMS explicit OR still supported 0.70s 
  no-hit query honest 0 results, no fallback 0.05s 
 
 Current state: 5.36M patents (2010–2025), 108M-edge citation graph, disambiguated assignees, USPTO's AIPD AI-patent flags. Next step is Nemotron-tagging the 1.9M newly added records.
 Demo: https://patentllm.org 
    submitted by    /u/Impressive_Tower_550  
 [link]   [comments]
