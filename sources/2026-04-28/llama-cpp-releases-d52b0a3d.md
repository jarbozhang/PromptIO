---
title: b8944
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8944'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-27T09:17:15.000Z'
fetched_at: '2026-04-28T02:04:28.794Z'
---
ggml : use 64 bytes aligned tile buffers (#21058)
Model
Test
t/s OLD
t/s NEW
Speedup




qwen35 0.8B BF16
pp512
584.59
595.41
1.02


qwen35 0.8B BF16
tg128
52.23
52.82
1.01


qwen35 0.8B IQ2_M - 2.7 bpw
pp512
260.64
261.70
1.00


qwen35 0.8B IQ2_M - 2.7 bpw
tg128
81.17
80.89
1.00


qwen35 0.8B IQ2_XXS - 2.0625 bpw
pp512
302.36
302.56
1.00


qwen35 0.8B IQ2_XXS - 2.0625 bpw
tg128
84.93
85.12
1.00


qwen35 0.8B IQ3_XXS - 3.0625 bpw
pp512
263.22
260.01
0.99


qwen35 0.8B IQ3_XXS - 3.0625 bpw
tg128
80.29
78.94
0.98


qwen35 0.8B IQ4_NL - 4.5 bpw
pp512
728.65
742.09
1.02


qwen35 0.8B IQ4_NL - 4.5 bpw
tg128
82.39
84.46
1.03


qwen35 0.8B IQ4_XS - 4.25 bpw
pp512
681.33
677.06
0.99


qwen35 0.8B IQ4_XS - 4.25 bpw
tg128
80.18
79.28
0.99


qwen35 0.8B Q2_K_M
pp512
413.28
415.94
1.01


qwen35 0.8B Q2_K_M
tg128
81.90
82.78
1.01


qwen35 0.8B Q3_K_M
pp512
493.17
495.08
1.00


qwen35 0.8B Q3_K_M
tg128
82.75
83.23
1.01


qwen35 0.8B Q3_K_S
pp512
429.35
427.64
1.00


qwen35 0.8B Q3_K_S
tg128
86.69
87.02
1.00


qwen35 0.8B Q4_0
pp512
783.46
782.32
1.00


qwen35 0.8B Q4_0
tg128
88.23
87.90
1.00


qwen35 0.8B Q4_1
pp512
741.71
729.76
0.98


qwen35 0.8B Q4_1
tg128
85.44
86.01
1.01


qwen35 0.8B Q4_K_M
pp512
676.24
681.31
1.01


qwen35 0.8B Q4_K_M
tg128
76.59
77.06
1.01


qwen35 0.8B Q4_K_S
pp512
683.12
688.81
1.01


qwen35 0.8B Q4_K_S
tg128
80.50
81.19
1.01


qwen35 0.8B Q5_K_M
pp512
635.33
642.11
1.01


qwen35 0.8B Q5_K_M
tg128
72.07
72.49
1.01


qwen35 0.8B Q5_K_S
pp512
660.95
658.18
1.00


qwen35 0.8B Q5_K_S
tg128
72.19
72.95
1.01


qwen35 0.8B Q6_K
pp512
647.97
638.84
0.99


qwen35 0.8B Q6_K
tg128
72.83
72.49
1.00


qwen35 0.8B Q8_0
pp512
805.01
785.49
0.98


qwen35 0.8B Q8_0
tg128
70.10
70.13
1.00



Signed-off-by: Adrien Gallouët angt@huggingface.co
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64
