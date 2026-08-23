---
title: b9735
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9735'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-20T11:35:07.000Z'
fetched_at: '2026-06-21T03:19:14.778Z'
---
ggml : optimize AMX (#24806)
Flatten the partition over n_batch * M so every thread participates in
| CPU                             | Model                         | Test   |   t/s OLD |   t/s NEW |   Speedup |
|:--------------------------------|:------------------------------|:-------|----------:|----------:|----------:|
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B IQ4_NL - 4.5 bpw  | pp512  |    730.71 |    779.86 |      1.07 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B IQ4_NL - 4.5 bpw  | tg128  |     87.88 |     86.79 |      0.99 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B IQ4_XS - 4.25 bpw | pp512  |    725.09 |   1023.31 |      1.41 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B IQ4_XS - 4.25 bpw | tg128  |     83.64 |     83.62 |      1.00 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_0              | pp512  |    820.51 |    924.05 |      1.13 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_0              | tg128  |     90.59 |     92.46 |      1.02 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_1              | pp512  |    776.88 |    872.79 |      1.12 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_1              | tg128  |     89.39 |     90.94 |      1.02 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_K_M            | pp512  |    719.28 |   1009.27 |      1.40 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_K_M            | tg128  |     80.62 |     80.86 |      1.00 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_K_S            | pp512  |    732.29 |   1077.29 |      1.47 |
| Intel(R) Xeon(R) Platinum 8488C | qwen35 0.8B Q4_K_S            | tg128  |     86.42 |     83.53 |      0.97 |


Signed-off-by: Adrien Gallouët angt@huggingface.co
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled) DISABLED
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 
