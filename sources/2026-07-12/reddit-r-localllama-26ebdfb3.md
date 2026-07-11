---
title: 6x MI50's on PCIE vs 4x MI50's on PEX8749 and 2x on PCIE
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utlh96/6x_mi50s_on_pcie_vs_4x_mi50s_on_pex8749_and_2x_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T14:23:46.000Z'
fetched_at: '2026-07-11T23:01:42.044Z'
---
I am really excited to share this one. On the X99-E-WS motherboard.. while old and PCIE 3.0 - I think it's still pretty capable for what I'm trying to do (1TB VRAM across 3 machines). The board has seven physical PCIe x16 slots shared through the onboard PEX8747 PCIe 3.0 switches and with a 40 lane CPU + all seven slots populated, the board supports an x16/x8/x8/x8/x8/x8/x8.
 What I tested was putting a PEX8749 card on the x16 slot so that 4x MI50's ran on the switch thus freeing up 3 PCIE slots for additional cards.
 Online data is scarce for folks running the PEX8749 card and Claude/ChatGPT gave me conflicting answers on wether this would increase tg/pp speeds or decrease tg/pp speeds so I figured I'd just test the before and after.
 Hardware:
 Asus X99-E-WS (Modded BIOS to support a large number GPU's )
 Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz
 128GB DDR4 RAM
 SSD
 Model:
 dervig/m51Lab-MiniMax-M2.7-REAP-139B-A10B @ Q3_L
 Here are the results:
  
 Test 6× MI50 all direct 4× PLX + 2× direct Difference Change 
  
 pp512 139.27 138.24 −1.03 −0.74% 
  tg128 24.87 25.55 +0.68 +2.73% 
  pp512+tg128 71.12 72.47 +1.35 +1.90% 
  pp4096+tg128 120.95 120.96 +0.01 +0.01% 
  pp16384+tg128 117.69 117.27 −0.42 −0.36% 
  pp32768+tg128 103.56 103.64 +0.08 +0.08% 
  pp65536+tg128 81.99 82.67 +0.68 +0.83% 
 
 I ran llama bench multiple times and surprisingly tg was always just a smidge better .8% ~ 2.8% with the PP speed loss at less than 1%.
    submitted by    /u/Old_Grapefruit8774  
 [link]   [comments]
