---
title: >-
  Uploaded Unsloth Qwen3.6-35B-A3B UD XL models with MTP grafted, here are the
  results
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5r4tz/uploaded_unsloth_qwen3635ba3b_ud_xl_models_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T21:51:47.000Z'
fetched_at: '2026-05-07T10:33:23.086Z'
---
Following my previous post https://www.reddit.com/r/LocalLLaMA/comments/1t5ageq, a few people asked for the 35B A3B version.
 The model is up on HuggingFace at https://huggingface.co/havenoammo/Qwen3.6-35B-A3B-MTP-GGUF if anyone wants to check it out. It includes the isolated MTP layers and convert.py as well.
 The results are not great though. Q4 only got a 6% speed increase and Q8 only 2.5%. On the 27B it was a 2-2.5x gain, so this could be related to the MTP implementation of llama.cpp and the qwen35moe architecture or just a limitation of the model. Results are preliminary and might change in future. Either way, wanted to report back for anyone who was wondering.
  
Edit: u/AdamDhahabi reported:
  
2x 5070 Ti + 3090: Q8 went from 110 t/s to 165 t/s. 27B dense model runs at 2-2.5x speed.
  
So the gain might depend on your setup. Worth giving it a try!
  
Here is my own tests:
 Tested with the prompt hello can you tell me a story on Q4.
 Hardware: 5090 FE
 Without MTP: 215 t/s  prompt eval time = 24.12 ms / 17 tokens ( 1.42 ms per token, 704.84 tokens per second) eval time = 6872.43 ms / 1478 tokens ( 4.65 ms per token, 215.06 tokens per second) total time = 6896.55 ms / 1495 tokens 
 With MTP: 228.83 t/s  prompt eval time = 30.08 ms / 17 tokens ( 1.77 ms per token, 565.10 tokens per second) eval time = 8552.05 ms / 1957 tokens ( 4.37 ms per token, 228.83 tokens per second) total time = 8582.13 ms / 1974 tokens draft acceptance rate = 0.61434 ( 1268 accepted / 2064 generated) 
 Same prompt on Q8.
 Hardware: 5090 FE + 3090
 Without MTP: 148.20 t/s  prompt eval time = 25.80 ms / 17 tokens ( 1.52 ms per token, 658.97 tokens per second) eval time = 11525.23 ms / 1708 tokens ( 6.75 ms per token, 148.20 tokens per second) total time = 11551.03 ms / 1725 tokens 
 With MTP: 152.02 t/s  prompt eval time = 39.39 ms / 17 tokens ( 2.32 ms per token, 431.61 tokens per second) eval time = 10123.54 ms / 1539 tokens ( 6.58 ms per token, 152.02 tokens per second) total time = 101
