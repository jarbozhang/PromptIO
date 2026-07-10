---
title: Qwen 3.6 Q2-FP8 Terminal Bench 2 and GPQA Scores
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usclcz/qwen_36_q2fp8_terminal_bench_2_and_gpqa_scores/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T03:52:43.000Z'
fetched_at: '2026-07-10T23:01:38.134Z'
---
TL;DR: Quantization has a marked impact on agentic performance but little effect on knowledge.
 I manage a small HPC cluster at a university, and we have recently begun running common benchmarks to help our users understand the effects of quantization. We have just completed the runs on the Qwen 3.6 quantizations and posted the results on our website: https://scrp.econ.cuhk.edu.hk/llm-benchmark
 The results are consistent with what most people would expect: knowledge, as measured by GPQA Diamond, varies very little across quantizations.
 GPQA Chart
 Agentic use, as measured by Terminal‑Bench 2, shows a significant regression in the lower‑precision quantizations.
 Terminal-Bench 2 Chart
 We also observed a notable drop compared with Qwen’s official FP8 scores. We believe this stems from the timeout setting—we use Harbor’s default, which ranges from 10 minutes to 1 hour depending on the task, whereas Qwen’s official figures were produced with a flat 3‑hour timeout.
 On the website you’ll also see the range of scores from multiple runs. There is considerable variation across runs; a poor run with a higher‑precision quant can easily be worse than a good run with a lower‑precision quant.
 We are currently benchmarking the GLM‑5.2 quantizations, but, as expected, the process is very slow.
    submitted by    /u/ticoneva  
 [link]   [comments]
