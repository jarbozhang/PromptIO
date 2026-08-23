---
title: >-
  Headless screenshot loops let a local 30B agent finish a raytraced FPS demo in
  pure C
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u89f2q/headless_screenshot_loops_let_a_local_30b_agent/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-17T12:55:28.000Z'
fetched_at: '2026-06-18T08:56:38.993Z'
---
Some background so this is honest. Over the past few months I ran a lot of oneshot experiments with single file three.js games. Minecraft clones, that kind of thing. I picked those on purpose because they sit deep in the training data and are trivial to debug by eye. The goal was never a quality comparison. I wanted a class of problems that oneshots cheaply and that I can inspect visually and from logs, so I could tune the harness, the system prompt and the tool calling.
 This week I made it harder. I had Claude Code on Opus 4.8 and a local Qwen3.6 27B agent both write a small raytraced FPS demo in C, standard library only.
 Yes, C raytracers are in the training data too. Rarer than three.js, but they are there. And let us be honest, before LLMs most of us were doing pattern reuse anyway. Stack Overflow, docs, copy the shape that works, adapt it. Reusing a good pattern is not cheating, it is the job. So that is not the point.
 The point is one prompt change. Both struggled to oneshot this. Then I added a single requirement. The compiled binary had to ship a headless mode where the agent could inject keyboard and mouse input and trigger a screenshot at a chosen frame.
 That flipped it. The model worked out on its own that it should time the screenshots around the events it wanted to inspect. Fire a rocket, capture the frame right at impact, look at the particle and debris effects, fix what is wrong, run again. It built itself a recursive visual debugging loop.
 The frontier model finishing is not surprising. Qwen3.6 27B closing the same loop on its own is the part that stuck with me. I learned C from scratch back in the day, so watching a small local agent debug a raytracer by looking at its own screenshots was not what I expected this size of model to pull off. It costs you though. Longer runtime, a lot more tokens, more wall clock per iteration.
 This reads more as a prompting lesson than a model lesson. Give the agent a way to see the result and let it pick when t
