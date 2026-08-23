---
title: >-
  enabling PCI-E p2p for consumer Nvidia cards will yield you more than you
  think
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vj7wey/enabling_pcie_p2p_for_consumer_nvidia_cards_will/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T21:42:00.000Z'
fetched_at: '2026-08-09T11:01:08.931Z'
---
Disclaimer - no LLM was used to write this post/note
 As larger post about my setup will come later, want to give heads-up to folks who use VLLM and >= 2 GPUs.
 So I have pretty meaty server (8 channel AMD EPYC, ~150GB/s RAM bw) and 4x5060Ti 16GB in PCI-E 4.0 8x mode.
 Considering CPU is meaty, high RAM bw, no bottlenecks, messing with p2p should be minuscule, right?
 That's what I thought as well, now see results of two identical tests: 
 Test prompt:
 llama-benchy --base-url http://localllm/v1 --model localllm --depth 0 4096 8192 16384 32768 --latency-mode generation 
 1) no p2p:
 | model | test | t/s | peak t/s | ttfr (ms) | est_ppt (ms) | e2e_ttft (ms) | |:---------|----------------:|----------------:|---------------:|-----------------:|-----------------:|-----------------:| | localllm | pp2048 | 1648.96 ± 8.49 | | 1241.77 ± 8.66 | 1131.60 ± 8.66 | 1241.77 ± 8.66 | | localllm | tg32 | 89.86 ± 7.05 | 92.76 ± 7.28 | | | | | localllm | pp2048 @ d4096 | 1654.51 ± 6.44 | | 3504.72 ± 11.71 | 3394.55 ± 11.71 | 3504.72 ± 11.71 | | localllm | tg32 @ d4096 | 102.98 ± 3.95 | 106.30 ± 4.08 | | | | | localllm | pp2048 @ d8192 | 1631.74 ± 10.72 | | 5821.87 ± 82.46 | 5711.71 ± 82.46 | 5821.87 ± 82.46 | | localllm | tg32 @ d8192 | 109.27 ± 4.42 | 112.79 ± 4.56 | | | | | localllm | pp2048 @ d16384 | 1601.33 ± 3.18 | | 10502.40 ± 46.13 | 10392.23 ± 46.13 | 10502.94 ± 46.27 | | localllm | tg32 @ d16384 | 98.61 ± 5.01 | 116.87 ± 5.94 | | | | | localllm | pp2048 @ d32768 | 1544.66 ± 1.10 | | 20598.44 ± 65.95 | 20488.27 ± 65.95 | 20598.44 ± 65.95 | | localllm | tg32 @ d32768 | 93.24 ± 15.89 | 122.15 ± 15.63 | | 
 2) p2p enabled:
 | model | test | t/s | peak t/s | ttfr (ms) | est_ppt (ms) | e2e_ttft (ms) | |:---------|----------------:|----------------:|---------------:|-----------------:|-----------------:|-----------------:| | localllm | pp2048 | 2305.20 ± 49.73 | | 913.50 ± 27.47 | 808.72 ± 27.47 | 913.50 ± 27.47 | | localllm | tg32 | 97.92 ± 8.26 | 101.07 ± 8.53 | | | | | localllm
