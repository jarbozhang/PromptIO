---
title: >-
  I built barebrowse: give a local-model agent a browser without Playwright —
  pruned ARIA snapshots instead of raw HTML (far fewer tokens)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usg4cq/i_built_barebrowse_give_a_localmodel_agent_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T07:00:43.000Z'
fetched_at: '2026-07-10T23:01:38.136Z'
---
Author here, sharing something I built. If you run agents on a local model, feeding a whole page as raw HTML burns your context fast. barebrowse turns a URL into a pruned ARIA snapshot — the semantic tree with nav/ads/boilerplate stripped — so each page is a fraction of the tokens. Useful when the context window is your bottleneck.
  
No Playwright / bundled Chromium — it drives a browser you already have (Chrome/Brave/Edge/Chromium) directly over CDP.
 Pruned ARIA snapshot instead of raw HTML/DOM — far fewer tokens per page for the model to read.
 Reuses cookies from your real browser profile, so logged-in pages just work (no login scripting).
 Vanilla JS, ES modules, Node 22+, two tiny deps. Ships an MCP server + CLI, so it drops into local agent setups.
  
MIT, open source. Repo: https://github.com/hamr0/barebrowse — happy to take feedback or feature requests.
    submitted by    /u/Tight_Heron1730  
 [link]   [comments]
