---
title: Bonsai 27B runs locally on an iPhone - a 27B model in 3.9GB
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uyz9n2/bonsai_27b_runs_locally_on_an_iphone_a_27b_model/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T13:08:58.000Z'
fetched_at: '2026-07-17T23:00:59.683Z'
---
PrismML built Bonsai on top of Qwen3.6-27B by quantizing the weights down to 1-bit. That takes it from ~54GB to 3.9GB, small enough to fit and run on a phone, while keeping ~90% of the benchmark scores 
 It's true binary quantization ("binary g128") - every weight is a single sign bit and each group of 128 shares one FP16 scale, so it lands at ~1.125 bits/weight with no high-precision escape hatches. Even the embeddings, attention/MLP projections and the LM head are binary, which is the surprising part, most 1-bit schemes keep some layers higher 
 Across 15 benchmarks it averages 76.1 vs 85.1 for the FP16 model (~89.5%). Math holds up best (91.7), knowledge and reasoning take the biggest hit (73.4 vs 83.2), which is exactly where you'd notice it dropping the odd details. Memory stays friendly too: ~5.2GB at 4K context, ~6.8GB at 100K with 4-bit KV cache 
 All credit to PrismML for the model: https://huggingface.co/prism-ml/Bonsai-27B-mlx-1bit
 Running it on iPhone 15 Pro Max (8GB RAM) via Atomic Chat (I'm on the Atomic team, happy to answer questions)
    submitted by    /u/ElmBark  
 [link]   [comments]
