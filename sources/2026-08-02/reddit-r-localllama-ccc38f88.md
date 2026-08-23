---
title: Ran DS V4-Flash-0731 Locally on 3xMI50 32GB @ ~15 t/s TG
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vd51ey/ran_ds_v4flash0731_locally_on_3xmi50_32gb_15_ts_tg/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T01:49:36.000Z'
fetched_at: '2026-08-02T11:00:59.750Z'
---
Hey y'all. I'll be concise.
 TL;DR:
 DS V4-Flash-0731 @ UD-IQ2_M running fully in VRAM on 3xMI50s (90.9 GB model, 96 GB VRAM).
 Actual speed on llama-server is:
 - Text Generation: ~15-16 tokens/second stable. Never dipped below 14 tokens/second, even when the model was spitting out a 30K token long reply.
 - Prompt Processing: ~105-110 tokens/second or so. Dipped down on prompt processing of smaller token-length prompts, which is pretty typical of course.
 llama-server CLI logs, for those interested: https://pastebin.com/nXy9v0x8
 I had a brief conversation with the model. Seemed mostly good. At a glance, I noticed 1 mistake: It mixed up the MI50's memory bandwidth (1 TB/s) with PCIe 4.0's bidirectional bandwidth (64 GB/s).
 For those interested, I exported the conversation .jsonl from llama-server's web UI. You can find it here: https://pastebin.com/CwHm5cTf
 I only ran a single coding test, as I don't have too much time to thoroughly evaluate the quality of the quant right now. The test I ran is copied from this post by u/perelmanych from 16 hours ago. Specifically, the rubik's cube test that was shown and coded by DS V4-Flash-0731 through DeepSeek's official API, so I'm guessing it's the full precision model. For a given definition of full precision; it's natively FP4 + FP8 mixed precision. Here is the prompt (same as the one from the aforementioned post) that was used:
 Create a single HTML file with a canvas animation: a 3D Rubik's Cube rendered with simulated perspective on the 2D canvas (no WebGL, no libraries). Orientation: white on top, green facing front, red on the right. Use standard notation: /F/B = clockwise quarter turn of the right/left/up/down/front/back face (viewed from that face), an apostrophe = counterclockwise. Sequence: (1) Show the solved cube slowly rotating for 2 seconds. (2) Scramble it with exactly these 10 animated face turns, one at a time: R, U, F', D, L', B, R', U', F, D'. (3) Pause 2 seconds. (4) Solve it with exactly these 10 anim
