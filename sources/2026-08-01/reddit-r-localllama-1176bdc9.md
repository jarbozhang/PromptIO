---
title: DeepSeek v4 Flash for DS4 (DwarfStar) GGUF w/ DSpark MTP Head
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vc6xbu/deepseek_v4_flash_for_ds4_dwarfstar_gguf_w_dspark/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-31T23:31:15.000Z'
fetched_at: '2026-08-01T11:01:18.097Z'
---
I'm an avid user of Deepseek v4 Flash via antirez's DS4 DwarfStar inference engine, and so when the new checkpoint dropped, the first thing I did was rent a cloud box and spin up a quantization for use in my DS4 deployment. Props to Unsloth for getting their GGUFs out so quickly, but for me it only runs at <15 tok/sec in llama.cpp. That's just too slow.
 The purpose-build DS4 engine runs at double that, slightly over 30 tok/sec on my MBP M5 Max. That's actually usable for agentic workflows. Anyways, I used antirez's exact Q2-Q4 mixed imatrix quant recipe to quantize the new checkpoint, and I split off the DSpark head and quantized that in a separate GGUF for people to experiment with. I'd really appreciate it if anyone who uses DS4 on this subreddit could help me test it out. It works, but I need feedback on the performance compared to the preview, so I can iterate and hopefully improve.
 Here's the repo link. I have plans for additional quants (flat Q2_K & Q4_K, with matching MTP heads), possibly an improved imatrix, and a custom directional-steering abliteration vector file, leveraging the fascinating steering capability of DS4 to de-censor the model.
 I'm looking for reports from CUDA/ROCm users (I can only test Metal), tok/sec decode + prefill, reports on the MTP performance (have been quantizing all day, haven't gotten to A/B test yet), and any SSD streamers out there as well.
 If you're new to DS4, it takes 60 seconds to setup, and you can use the model at 2X llama.cpp speed, with persistent KV cache on SSD, and any of your preferred coding harnesses via OpenAI API endpoint. Give it a shot.
 I really appreciate any and all feedback, and I'll happily credit your benchmarks in the Model Card. Also, any input on how to improve the card for users encountering DS4 for the first time. I love this project, and I wanted to contribute! TIA
 EDIT: Antirez himself has now released his 0731 quants, so I obviously recommend you go with his version. I didn't know how long h
