---
title: >-
  [Draft - Open PR] AVX2: Speed up large batch size prompt processing of IQ
  models by bartowski1182 · Pull Request #27402 · ggml-org/llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vtgyzf/draft_open_pr_avx2_speed_up_large_batch_size/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T11:35:10.000Z'
fetched_at: '2026-08-21T11:01:41.856Z'
---
IQ quants are particularly slow on CPU at large batch sizes (what you'd see for imatrix and perplexity)
 Benchmark numbers
 I ran PPL against master and this PR to get speed and numbers on --chunks 50 for Qwen3.6-27B and Qwen3.6-35B-A3B on EPYC 9654 using 24 threads
 Created pure IQ1_S, IQ1_M, IQ2_XXS, IQ2_XS, IQ2_S, IQ3_XXS, IQ3_S, IQ4_XS, and IQ4_NL. Made pure to make sure each tensor type is fully exercised.
 These are the most extremely differences because it's at a big batch size (512), lower batch sizes get smaller increases
  
 Model PPL master PPL PR PPL diff tok/s master tok/s PR tok/s diff 
  
 Qwen3.6-27B-pure-iq1_m 12.1242 +/- 0.27911 12.1355 +/- 0.27961 +0.0113 (+0.09%) 9.10 69.59 +60.49 (+664.7%) 
  Qwen3.6-27B-pure-iq1_s 17.1841 +/- 0.41605 17.2043 +/- 0.41636 +0.0202 (+0.12%) 8.57 70.10 +61.53 (+718.0%) 
  Qwen3.6-27B-pure-iq2_s 7.4571 +/- 0.16908 7.4440 +/- 0.16864 -0.0131 (-0.18%) 7.62 67.81 +60.19 (+789.9%) 
  Qwen3.6-27B-pure-iq2_xs 8.0930 +/- 0.18622 8.0798 +/- 0.18562 -0.0132 (-0.16%) 8.78 67.82 +59.04 (+672.4%) 
  Qwen3.6-27B-pure-iq2_xxs 8.5515 +/- 0.19470 8.5466 +/- 0.19442 -0.0049 (-0.06%) 7.21 68.19 +60.98 (+845.8%) 
  Qwen3.6-27B-pure-iq3_s 6.4753 +/- 0.14089 6.4779 +/- 0.14108 +0.0026 (+0.04%) 4.75 65.45 +60.70 (+1277.9%) 
  Qwen3.6-27B-pure-iq3_xxs 6.6138 +/- 0.14414 6.6223 +/- 0.14448 +0.0085 (+0.13%) 6.12 67.43 +61.31 (+1001.8%) 
  Qwen3.6-27B-pure-iq4_xs 6.4100 +/- 0.14195 6.4073 +/- 0.14187 -0.0027 (-0.04%) 22.07 69.19 +47.12 (+213.5%) 
  Qwen3.6-35B-A3B-pure-iq1_m 12.9822 +/- 0.31998 13.0037 +/- 0.32059 +0.0215 (+0.17%) 111.28 244.04 +132.76 (+119.3%) 
  Qwen3.6-35B-A3B-pure-iq1_s 20.5812 +/- 0.56679 20.5967 +/- 0.56756 +0.0155 (+0.08%) 110.13 245.92 +135.79 (+123.3%) 
  Qwen3.6-35B-A3B-pure-iq2_s 7.5883 +/- 0.16738 7.5798 +/- 0.16713 -0.0085 (-0.11%) 111.48 229.51 +118.03 (+105.9%) 
  Qwen3.6-35B-A3B-pure-iq2_xs 8.1627 +/- 0.18140 8.1432 +/- 0.18089 -0.0195 (-0.24%) 110.29 234.09 +123.80 (+112.2%) 
  Qwen3.6-35B-A3B-pure-iq2_xxs 9
