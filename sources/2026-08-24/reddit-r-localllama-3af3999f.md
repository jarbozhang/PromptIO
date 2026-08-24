---
title: Qwen3.5-9B Triple-Loop
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1vw6nba/qwen359b_tripleloop/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T13:02:37.000Z'
fetched_at: '2026-08-24T11:01:49.506Z'
---
I was fascinated by Nanbeige's outstanding performance for its size, so I started digging into how much a model can improve its own representation just by looping over itself (for fun). My prototype was a Qwen3-0.6B with a full dual loop in the middle layers, inspired by the Nanbeige 4.2 architecture. Digging further, I found that the Nanbeige team has a paper describing their 4.5 architecture, which uses a triple loop in the middle layers — that made sense to me, so I tried it.
 Lordnyx/qwen3.5-9b-triple-loop-fase1 · Hugging Face
 The first experiment used full DeltaNet for the middle layers, so the earlier part of the model would set up the context for the loop to process on its own. It turned out that this actually worked better than having multiple separate logic components — but the loop itself wasn't really contributing. Because of DeltaNet's nature and the small hidden size, the model kept forgetting essential details for the task and just hallucinated. I abandoned the DeltaNet idea, and full softmax attention in the loop worked as expected instead.
 Later, I learned (with help from ChatGPT/Claude/Gemini) that my training setup was actually undermining the loop's contribution, and that I should have used a lower, dedicated learning-rate schedule for it. Once I fixed that, the loop stopped just "refining" answers and started actually participating — becoming essential to them. Even better: on easy-enough questions, the loop could be skipped entirely.
 Recently I found Modal — $30 of free GPU credit. I used it to train a Qwen3.5-9B with the Nanbeige-4.5-style triple loop. I really wanted to use RL for this, but I can barely get RL to run efficiently even on a 0.6B locally, let alone a 9B — so instead I distilled Qwen3.8-27B's logits into the loop, on a heuristically curated agentic/reasoning dataset.
 Money ran out before finishing the schedule: the training loop was capped by wall-clock time (a safety mechanism so it would export cleanly instead of dying mid-r
