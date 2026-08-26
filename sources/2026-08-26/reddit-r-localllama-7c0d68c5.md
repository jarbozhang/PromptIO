---
title: Fully quantized NVFP4 Qwen3.8-27B with QUASAR QAD
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vyie86/fully_quantized_nvfp4_qwen3827b_with_quasar_qad/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-26T01:04:56.000Z'
fetched_at: '2026-08-26T11:01:34.335Z'
---
We're releasing a fully quantized NVFP4 version of Qwen3.8-27B. The checkpoint was trained using quantization-aware distillation (QAD) with QUASAR, our new QAT algorithm. We used the original BF16 model as the teacher and distilled the quantized model for 2,446 steps.
 The checkpoint supports vLLM on NVIDIA Blackwell GPUs:
 vllm serve QUASAR-QAT/Qwen3.8-27B-QUASAR-NVFP4 \ --max-model-len 262144 \ --gpu-memory-utilization 0.85 
 This model uses an aggressive quantization configuration: every linear layer across all transformer blocks is quantized to NVFP4 (W4A4).
 Attention and GDN layers are typically kept at higher precision, such as FP8 or BF16, because quantizing them can cause a significant loss in model quality. With QUASAR, however, the fully quantized checkpoint retains near-BF16 performance. Evaluation results and comparison against other NVFP4 checkpoints:
  
 Model Size GPQA-Diamond (2 runs, n=396) AIME26 (3 repeats, n=90) 
  
 Qwen/Qwen3.8-27B (original BF16) 55.6 GB 0.9141 1.0000 
  QUASAR-QAT/Qwen3.8-27B-QUASAR-NVFP4 19.7 GB 0.9091 1.0000 
  unsloth/Qwen3.8-27B-NVFP4 23.4 GB 0.8939 0.9778 
  Inferact/Qwen3.8-27B-NVFP4 26.4 GB 0.8763 0.9667 
 
 Paper: https://arxiv.org/abs/2608.13966v1
 We'd love to hear your feedback on this checkpoint!
    submitted by    /u/arty_photography  
 [link]   [comments]
