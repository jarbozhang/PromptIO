---
title: >-
  The boring way to run Deepseek V4 Flash-0731 130-150 tks - 16x5060ti 16GB over
  2 PLX88096 switches
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vthcwk/the_boring_way_to_run_deepseek_v4_flash0731/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T11:53:54.000Z'
fetched_at: '2026-08-21T11:01:41.845Z'
---
Component Validated configuration 
  
 Motherboard ASRock Rack SPC621D8U-2T/OVH 
  CPU Xeon Gold 6330 (Get gold/platinum if interested in Optane Pmem gimmicks) 
  GPU fabric Two Broadcom/PLX PEX88096 islands, eight GPUs per island 
  GPUs 16 x RTX 5060 Ti 16 GB 
  OS Ubuntu 22.04.5 LTS 
  Kernel 6.8.0-106-generic 
  NVIDIA driver Aikitoria patched open driver 610.43.02-p2p 
  Required BAR1 16,384 MiB on every GPU 
 
  
UEFI boot enabled; CSM disabled.
 Secure Boot disabled. The locally built EFI application and patched NVIDIA modules are unsigned.
 Above 4G Decoding enabled.
 MMIO High Granularity set to 1024G.
 MMIO High Base set around 56T.
 SR-IOV disabled on this machine.
 intel_iommu=off pci=realloc=on,hpmmioprefsize=512G in GRUB;
 NVreg_EnableResizableBar=1 for the NVIDIA module;
 Sets size code 14 → 16 GiB BAR1 on each of the 16 GPUs
 Temporarily disables PCI memory decoding and clears the old BAR1 address so Linux can reallocate it.
 PLX switch ACS control register: For every PLX/PEX bridge, writes: ECAP_ACS+0x6.w = 0000
  
After that, a little vibe coding to make custom all-reduce work within each PLX cluster and make DSpark work for pipeline parallel.
 For tensor parallel 8, pipeline parallel 2:
 500k context available. Around 4000 pp up to 500k context, tg 100-150 (Averaging 140 in DeepSeek Harness)
 For tensor parallel 4, pipeline parallel 4:
 Full 1M context available. Around 7000 pp up to 500k context, tg 80
 Paid 0.6 x RTX6000 Pro for the whole setup.
 Updated concurrent request result:
 Testing with 1, 4, 8, and 16 concurrent 1024→512 requests, measuring aggregate throughput, per-user speed, and latency with max-num-seqs=16.
  
 Layout Concurrent users Req/s Output tok/s Tok/s/user Speedup Scale efficiency Median TTFT P99 TTFT Median TPOT P99 TPOT 
  
 TP8/PP2 1 0.434 222.46 222.46 1.00× 100% 273 ms 301 ms 3.49 ms 8.68 ms 
  TP8/PP2 4 1.093 559.43 139.86 2.51× 62.9% 312 ms 862 ms 6.23 ms 10.59 ms 
  TP8/PP2 8 1.296 663.63 82.95 2.98× 37.3% 336 ms 1,6
