---
title: Introducing Qwen3.8-27B Dynamic v3 Unsloth GGUFs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsr67c/introducing_qwen3827b_dynamic_v3_unsloth_ggufs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T16:21:31.000Z'
fetched_at: '2026-08-20T11:01:24.235Z'
---
Hey everyone! We’re releasing new Qwen3.8-27B GGUFs with 10% higher accuracy for the same size. This uses a new version of Dynamic v3.0
 Unsloth Dynamic V3 outperforms others by >10% on Div-300, KLD & more benchmarks.
 We also release 1-bit quants that retain 77% accuracy. Run on 8GB RAM.
 Some of you already saw we updated our quants a few hours ago. No, nothing was broken, nothing needed fixes (I don't know why people even said this since it's a complete fabricated story). This was purely an update to make them EVEN BETTER.
 We do not train on the imatrix calibration dataset, and we do NOT use QAT or QAD. Everything is done through post-training quantization. Our imatrix file used is available for the community to test, evaluate, and use. We encourage researchers and developers to create variations and fine-tunes of Qwen3.8 using our Unsloth quants/imatrix. You can read our over fitting analysis as well.
 Blog with all details and more benchmarks: https://unsloth.ai/docs/basics/dynamic-3.0-ggufs
 GGUF: https://huggingface.co/unsloth/Qwen3.8-27B-GGUF
 Enjoy! We also will be doing a new Unsloth Desktop update today: https://github.com/unslothai/unsloth
 We had A LOT of updates and will be introducing auto compaction, allowing external APIs to do tool calling and more.
    submitted by    /u/danielhanchen  
 [link]   [comments]
