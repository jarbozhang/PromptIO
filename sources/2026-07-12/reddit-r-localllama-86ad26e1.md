---
title: Ultra budget 20GB vram with 448GB/s for $100 bucks.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utwqf8/ultra_budget_20gb_vram_with_448gbs_for_100_bucks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T21:49:49.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
Here is the upper limit of what can be done with $100 bucks worth of video cards. 
 You can have 3 concurrent users with plenty of context, better speeds or close enough speeds than a bunch of cards that provide less VRAM and cost 4+ times.
 0.00.008.388 I log_info: verbosity = 3 (adjust with the `-lv N` CLI arg) 0.00.008.391 I device_info: 0.00.089.439 I - CUDA0 : NVIDIA P102-100 (10144 MiB, 10013 MiB free) 0.00.197.645 I - CUDA1 : NVIDIA P102-100 (10144 MiB, 10013 MiB free) 0.00.197.656 I - CPU : Intel(R) Xeon(R) W-2135 CPU @ 3.70GHz (128396 MiB, 128396 MiB free) 0.00.197.728 I system_info: n_threads = 6 (n_threads_batch = 6) / 12 | CUDA : ARCHS = 600,610,750,860,890 | USE_GRAPHS = 1 | PEER_MAX_BATCH_SIZE = 128 | CPU : SSE3 = 1 | SSSE3 = 1 | AVX = 1 | AVX2 = 1 | F16C = 1 | FMA = 1 | BMI2 = 1 | LLAMAFILE = 1 | OPENMP = 1 | REPACK = 1 | 0.00.197.764 I srv init: running without SSL 0.00.197.849 I srv init: using 11 threads for HTTP server 0.00.198.515 I srv start: binding port with default address family 0.00.199.823 I srv llama_server: loading model 0.00.199.902 I srv load_model: loading model '/models/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf' 0.00.199.906 I common_init_result: fitting params to device memory ... 0.00.199.907 I common_init_result: (for bugs during this step try to reproduce them with -fit off, or provide --verbose logs if the bug only occurs with -fit on) 0.00.987.288 W common_fit_params: failed to fit params to free device memory: n_gpu_layers already set by user to 99, abort 0.23.223.625 W llama_context: n_ctx_seq (32768) < n_ctx_train (262144) -- the full capacity of the model will not be utilized 0.23.481.073 I common_init_from_params: warming up the model with an empty run - please wait ... (--no-warmup to disable) 0.23.570.914 I srv load_model: initializing slots, n_slots = 3 0.23.598.842 W srv load_model: speculative decoding will use checkpoints 0.23.598.851 W common_speculative_init: no implementations specified for speculative decoding 0.23.598.852 
