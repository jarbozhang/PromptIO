---
title: you can now use MTP in GLM-Air
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vwhj0l/you_can_now_use_mtp_in_glmair/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T20:08:04.000Z'
fetched_at: '2026-08-24T11:01:49.495Z'
---
If anyone still remembers GLM-4.5-Air from last year, you can now get a nice speedup by enabling MTP in llama.cpp.
 It is a 106B MoE with only 12B active parameters, which makes it interesting for machines with lots of memory but limited compute, such as Strix Halo or DGX Spark. I use it on 3090s. It's still great for creative writing, especially since we never got Gemma 4 124B MoE.
 There are multiple creative-writing / RP finetunes available on Hugging Face: https://huggingface.co/models?other=base_model:finetune:zai-org%2FGLM-4.5-Air&sort=likes (some even from this year). I also recommend Intellect 3.x by PrimeIntellect
 If your GGUF does not include the MTP block, you can download a small file from here: https://huggingface.co/jacek2024/GLM-4.5-Air-MTP-GGUF
 Thanks a lot to devMiikaK and HeadCutter for testing the PR while it was in progress.
 PS. It also works for the full GLM-4.5, but I doubt anyone still uses it ;)
    submitted by    /u/jacek2023  
 [link]   [comments]
