---
title: 'Evalatro: an open benchmark where LLMs play the real Balatro'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u6qso1/evalatro_an_open_benchmark_where_llms_play_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-15T19:32:43.000Z'
fetched_at: '2026-06-16T06:31:40.319Z'
---
Hey! I made Evalatro - an open benchmark where your LLMs play actual Balatro. Real game.
 It started because I kept asking Claude to help me beat levels while playing (yeah, I'm too weak). I'd just throw screenshots at it and ask for tactics.
 Then the idea grew into something bigger and I decided to dig a little deeper.
 Dug in...
 First I wanted to build an MCP through mods, turns out something already exists - balatrobot (respect to the author). And so it began.
 The model connects to the game and on each turn gets the state as a text structure, not a picture, and decides what to play on its own. No tactical hints.
 What's there already:
 - fixed seeds for reproducibility — every model sees the same deals
 - the real Balatro + Steamodded + balatrobot
 - a live viewer and a public leaderboard
 - your run results get sent to a public dashboard at the end of a run (zero private info — no keys, no paths; source is open)
 - the score is computed by the server, not the client, so you can't fake it
 - the benchmark goal is to clear Ante 12 (picked it kind of arbitrarily, open to debate), not just win the base-game Ante 8
 - auto-install on Windows/macOS
 - you can watch the model's reasoning (that part's fun) and replay every run
 - before a run it sets up a separate game profile with EVERYTHING unlocked so the model isn't limited (your main save is left untouched)
 I've only run a couple of models so far, just a little, so treat it as poking around, not a ranking. But it's already funny: nobody got anywhere near Ante 12. The leader, mimo-v2.5-pro, crawled to Ante 5. There was also deepseek-v4-pro, which couldn't beat the boss on ante 8, but I lost the results after the leaderboard update. So the challenge is wide open - come watch the models suffer.
 Would love feedback from Balatro players and the LLM crowd: is Ante 12 a sane bar or overkill? What else is worth measuring besides "reached / didn't reach"? How do I close the holes so the bench can't be cheated? I'm not 
