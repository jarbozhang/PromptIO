---
title: >-
  A barebones CPU-only inference engine for Qwen 3, written from scratch in pure
  C
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uht9rf/a_barebones_cpuonly_inference_engine_for_qwen_3/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T09:58:10.000Z'
fetched_at: '2026-06-28T23:00:58.423Z'
---
TL;DR: The (very messy) code and writeups can be found at https://github.com/jakint0sh/qwen3-engine
 Read the README for instructions on how to get started.
 And for those who just want a bulleted list: - Inference engine for Qwen 3 sizes 4B and below - Written from scratch in pure C - No dependencies except libc, libm, and cJSON (and OpenMP if compiled with parallelization) - Loads directly from HF safetensors, does 4-bit affine quant on the fly - Does KV caching - Built-in chat interface - Very slow, but the code is readable and tractable, and would be good to learn from
 And now for the blab-fest...
 So, as the title would suggest, I wrote my own LLM inference engine, specifically targeting the smaller Qwen 3 models, from scratch in pure C. Now, you may very well ask why anyone would do such a thing. It was partly a learning experience for me, since I didn't know how LLMs worked and I wanted to learn, and partly it was that I was challenged to write my own inference engine, and I decided I wasn't going to take the easy way out and glue python libraries together. I'm a decent C programmer, and figured that C would be a good choice to attack the problem with since you need speed in inference anyway.
 So, I ended up spending about a week and a half in a loop of eat, read, write code, sleep, repeat, and in that time, I went from knowing nothing about how transformer models work to having implemented all of inference in my own code from scratch. It was quite the experience.
 I relied heavily on ChatGPT to explain all of the core LLM concepts to me (tokenization, the transformer math, KV caching, quantization, etc) as I had no machine learning, numerics, or HPC background. I had a math background, so the linear algebra and general math concepts weren't an issue for me. But I definitely would have run into a number of issues surrounding quantization, softmax, and similar had I not had the robot overlords helping me.
 I made a number of choices while writing the code. Fi
