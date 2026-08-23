---
title: Llama.cpp PR 8% speed boost
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vf8obs/llamacpp_pr_8_speed_boost/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-04T12:16:20.000Z'
fetched_at: '2026-08-05T11:01:21.136Z'
---
Llama.cpp currently uses cpu based sampling for user with mtp enabled. The PR moves sampling to the gpu, which on a 5090 boasts an 8% increase in tok/s for qwen3.6:35b. I tested it on my P40 and observed a 4% increase inference speed boost.
 Pretty exciting to see 84 tok/s max on a nvidia p40 for me.
 Backend sampling shows ~4% improvement on Linux + Tesla P40 (sm_61, Pascal):
 CPU Sampling: llama-server -m Qwen3.6-35B-A3B-UD-IQ4_NL.gguf --spec-type draft-mtp --seed 42
  python3 mtp-bench.py code_python pred= 192 draft= 132 acc= 124 rate=0.939 tok/s=73.1 code_cpp pred= 113 draft= 76 acc= 74 rate=0.974 tok/s=75.9 explain_concept pred= 192 draft= 159 acc= 111 rate=0.698 tok/s=62.4 summarize pred= 192 draft= 167 acc= 107 rate=0.641 tok/s=59.6 qa_factual pred= 192 draft= 159 acc= 111 rate=0.698 tok/s=62.4 translation pred= 119 draft= 92 acc= 73 rate=0.793 tok/s=67.0 creative_short pred= 192 draft= 197 acc= 92 rate=0.467 tok/s=50.7 stepwise_math pred= 192 draft= 133 acc= 124 rate=0.932 tok/s=73.6 long_code_review pred= 192 draft= 155 acc= 113 rate=0.729 tok/s=63.8 
 Backend sampling: llama-server -m Qwen3.6-35B-A3B-UD-IQ4_NL.gguf --spec-type draft-mtp --seed 42 -bs
  python3 mtp-bench.py code_python pred= 192 draft= 132 acc= 124 rate=0.939 tok/s=76.2 code_cpp pred= 113 draft= 76 acc= 74 rate=0.974 tok/s=79.4 explain_concept pred= 192 draft= 159 acc= 111 rate=0.698 tok/s=64.6 summarize pred= 192 draft= 167 acc= 107 rate=0.641 tok/s=61.6 qa_factual pred= 192 draft= 159 acc= 111 rate=0.698 tok/s=64.6 translation pred= 119 draft= 92 acc= 73 rate=0.793 tok/s=69.6 creative_short pred= 192 draft= 197 acc= 92 rate=0.467 tok/s=52.1 stepwise_math pred= 192 draft= 133 acc= 124 rate=0.932 tok/s=76.6 long_code_review pred= 192 draft= 155 acc= 113 rate=0.729 tok/s=65.7 
 Acceptance ratio with both backend and CPU sampling is exactly same. The improvement is smaller than on RTX 5090 (4% vs 12%), which is expected — the P40 is memory-bandwidth-bound (sm_61, 346 GB/s vs RTX 5090's 1,792 
