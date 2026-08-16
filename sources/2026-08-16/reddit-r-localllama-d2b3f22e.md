---
title: Qwen3.8-27B vs Qwen3.6-27B writing ray-tracers in BASIC
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vpiyj9/qwen3827b_vs_qwen3627b_writing_raytracers_in_basic/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T00:45:04.000Z'
fetched_at: '2026-08-16T11:01:35.465Z'
---
one of my llm hobbies is re-creating graphics demos i used to write in BASIC in the late 1980s. i slopped together an agentic harness and a basic-to-js transpiler in a web page i've been playing with for a few months. the agent can write basic programs, run them, examine the resulting images, and iterate. qwen3.6 could do a ray-tracer with some user input -- often it got something wrong that it couldn't see/didn't notice, and hence wouldn't fix without further prompting. qwen3.8 typically knocks it out of the park on its own, iterating to a good result. both models are running the unsloth UD-Q8_K_XL quants. i'm pretty happy with 3.8 so far.
 the user prompt was "write a recursive ray-tracing demo to render three metallic spheres (copper, silver, gold) over a glossy checkerboard plane and under a deep blue sky. use the cook-torrance model to render the spheres." 
    submitted by    /u/Ok-Breakfast1878  
 [link]   [comments]
