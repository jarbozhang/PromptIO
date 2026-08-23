---
title: 'CPU-only GLM 5.2: Epyc and 512GB RAM'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uiqiqc/cpuonly_glm_52_epyc_and_512gb_ram/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T12:01:16.000Z'
fetched_at: '2026-06-29T23:01:34.483Z'
---
This is just a preview of some content I'm putting together to share with you all. I have a server I've put together and I'm testing the 4-bit version of GLM 5.2 (GLM-5.2-UD-Q4_K_XL). This is an Epyc Rome 7452 with 512GB of RAM.
 TLDR: This is the unedited prompt, response and code
 I set it to Medium Reasoning. The prompt (I borrowed from another post):
 ``` Build a 3D arena game as a SINGLE self-contained .html file.
 STACK (mandatory): - Three.js loaded from a CDN (one <script> tag). No other JS libraries, no build step. - All HTML, CSS, and JS in this one file. It must run by opening it directly in a browser.
 CORE SPEC (mandatory — implement all of this exactly): 1. A flat ground plane forming a bounded arena. The player cannot leave its bounds. 2. A player object on the ground. WASD moves it (camera-relative); movement has momentum, not instant stop/start. 3. A third-person camera that smoothly follows behind the player. 4. Collectible glowing orbs spawn at random positions. Touching one collects it (+10 score) and spawns a new one. 5. Enemy objects spawn at the arena edges and move toward the player. Contact with the player costs 1 life. 6. Player starts with 3 lives. A HUD shows score and lives at all times. 7. At 0 lives: a game-over screen showing final score, with a key press to restart. 8. Difficulty ramps over time (enemies spawn faster and/or move faster).
 STRETCH (strongly encouraged — you will be judged on this): Beyond the core, make it feel PREMIUM. Lighting, shadows, particles, juice, smooth camera, satisfying feedback, polished HUD, atmosphere. Add depth or complexity if it improves the experience. Aim to genuinely impress — this is evaluated on visual quality and feel, not just correctness.
 RULES: - Implement the full core before adding stretch features. - Output the complete, ready-to-run .html file. ```
 The reply took 2 hours 29 minutes and generated 15,510 tokens.
 I'm seriously surprised by the quality of the answer.
 Let me know if you h
