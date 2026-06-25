---
title: MiniMax-M3-EAGLE3-GGUF - Llama.cpp compatible MiniMax M3 EAGLE draft model!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ud6bct/minimaxm3eagle3gguf_llamacpp_compatible_minimax/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T03:49:23.000Z'
fetched_at: '2026-06-24T01:27:25.847Z'
---
Hi all!
 With a new PR for llama.cpp, MiniMax M3's EAGLE decoder by Inferact/MiniMax-M3-EAGLE3 has successfully been converted to GGUF and runs without issue!
 The HF repo has instructions for both merging in the PR and running the model. I tested this on a 2x3090 and 128GB DDR4 system running the UD-Q2_K_XL quant and went from 2.3 tk/s to 5 tk/s, thanks to --fit and ensuring the draft model was in VRAM instead of RAM.
 It can be found here: https://huggingface.co/tonjum/MiniMax-M3-EAGLE3-GGUF
    submitted by    /u/maxwell321  
 [link]   [comments]
