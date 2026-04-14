---
title: >-
  Show HN: Hormuz Havoc, a satirical game that got overrun by AI bots in 24
  hours
url: 'https://www.hormuz-havoc.com/'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-11T10:58:36.000Z'
fetched_at: '2026-04-14T00:33:04.100Z'
---
I built a satirical browser game to share with friends (Hormuz Havoc: you play an American president managing a crisis in the Middle East, only "loosely" inspired by current events). I had good fun making this, but that's not necessarily the interesting part.
The interesting part was that within a few hours of sharing it with my friends, some of them set about trying to overrun the leaderboard by launching a swarm of AI bots to learn the game and figure out how to get the highest score. This set off a game of cat-and-mouse as they found vulnerabilities and I tried patching them.
Within hours of sharing, someone used the Claude browser extension to read game.js directly. Large parts of the scoring formula, action effect values, and bonus thresholds were sitting in client-side JavaScript - this was a trivial thing even a human could've found, but a human would've still had to play the game, whereas the AI bot just optimised directly against the scoring formula. It meant that the first AI already scored 2.5x higher than the best human player by optimising directly against the source code rather than playing the game.
Straightforward fix: moved the entire game engine server-side. The client is now a dumb terminal, it sends an action ID, receives a rendered state. No scoring logic, no bonus thresholds, no action effects exist in the browser. The live score display uses a deliberately different formula as misdirection.
This increased the difficulty in finding bot-enabled hacks, so the subsequent bots tried brute-forcing the game, trying to game the RNG functions, and other methods.
But the next winning bot found a vulnerability where the same signed session token could be replayed. It would play turn N, observe a bad random event, replay the same token for turn N, get a different RNG outcome, keep the best one. Effectively branching from a single game state to cherry-pick lucky outcomes across 30 turns. Managed to 1.5x the previous bot's high score.
The bot's own descript
