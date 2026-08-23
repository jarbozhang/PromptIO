---
title: >-
  I ported vLLM's serving stack to C++20: 66 MiB binary, no Python at inference,
  output checked token-for-token against vLLM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vh9lx4/i_ported_vllms_serving_stack_to_c20_66_mib_binary/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T16:45:07.000Z'
fetched_at: '2026-08-07T11:00:46.506Z'
---
I'm the author, so discount the enthusiasm accordingly. This is an unaffiliated community port, not endorsed by the vLLM project, which it uses to verify its correctness.
 What started it: I love vLLM, but a vLLM install here is 9.1 GiB of virtualenv, and I wanted to embed inference inside other software, on machines where having an interpreter in the process is a problem. And, honestly, Python dependencies have a different deployment story, in term of security (supply chain attacks), and bloat of Python itself. So vllm.cpp is vLLM's serving stack written from scratch in C++20. Nome TBD yet, calling it vllm.cpp until I have a better name.
 Continuous batching, block-paged KV, automatic prefix caching, speculative decoding, an OpenAI-compatible server. It builds to a 66 MiB binary with no Python and no PyTorch at runtime.
 The gate matters more to me than the size does. Every architecture is checked token-for-token against a pinned vLLM oracle on the same workload, and upstream's own test module gets ported in the same commit as the code. The ids have to match. 25 or so architectures so far. And yes, this project does extensive use of AI. I'm prepping follow-ups on how this is architectured (this is a port, which in some parts deviates, like support of MLX, Radix Attention, and such)
 Speed, since it is the first question. You can see in the image that we are almost ties with vLLM on high concurrency. I've tested only on DGX Spark, Thor, and AGX Orin. Qwen3.6-27B NVFP4 on a DGX Spark (GB10), against vLLM in its production graphed config, medians of 3 interleaved reps, 1024 in / 128 out:
  
 concurrency vllm.cpp vLLM ratio 
  
 1 86.05 82.32 1.045x 
  2 159.68 158.03 1.011x 
  4 292.34 290.31 1.007x 
  8 508.77 505.46 1.007x 
  16 801.76 789.16 1.016x 
  32 1095.01 1076.25 1.017x 
 
 Nominally ahead everywhere, but our run to run noise is 0.5% and five of those six sit inside 1.7%. That is one win at c1 and five ties, and I would rather say it than have someone work i
