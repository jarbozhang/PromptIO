---
title: >-
  Qwen3.6-27b-mtp-q8 successfully created an A* pathfinding implementation on a
  test game built in Java from scratch.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1umvwb9/qwen3627bmtpq8_successfully_created_an_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T01:28:47.000Z'
fetched_at: '2026-07-04T23:01:32.105Z'
---
I used Claude Code locally running this model. Took a surprisingly long amount of time to pull off. 
 This game is just a test game my friend is making and we're both vibecoding. He uses Codex due to lack of hardware for local models to do the graphics, UI and lighting, while I vibecode with this model on the gameplay, AI and technical sides of this game's functionality. We're just practicing to see the capabilities and limitations of vibecoding and how best apply them in future projects.
 I've been trying to get this model to vibecode an A* pathfinding algo since yesterday and I very nearly succeeded but ran into a bug where the game would crash if the player was too far away due to Index Errors. 
 Today was my second attempt and it took a lot longer than the first one. Why? Because I got the model to create a testing suite where the game would load a map and auto-pilot the player while the NPC spawns and chases after them. This series of iterative tests was %100 autonomous as the model would monitor logs in real-time while the game played in the background autonomously.
 The model would even refactor the code in real-time then re-launch the game on its own after each incremental update and I would step in from time to time to manually test it and point out anything it missed.
 Now this base class of NPC can climb over blocks, drop down from blocks and navigate around gaps and tall obstacles in a really smooth way. Finally, after nearly 12 hours of an auto-testing marathon (and a handful of manual tests), it managed to create an NPC that can make its way around the environment...most of the time.
    submitted by    /u/swagonflyyyy  
 [link]   [comments]
