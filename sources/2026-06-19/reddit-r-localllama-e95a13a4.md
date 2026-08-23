---
title: Giving GLM-5.2 a spin locally on CPU only! (poor man's rig for big models)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9jbd4/giving_glm52_a_spin_locally_on_cpu_only_poor_mans/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-18T21:40:26.000Z'
fetched_at: '2026-06-19T14:35:21.917Z'
---
This is the UD-Q2-K_XL quant.
 Hardware is:
 Model: Dell PowerEdge R740
 CPU: Dual Xeon 6248R (24 cores each)
 RAM: 768 GB (All memory channels populated)
 I'm using ik_llama.cpp which provides some significant performance improvements over the base llama.cpp for CPU-only inference.
 Unfortunately, we dual CPU folks have to worry about NUMA nodes and cross-socket memory latency which tanks performance, so I've isolated it to a single node for CPU cores and memory which gives me 24 cores and 384 GB node-local RAM to play with. I have model weights and 1M context fully in RAM.
 In basic chat, it's alright all things considered. 4 to 5.5 tok/s generation with MTP drafting turned on. Gets progressively worse as context grows of course, like when coding. I'm seeing about 3 tok/s as I start working with it in opencode.
 Speaking of which, here's the prompt I gave it where its output is in the screenshot:
 Create a plan to write a portable 6502 CPU emulator in C99. The CPU only. Cycle accuracy is not required. It should be written in a way that it can easily be wired into a broader system emulator. Memory read/write functions will be externally provided by the project it's used in:
 uint8_t mem_read(uint16_t address)
 void mem_write(uint16_t address, uint8_t value)
 So yeah, it's not really seriously usable on this hardware of course, but I wanted to play with this beast of a model a bit locally. In coding, it really is giving frontier vibes. I'm just happy that we can actually run a model this strong on our own hardware, and it's got me excited for what's coming next!
    submitted by    /u/_TheWolfOfWalmart_  
 [link]   [comments]
