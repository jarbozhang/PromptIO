---
title: I merged fixes for quantized KV cache into my DeepSeek V4 branch
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1une2il/i_merged_fixes_for_quantized_kv_cache_into_my/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T16:57:06.000Z'
fetched_at: '2026-07-04T23:01:32.106Z'
---
Check it out: https://github.com/fairydreaming/llama.cpp/tree/dsv4
 They are PRs #25247, #25303 (mine) and #25202 (from am17an) but I omitted some padding changes from the last one that I think are not necessary. So if it crashes for you let me know.
 You can now fit the antirez IQ2XXS model with 1M context on a single RTX PRO 6000 (q8_0 KV cache):
 $ ./bin/llama-batched-bench -m ~/projects/ds4/gguf/DeepSeek-V4-Flash-IQ2XXS-w2Q2K-AProjQ8-SExpQ8-OutQ8-chat-v2-imatrix.gguf -b 2048 -ub 2048 -npl 1 -npp 2048,4096,8192,16384,32768,65536,131072,262144,524288,1048064 -ntg 128 -fa 1 --no-repack --cache-type-k q8_0 --cache-type-v q8_0 llama_batched_bench: n_kv_max = 1048576, n_batch = 2048, n_ubatch = 2048, flash_attn = 1, is_pp_shared = 0, is_tg_separate = 0, n_gpu_layers = -1, n_threads = 32, n_threads_batch = 32 | PP | TG | B | N_KV | T_PP s | S_PP t/s | T_TG s | S_TG t/s | T s | S t/s | |-------|--------|------|--------|----------|----------|----------|----------|----------|----------| | 2048 | 128 | 1 | 2176 | 1.144 | 1790.42 | 2.273 | 56.31 | 3.417 | 636.81 | | 4096 | 128 | 1 | 4224 | 2.223 | 1842.66 | 2.253 | 56.81 | 4.476 | 943.66 | | 8192 | 128 | 1 | 8320 | 4.600 | 1780.84 | 2.271 | 56.36 | 6.871 | 1210.88 | | 16384 | 128 | 1 | 16512 | 9.817 | 1668.91 | 2.303 | 55.57 | 12.121 | 1362.30 | | 32768 | 128 | 1 | 32896 | 21.909 | 1495.63 | 2.458 | 52.08 | 24.367 | 1350.03 | | 65536 | 128 | 1 | 65664 | 53.104 | 1234.10 | 2.614 | 48.97 | 55.718 | 1178.50 | |131072 | 128 | 1 | 131200 | 141.960 | 923.30 | 2.942 | 43.50 | 144.902 | 905.44 | |262144 | 128 | 1 | 262272 | 421.537 | 621.88 | 3.602 | 35.54 | 425.139 | 616.91 | |524288 | 128 | 1 | 524416 | 1406.481 | 372.77 | 5.217 | 24.54 | 1411.698 | 371.48 | |1048064 | 128 | 1 | 1048192 | 5202.285 | 201.46 | 8.365 | 15.30 | 5210.650 | 201.16 | 
 Also some perplexity values:
 f16:
 $ ./bin/llama-perplexity -m ~/ggufs/DeepSeek-V4-Flash.gguf -f ../../perplexity/wikitext-2-raw/wiki.test.raw -c 8192 -b 8192 -ub 8192 -cmoe -fit off -fa
