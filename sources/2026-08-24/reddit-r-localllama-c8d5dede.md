---
title: >-
  I developed my own quantized LLM from scratch, trained on 30B tokens, deploys
  in 60 MB
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vwt6m7/i_developed_my_own_quantized_llm_from_scratch/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T04:55:45.000Z'
fetched_at: '2026-08-24T11:01:49.468Z'
---
Reposting here after sharing this on [r/MachineLearning](r/MachineLearning) a few days ago, where it got a much better response than I expected (300+ upvotes, great questions, zero roasting)
 GitHub is at 35 stars now. So here it is.
 I trained a 250M parameter model from scratch on 30B tokens of fineweb. It’s quantized to under 2 bits so the whole deployment is 60 MB and it needs about 80 MB of RAM to run. Runs around 400 tok/s on a normal laptop CPU, no GPU needed, no framework, just a small compiled runtime (Windows and Linux included, MIT licensed).
 Language modeling quality of the base model, measured on held-out English web text that was never seen in training (educational web pages, 2,048 token windows): cross entropy 3.15 nats per token, perplexity 23.3, 0.99 bits per byte.
 How the long context works: the most recent 2048 tokens stay in fp16 like a normal KV cache. Everything older gets compressed to 1 bit and written to disk, about 320 bytes per token, so 1 million tokens of history is roughly 320 MB on disk. From the start the model was trained to retrieve from that disk cache, up to 100M tokens. Due to a limited budget it wasn’t trained to reason over those tokens, only retrieve and answer from them.
 The vocabulary is also not a normal embedding table. Every token is a fixed 512-bit code, 8.4 MB for all 131k tokens, zero trained parameters. I tested it on WordSim-353 (human word similarity ratings): my table scores 0.619 Spearman correlation vs 0.029 for random codes. Test script is in the repo.
 Some outputs (settings included so you know I’m not cherry picking, all reproducible from the repo):
 “Explain photosynthesis in two sentences.” (greedy)
 Photosynthesis is a process in which plants convert sunlight into chemical energy, which is then used to produce oxygen and other chemicals. This process is called photosynthesis.
 “Write a short poem about the sea.” (temp 0.25, top-k 30, rep 1.15, seed 2)
 The waves had swept over, and they were crashing ag
