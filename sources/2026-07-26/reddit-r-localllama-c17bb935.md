---
title: MI50 power curve tests
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1v6ns73/mi50_power_curve_tests/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T23:50:20.000Z'
fetched_at: '2026-07-26T11:00:55.543Z'
---
tests done power limiting the GPU on LACT - real power usage varies wildy
 at 20W it ranges from 25W to 56W
 same behavior happens on every setting
 prompt for the test runs:
 https://github.com/lukesdevlab/youtube/blob/main/prompts/agent-maze.txt
 analysis by mimo 2.5
 Key Findings:
 • Generation speed is remarkably resilient to power throttling — 100W delivers 97.5% of 190W gen speed (31.98 vs 32.79 t/s), since decode is memory-bandwidth bound, not compute bound.
 • At 50W you get 70% of peak gen speed at only 26% of peak power — 3.6× better energy efficiency (0.458 vs 0.173 t/s/W).
 • At 20W the card is 6.0× more energy efficient than 190W, though prompt processing drops to 53% of peak.
 • Graph reuse correlates inversely with power — 190W reuses 44,790 graphs vs 11,669 at 100W, but 20W reuses 38,248. Lower power limits cause more partial graph reuse as the scheduler compensates for throttled compute.
 • Prompt processing degrades faster than gen under power limits — 190W→20W: prompt drops to 53% (691→366 t/s), gen drops to 63% (32.8→20.8 t/s). Prompt processing is more compute-bound than memory-bound.
 • For inference-heavy deployments, 50W is the optimal operating point on MI50 — near-peak gen speed with dramatically lower power draw and cooling requirements.
 Avarage of 3 runs:
 190W config consistently processed a lot less total tokens than everyone else and didnt produce a working file in 1 out of 3 runs
  
 TDP Prompt Speed Gen Speed Total Time Total Tokens Gen t/s per Watt Graphs Reused Relative Perf 
  
 190W 691.28 t/s 32.79 t/s 212.4 s 14,892 0.173 t/s/W 44,790 100% 
  100W 603.08 t/s 31.98 t/s 244.9 s 21,529 0.320 t/s/W 11,669 97.5% 
  50W 401.14 t/s 22.92 t/s 315.1 s 20,861 0.458 t/s/W 31,967 70.0% 
  20W 366.05 t/s 20.80 t/s 319.9 s 20,295 1.040 t/s/W 38,248 63.4% 
 
 llama.cpp parameters:
 [+] Model: qwen/Qwen3.6-35B-A3B-UD-IQ4_NL_XL.gguf
 [+] Context: 262144 (256K tokens)
 [+] Target KV: K=q8_0 / V=q8_0
 [+] MoE placement: PARTIAL (21 MoE layers on
