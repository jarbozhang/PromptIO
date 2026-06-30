---
title: >-
  Been running Qwen3.6-27B through a 3-critic harness. The harness matters more
  than I thought
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uj9viw/been_running_qwen3627b_through_a_3critic_harness/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T00:25:20.000Z'
fetched_at: '2026-06-30T23:01:36.516Z'
---
Been running Qwen3.6-27B (8-bit) through my coding harness for a few days, alongside GLM5.2. The harness uses 3 critics — code review, test review, Playwright e2e — each with fresh context before accepting output.
 Qwen3.6 is legit for a 27B dense model. Benchmarks weren't lying. It handles repo-level reasoning, produces decent code. But yeah it makes more mistakes than frontier models. Expected.
 What I didn't expect was that the 3-critic pipeline I built for frontier models turns out to be a great fit here. Critics catch the extra mistakes. Harness handles the retry overhead without breaking flow. The output after critics have done their work is good enough that I can't really tell the difference from a frontier run in terms of final quality. The path is just noisier.
 One thing though, the plan for this run is executing was written by GLM5.2, not Qwen3.6. My guess is the optimal split is frontier for planning + Qwen3.6 for execution. Strong model where reasoning matters most, cheap model for high-volume implementation where the harness catches errors.
 —-
 For anyone asking what harness I’m using, I’ve built my own harness and here is the link for those interested in. https://github.com/JeiKeiLim/tenet 
    submitted by    /u/workout_JK  
 [link]   [comments]
