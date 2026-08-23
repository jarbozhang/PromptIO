---
title: Finally - 4xRTX 5060TI
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1u6u3su/finally_4xrtx_5060ti/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-15T21:32:54.000Z'
fetched_at: '2026-06-16T06:31:40.322Z'
---
nvtop showing clocks and PCIe speed while running gpu_burn
 I wrote a while ago about my plans to put together a quad 5060ti 16gb based system after finding them nicely discounted. Everything got delayed due to issues with CPU seating (damn re-used stock cooler with plastic push pins), but now I have the system up and running on a fresh Ubuntu 26.04 install.
 The whole thing is based on a new MSI MEG Z890 Unify-X board that was discounted. The key feature is that it can run 2 M.2 ports with PCIe 5.0 x4 CPU lanes as well as supporting to PCIe slots at 8x and 4x respectively (also CPU lanes). And before you say "only x4", remember that PCIe 5.0 is double the speed of 4.0, so its equivalent of PCIe 4.0 x8.
 In total I have 5 5060ti's in my home, all but one allows +6000MTs (+3000Mhz) memory overclock which helps boost the critical memory bandwidth of these cards significantly. The last one "only" allowed 5850MTs (+2925Mhz), but it should make it clear that these cards are very attractive for memory OC.
 I use two of these adapters https://www.amazon.de/dp/B0FWJXDLHQ to plug 2 extra GPUs into the system. In total i use 2 PSUs, one is shared with an Y-splitter between the two adapters and the other powers the main system.
 I have just installed the nvidia driver matching aikitoria/open-gpu-kernel-modules: NVIDIA Linux open GPU with P2P support and hope to do some basic benchmarks with and without that optimization in place. 
 I don't have all the software setup yet, so no benchmarks yet, just wanted to share the happy news and information that these M.2 adapters actually work quite nicely.
 If anyone have tips or tricks or suggestions on settings or benchmarks to try let me know. My main goal is to run Qwen 3.6 27B at Q8 (maybe INT8 vllm, but also want to try the latest llama.cpp) at good speeds.
    submitted by    /u/ziphnor  
 [link]   [comments]
