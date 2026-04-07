---
title: 'Show HN: Gemma Gem – AI model embedded in a browser – no API keys, no cloud'
url: 'https://github.com/kessler/gemma-gem'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-06T00:14:37.000Z'
fetched_at: '2026-04-07T09:57:45.594Z'
---
Gemma Gem is a Chrome extension that loads Google's Gemma 4 (2B) through WebGPU in an offscreen document and gives it tools to interact with any webpage: read content, take screenshots, click elements, type text, scroll, and run JavaScript.
You get a small chat overlay on every page. Ask it about the page and it (usually) figures out which tools to call. It has a thinking mode that shows chain-of-thought reasoning as it works.
It's a 2B model in a browser. It works for simple page questions and running JavaScript, but multi-step tool chains are unreliable and it sometimes ignores its tools entirely. The agent loop has zero external dependencies and can be extracted as a standalone library if anyone wants to experiment with it.
Comments URL: https://news.ycombinator.com/item?id=47655367
Points: 151
# Comments: 21
