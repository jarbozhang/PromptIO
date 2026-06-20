---
title: The Eagle(3) has landed (for Qwen)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9z4e4/the_eagle3_has_landed_for_qwen/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-19T11:11:50.000Z'
fetched_at: '2026-06-20T04:27:01.316Z'
---
https://github.com/ggml-org/llama.cpp/releases/tag/b9723
 Available in the latest release. Enabled via:
 --spec-type draft-eagle3
 You'll need to feed it a draft model. There's issues with unsloth + eagle at the moment so I've personally tested against:
 Model: https://huggingface.co/lmstudio-community/Qwen3.6-27B-GGUF
 Draft: https://huggingface.co/wimmmm/Ex0bit-Qwen3.6-27B-PRISM-EAGLE3-GGUF
 Specify your draft with -md or --model-draft
 Performance wise, I currently get very similar tps to draft-mtp. Also tensor parallelism isn't currently supported and asserts out, which I rely on a lot. The draft model will also eat a bit of vram, so not the best if you're running a very tight setup. I'll be keen to see how this develops in time!
 Don't forget you can also stack up multiple types of speculative decoding:
 --spec-type draft-eagle3,ngram-mod
    submitted by    /u/Legitimate-Dog5690  
 [link]   [comments]
