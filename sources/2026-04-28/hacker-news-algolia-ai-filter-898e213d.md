---
title: 'Show HN: A Karpathy-style LLM wiki your agents maintain (Markdown and Git)'
url: 'https://github.com/nex-crm/wuphf'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-25T08:53:53.000Z'
fetched_at: '2026-04-28T02:04:18.413Z'
---
I shipped a wiki layer for AI agents that uses markdown + git as the source of truth, with a bleve (BM25) + SQLite index on top. No vector or graph db yet.
It runs locally in ~/.wuphf/wiki/ and you can git clone it out if you want to take your knowledge with you.
The shape is the one Karpathy has been circling for a while: an LLM-native knowledge substrate that agents both read from and write into, so context compounds across sessions rather than getting re-pasted every morning. Most implementations of that idea land on Postgres, pgvector, Neo4j, Kafka, and a dashboard.
I wanted to go back to the basics and see how far markdown + git could go before I added anything heavier.
What it does:
-> Each agent gets a private notebook at agents/{slug}/notebook/.md, plus access to a shared team wiki at team/.
-> Draft-to-wiki promotion flow. Notebook entries are reviewed (agent or human) and promoted to the canonical wiki with a back-link. A small state machine drives expiry and auto-archive.
-> Per-entity fact log: append-only JSONL at team/entities/{kind}-{slug}.facts.jsonl. A synthesis worker rebuilds the entity brief every N facts. Commits land under a distinct "Pam the Archivist" git identity so provenance is visible in git log.
-> [[Wikilinks]] with broken-link detection rendered in red.
-> Daily lint cron for contradictions, stale entries, and broken wikilinks.
-> /lookup slash command plus an MCP tool for cited retrieval. A heuristic classifier routes short lookups to BM25 and narrative queries to a cited-answer loop.
Substrate choices:
Markdown for durability. The wiki outlives the runtime, and a user can walk away with every byte. Bleve for BM25. SQLite for structured metadata (facts, entities, edges, redirects, and supersedes). No vectors yet. The current benchmark (500 artifacts, 50 queries) clears 85% recall@20 on BM25 alone, which is the internal ship gate. sqlite-vec is the pre-committed fallback if a query class drops below that.
Canonical IDs are first-class.
