---
title: 'Same model, same prompt, 4 different agents'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ucmndc/same_model_same_prompt_4_different_agents/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T14:49:05.000Z'
fetched_at: '2026-06-23T01:34:58.965Z'
---
Setup: one self-hosted Qwen3.6-27B (Q4) on llama.cpp, identical prompt, identical hardware. The only variable is the agent scaffolding. Agents tested: pi, opencode, hermes, qwen code. 
 Task: a single-file 2D canvas solar system with scripted orbits and gravity that acts only on user-launched comets.
 The exact prompt (note the explicit "build incrementally, your context window is small" instruction):
 Build a 2D solar system simulation as a self-contained HTML file using <canvas> and vanilla JavaScript (no external libraries). Scene - The Sun is fixed at the center of the canvas. - Several planets orbit the Sun on stable circular/elliptical paths. Planets and the Sun do NOT gravitationally affect each other — their orbits are fixed/scripted, not physically simulated against one another. - Pure 2D, top-down view. Make the canvas resize to the window. Gravity model - The Sun and every planet each have a gravitational mass proportional to their visual radius (bigger body = stronger gravity), matching real-world relative sizes as closely as reasonable. - This gravity only acts on comets (see below). It does NOT act on the planets or the Sun. Comets - The user can launch a comet by clicking and dragging on the canvas: drag direction and length set the comet's initial velocity vector (release to launch). - Comets ARE affected by the combined gravity of the Sun and all planets (sum of forces), so they curve and can slingshot. - Each comet draws a fading trail behind it. - Remove comets when they fly far off-screen. Controls - A slider (range input) that scales the gravity strength of ALL bodies up and down proportionally in real time. Constraints (important — your context window is small): - Do NOT write one huge file in a single shot. Build it incrementally in small pieces. - Keep the code compact and readable. Avoid unnecessary comments and verbosity. - After finishing, tell me the filename so I can open it in a browser. 
 Results: all 4 produced a working sim, but the 
