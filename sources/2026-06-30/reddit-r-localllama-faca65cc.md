---
title: GLM 5.2 Q1_S vs Qwen 27B Q8
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uimjdi/glm_52_q1_s_vs_qwen_27b_q8/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T08:23:55.000Z'
fetched_at: '2026-06-29T23:01:34.477Z'
---
TL;DR; GLM-5.2 Q1_S beats Qwen 3.6 27B Q8, both run at KV Q8
 edit: GLM run a K & V Q8, Qwen run with KV cache at full FP16., with preserve thinking on. 
 Disclaimer: This is a hobby/amateur comparison with n=1, so go easy on it. I just thought it would be fun to share.
 The Context and The Task
 Some time ago there were quite a few discussions on what's better: a lower quant of a larger model, or a higher quant of a smaller model. We got quite a few benchmarks and in-house tests, which were mostly consistent — the larger model at a lower quant was better.
 Nowadays I often see claims of anything lower than Q3 being 'braindead' regardless of the actual size. I've also noticed some comments belittling people who share how they've managed to run huge models on their consumer-grade hardware, just because it was a low quant.
 So, I did a little test. Beloved Qwen 27B at Q8 vs 'braindead' GLM 5.2 at Q1_S. The Q1_S is the smallest quant I could find, but I really wouldn't be able to run Q2 anyway.
 My hardware is 2 x RTX 3090, 24GB VRAM each (limited to 200W power) and 192 GB DDR5 RAM. I run Qwen at ~60 tps gen, and GLM at ~6 tps at low context down to 3 tps nearing 100k context.
 I picked a simple tech stack and clear instructions, so that there would be as little variance due to instruction ambiguity as possible.
 Both models were run under the pi harness, with the exact same config and prompts. The instruction was to build a simple 3D game in Three.js (HTML/CSS/JS); the full content is attached at the end.
 This is the second attempt at this test. The first one was not documented and used a different tech stack, but the results were practically the same.
 Qwen 3.6 27B
 It went quick, that's for sure — just a couple of minutes and ~20k tokens. But it failed to build a working product. After instructing it to fix it, it was 'working' but still not playable; it required another 2 prompts to make it 'done'. So in total: 1 initial + 3 follow-ups, with a total of ~42k tokens
