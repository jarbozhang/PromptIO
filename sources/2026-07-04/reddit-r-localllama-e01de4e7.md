---
title: My DeepSeek V4 Pro at home got faster again
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1umdjxd/my_deepseek_v4_pro_at_home_got_faster_again/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T12:47:24.000Z'
fetched_at: '2026-07-03T23:01:09.838Z'
---
You may remember my earlier posts about DeepSeek V4 Pro at home. Today I checked the performance in my llama.cpp branch that contains various fixes and optimizations not yet included in mainline. Benchmark is still running, will update the post with full results later (assuming it finishes today):
 $ ./bin/llama-batched-bench -m ~/ggufs/DeepSeek-V4-Pro.gguf -b 8192 -ub 8192 -npl 1 -npp 8192,16384,32768,65536,131072,262144,524288,1048064 -ntg 128 -fa 1 -cmoe --no-repack 0.00.516.833 W llama_model_loader: tensor overrides to CPU are used with mmap enabled - consider using --no-mmap for better performance llama_batched_bench: n_kv_max = 1048576, n_batch = 8192, n_ubatch = 8192, flash_attn = 1, is_pp_shared = 0, is_tg_separate = 0, n_gpu_layers = -1, n_threads = 32, n_threads_batch = 32 | PP | TG | B | N_KV | T_PP s | S_PP t/s | T_TG s | S_TG t/s | T s | S t/s | |-------|--------|------|--------|----------|----------|----------|----------|----------|----------| | 8192 | 128 | 1 | 8320 | 42.660 | 192.03 | 10.908 | 11.73 | 53.568 | 155.32 | | 16384 | 128 | 1 | 16512 | 85.935 | 190.66 | 11.019 | 11.62 | 96.954 | 170.31 | | 32768 | 128 | 1 | 32896 | 177.407 | 184.70 | 11.267 | 11.36 | 188.675 | 174.35 | | 65536 | 128 | 1 | 65664 | 374.335 | 175.07 | 11.625 | 11.01 | 385.960 | 170.13 | |131072 | 128 | 1 | 131200 | 827.209 | 158.45 | 12.289 | 10.42 | 839.499 | 156.28 | |262144 | 128 | 1 | 262272 | 1972.450 | 132.90 | 13.693 | 9.35 | 1986.143 | 132.05 | |524288 | 128 | 1 | 524416 | 5251.683 | 99.83 | 16.478 | 7.77 | 5268.161 | 99.54 | |1048064 | 128 | 1 | 1048192 | 15874.980 | 66.02 | 21.963 | 5.83 | 15896.943 | 65.94 | 
 This is running with expert offloading on Epyc 9374F with 12 x 96GB of 4800 MT/s DDR5 RDIMMs, GPU is RTX PRO 6000 Max-Q. RAM usage is 69.3% (of 1152GB), VRAM usage is 78986MiB (of 96GB). Power usage is about 500W during PP. GGUF size is 794GB converted with mainline llama.cpp.
 Also this may be a good place to share some information about the state of current
