---
title: I pushed Kimi K3 onto one CPU with 8 GB of RAM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vd874t/i_pushed_kimi_k3_onto_one_cpu_with_8_gb_of_ram/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T04:26:21.000Z'
fetched_at: '2026-08-02T11:00:59.744Z'
---
I deployed K3 on 32 H100s at work a couple of weeks ago and then got annoyed that there was no way to poke at it on my own machine. So I wrote an inference engine for it in C99.
 Nothing clever going on. 93% of that 1.56 TB checkpoint is routed experts, and only 16 of 896 fire per token, so the experts never become resident at all. They get read off NVMe on demand and multiplied straight out of their packed 4-bit form, no dequantization step. The dense trunk gets repacked into one file where layer L sits at a known offset and streamed one layer at a time. What stays in RAM is a dial you set.
 Numbers from my box (2x EPYC 7763, NVMe, the four GPUs in it sat idle the entire time):
  
8.24 GB peak RSS at the smallest preset, ~33 s/token
 ~128 GB gets you ~20 s/token, which is as fast as it ever got
 Output is byte-identical at every budget in between
  
I know that this is not a practical way to use K3. It is half a minute per token and it wants 1.7 TB of free disk for the checkpoint plus the packed trunk. I built it to understand the architecture by implementing it, not because you should serve anything with it.
 No BLAS, no framework, no GPU path. Six C files, libm and OpenMP, 176 KB binary.
 If you want to sanity check it before committing to a 1.56 TB download: clone and run `make && make test`. About a minute, no weights and no network needed. It builds a 13-layer model with the same tensor graph and checks it against a PyTorch reference from committed fixtures, including greedy decode and the incremental path with the KV cache and carried KDA state.
 Repo: https://github.com/FareedKhan-dev/kimi-k3-in-c/
    submitted by    /u/FareedKhan557  
 [link]   [comments]
