---
title: >-
  Follow-up: Trying to make NVIDIA GPUs plug-and-play on Macs. Found hidden RDMA
  symbols Apple doesn't want you to see — zero-copy GPU memory sharing might
  already work.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5g7cf/followup_trying_to_make_nvidia_gpus_plugandplay/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T15:27:31.000Z'
fetched_at: '2026-05-07T10:33:23.088Z'
---
TL;DR: My last post about testing TinyGPU attracted some interest. This is the follow-up. The Blackwell card is detected and the driver loads, but NVIDIA's GSP firmware fails to boot through TB5 (known issue, I'm working with tinygrad on it). While debugging that, I went down a rabbit hole and discovered that Apple's RDMA subsystem accepts Metal GPU buffers for zero-copy network transfers — something nobody has documented. I also found hidden ibv_reg_dmabuf_mr symbols in Apple's libibverbs that suggest GPUDirect RDMA might be possible on macOS without any kernel modification. Here's everything I found and where I need help.
 https://preview.redd.it/d1086k5fcjzg1.png?width=3024&format=png&auto=webp&s=84e4ddd650c2a56637f63c4db0a85ff85d3d5fd0
 The setup (for those who missed the last post)
 I'm running a 4-node Mac cluster (3x M3 Ultra + M5 Max MacBook Pro, ~1.5TB unified memory total) connected via Thunderbolt 5 with JACCL RDMA for distributed inference. I just got an RTX PRO 5000 Blackwell 72GB in a Razer Core X V2 and plugged it in to test TinyGPU.
 What happened with the Blackwell card
 The card is detected. macOS sees it on PCIe (link up, x4 @ 16 GT/s, 80 Gb/s TB5). TinyGPU's DriverKit extension loads and matches. BAR0 MMIO is mapped — I can read and write GPU registers. But NVIDIA's GSP firmware fails during initialization:
 RuntimeError: RPC call 4097 failed with result 101 
 I decoded the NOCAT error records and found FBFLCN UNRECOGNIZED_CLIENT — the GPU's memory fabric doesn't recognize the requesting PCIe peer through the TB5 tunnel. This is a known issue affecting all NVIDIA GPUs on TB5 enclosures (tinygrad#15843). AMD GPUs work fine through the same enclosures. I've posted my NOCAT decode findings on the issue — would love to collaborate with the tinygrad team or anyone who's worked on NVIDIA GSP firmware init to get this fixed.
 But here's what I found while debugging
 While researching whether NVIDIA eGPU VRAM could eventually participate in RDMA transfer
