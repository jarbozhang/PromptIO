---
title: >-
  GLM-5.2 (744B, 2-bit) at 7.3 tok/s on 4×3090 + 192GB — and why IQ1_M wasn't
  any faster
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9mpty/glm52_744b_2bit_at_73_toks_on_43090_192gb_and_why/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-19T00:06:31.000Z'
fetched_at: '2026-06-19T14:35:21.918Z'
---
TLDR: For the first time, I feel relief that they could shut down the cloud services and I would be ok. I got my 4th 3090 and then unsloth dropped the Q2 and Q1. I wrote nothing else here its from CC, so it might be wrong. GLM-5.2 UD-IQ2_M runs across 4×3090 + RAM expert offload at ~7.3 tok/s. Two decode A/Bs: halving the quant (IQ2->IQ1) did NOTHING; going 6->12 CPU threads gave +22%. The offloaded-expert decode is bound by CPU compute, not memory bandwidth.
 ## Hardware
 - Ryzen 9900X, 192GB DDR5-5600
 - 4× RTX 3090 (1 Ti + 3 FE), 96GB total. One card sits on a PCIe x1 link (chipset-lane tradeoff to keep the boot NVMe at x4).
 ## Config
 - unsloth GLM-5.2 UD-IQ2_M, 223GB on disk (744B total / 40B active)
 - llama.cpp master. Arch is glm-dsa (MLA + DeepSeek sparse attn + nextn). Older releases won't load it — needs a current build.
 - ~83GB across the 4 GPUs (19 of 75 MoE layers' experts) + ~166GB resident RAM (the other 56 layers, computed on CPU). q8_0 KV is basically free thanks to MLA.
 ## --n-cpu-moe will OOM you
 With -sm layer, the kept-on-GPU experts all land on the LAST card and it tried to alloc 54GB on a 24GB GPU. Fix: place experts per-device explicitly —
 -ot "blk\.(3|4|5)\.ffn_(gate|up|down)_exps=CUDA0" ... CUDA1/2/3, with a =CPU catch-all last. Spread evenly; the card holding output/embeddings runs tightest.
 ## What actually moves decode (two A/Bs, one variable each)
 - IQ1_M (213GB) vs IQ2_M (238GB), same split: 7.30 vs 7.29 tok/s. Identical.
 - 6 threads vs 12 threads, same everything: 5.83 vs 7.14 tok/s. +22%.
 Decode is bound by the CPU compute of the active offloaded experts (dequant + matmul), NOT bandwidth. Smaller quant = same matmul shape = same FLOPs = no gain. More cores = gain, up to your physical core count. (Prefill was flat at 135 tok/s across threads -- not core-bound.) The levers that work: more cores, more experts on GPU (fewer offloaded layers). Quant size isn't one.
 ## MLA helps long ctx but doesn't make 1M free
 KV is ~6GB at 1
