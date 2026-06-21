---
title: Some llama.cpp B70 SYCL benchmarks
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uao1pk/some_llamacpp_b70_sycl_benchmarks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T05:20:12.000Z'
fetched_at: '2026-06-21T03:18:27.869Z'
---
build: dd4623a74 (9640)
 Actually, this doesn't want to be a code block, that doesn't help it line up, instead it's Markdown table format but the extra blank lines were preventing it from being parsed as a table.
  
 model size params backend ngl test t/s 
  
 gemma4 12B Q8_0 11.78 GiB 11.91 B SYCL -1 pp512 1578.19 ± 7.82 
  gemma4 12B Q8_0 11.78 GiB 11.91 B SYCL -1 tg128 32.43 ± 0.07 
  ------------------------------ ---------: ---------: ---------- --: --------------: -------------------: 
  gemma4 26B.A4B Q8_0 25.00 GiB 25.23 B SYCL -1 pp512 1332.35 ± 8.80 
  gemma4 26B.A4B Q8_0 25.00 GiB 25.23 B SYCL -1 tg128 40.13 ± 0.09 
  ------------------------------ ---------: ---------: ---------- --: --------------: -------------------: 
  gemma4 E2B Q8_0 4.69 GiB 4.65 B SYCL -1 pp512 5662.45 ± 23.05 
  gemma4 E2B Q8_0 4.69 GiB 4.65 B SYCL -1 tg128 109.14 ± 0.26 
 
  
 model size params backend ngl ot test t/s 
  
 qwen35moe 35B.A3B Q8_0 34.36 GiB 34.66 B SYCL 99 blk.(3[4-9]).ffn_(gate│up│down)_exps=CPU pp512 563.48 ± 14.58 
  qwen35moe 35B.A3B Q8_0 34.36 GiB 34.66 B SYCL 99 blk.(3[4-9]).ffn_(gate│up│down)_exps=CPU tg128 44.67 ± 0.04 
 
  
 model size params backend ngl test t/s 
  
 qwen35 27B Q8_0 27.04 GiB 27.32 B SYCL -1 pp512 778.20 ± 0.99 
  qwen35 27B Q8_0 27.04 GiB 27.32 B SYCL -1 tg128 15.42 ± 0.01 
 
 Just fyi. It runs Ok, but it could be better.
    submitted by    /u/siegevjorn  
 [link]   [comments]
