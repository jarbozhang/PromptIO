---
title: Are you ready for Le Chaton FAT or still wasting money on GPUs?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vdmfmi/are_you_ready_for_le_chaton_fat_or_still_wasting/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T16:25:41.000Z'
fetched_at: '2026-08-03T11:01:09.274Z'
---
According to rumors (spread by myself) Le Chaton FAT will be 26T-a3b and I AM READY for it. 
 Let's be real, I can't afford that many 5060Ti, so I got 12x Gen 4 3.2 TB (two per card). This gives me about 60GBs bandwidth on 30TB. 
 Added 256gb ddr4 just for kv cache, but I can also write KV-cache to the disks, these are high endurance drives.
 Are you ready for the next era of local inference?
  
Jokes aside, this is what I use for my HF_HOME - model and dataset storage. I'm also setting up a few containers, but it's not running any heavy compute stuff, the CPU is only a 3945WX (12c/24t). 
 The pool is actually raidz2, so I avoid all that worry of having agents delete stuff. I just zfs snapshot and no rm -rf foo-bar has me sweat.
  
Full Specs
  
CPU: Threadripper 3945WX
 CPU cooler: Arctic Freezer 4U-M Rev. 2
 RAM: 8x32GB DDR4 ECC REG 2133
 GPU: None 
 Motherboard: Asrock WRX80 Creator
 Case: Silverstone SST-RM47-502I
 PSU: 1600W Corsair
 Storage: 
 1TB NVMe
 6x Intel SSD D7-P5608 6.4TB
 
  
This is very much a product of multiple marketplace heists. The SSDs are on a PCIe x8 interface, but it's actually two x4 interfaces, so you need bifurcation x4x4x4x4 on every slot.
    submitted by    /u/reto-wyss  
 [link]   [comments]
