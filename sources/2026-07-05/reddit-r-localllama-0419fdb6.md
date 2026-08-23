---
title: >-
  A fully local, self-hosted repo index for coding agents (Rust, MIT, runs
  offline)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1un430x/a_fully_local_selfhosted_repo_index_for_coding/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T08:54:19.000Z'
fetched_at: '2026-07-04T23:01:32.107Z'
---
If you run local models for coding, feeding them repo context without blowing the context window is half the battle. I built basemind to index a repo locally and serve it over MCP: a code map across 300+ languages, git history and blame, and document RAG over 90+ formats, all on your machine, no cloud.
 The query tools return signatures and line numbers instead of whole files, so a structural question costs a fraction of the tokens of reading source, which matters more when your context budget is tight. There's an expand tool to fetch a full function body only when needed.
 It runs as an MCP server, a CLI, or a Claude Code plugin over one local index. Rust, MIT.
 Honest limitation: the index lags edits between scans (watch mode + rescan handle most of it), and the first cold scan of a big repo takes a bit.
 https://github.com/Goldziher/basemind
 Curious how folks here are wiring repo context into local coding setups.
    submitted by    /u/Goldziher  
 [link]   [comments]
