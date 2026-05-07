---
title: >-
  Qwen3.6-27B with MTP grafted on Unsloth UD XL: 2.5x throughput via unmerged
  llama.cpp PR
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5ageq/qwen3627b_with_mtp_grafted_on_unsloth_ud_xl_25x/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T11:45:46.000Z'
fetched_at: '2026-05-07T10:33:23.085Z'
---
Hey everyone, I've been working on getting Multi-Token Prediction (MTP) working with quantized GGUFs for Qwen3-27B and the results are pretty impressive. Here's what I put together: https://huggingface.co/havenoammo/Qwen3.6-27B-MTP-UD-GGUF
 These are Unsloth's UD XL quantizations of Qwen3-27B with the MTP draft heads grafted on top in Q8_0. The base model stays in its usual low-bit quantization, while the 3 MTP layers stay at Q8 to preserve speculative accuracy.
 Sharing the grafted GGUF files (UD XL base + Q8 MTP), the raw MTP layer source I extracted (MTP_Q8_0.gguf), and convert.py, the grafting script I adapted from this gist in case anyone wants to do this for other models. Also included are full build instructions for the custom llama.cpp.
 Qwen3 was trained with 3 MTP steps, meaning each forward pass predicts 4 tokens at once. llama.cpp's main branch doesn't support MTP yet, so I pulled in the speculative decoding support from the still-open PR #22673, merged it on top of master, and built llama-server from that. Run it with: --spec-type mtp --spec-draft-n-max 3
 The results: roughly 2.5x token throughput compared to running the same UD XL GGUF without MTP, with a solid acceptance rate where most draft tokens are kept, meaning the MTP heads are genuinely useful and not just burning compute. The Q8 MTP layers also add very little VRAM overhead since they're a tiny fraction of the full model.
 MTP is one of the biggest efficiency wins available for speculative decoding, but it's basically unsupported outside of official Qwen3 deployments on SGLang and vLLM. This brings it to GGUF and llama.cpp, meaning you can run it locally with the same tooling you already use. PR #22673 will hopefully land soon and this will all just work out of the box. In the meantime, the merge process is straightforward (3 git commands).
 Happy to answer questions or help anyone get it running. Let me know if you try it and what speeds you see!
 Full step by step instructions are in the H
