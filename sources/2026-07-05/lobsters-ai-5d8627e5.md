---
title: 'Better Models: Worse Tools'
url: 'https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/'
source: Lobsters AI
source_type: rss
language: en
published: '2026-07-04T21:51:19.000Z'
fetched_at: '2026-07-04T23:01:30.397Z'
---
A rare case where I want to put a post of mine here. Reason being that I was hunting down tool calling behavior regressions with the latest generation of Anthropic models and I found the resulting behavior both puzzling and quite problematic. Those models appear to be strongly RL'ed on their own Claude Code harness which is closed source, and when you come close in tool declarations but slightly off, you can now expect to get broken tool call behavior when older models did not yet have that defect.
Thought this might be interesting for folks here.
Comments
