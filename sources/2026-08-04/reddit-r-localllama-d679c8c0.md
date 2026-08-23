---
title: >-
  "Data center in a Box (on Wheels)" 256Gb VRAM/512Gb RAM AI Server 6-8 Month
  Operational Review, Stability Write Up, Benchmarks
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1veg9uq/data_center_in_a_box_on_wheels_256gb_vram512gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T15:14:40.000Z'
fetched_at: '2026-08-04T11:01:38.797Z'
---
I've been out of these forums for awhile but I figured I would provide a formal update on how this has been going now that it has some operation time under its belt, just to put the information out there and share knowledge if there is any interest. I also wasn't satisfied with the quality of my original post so I will probably remove it and let this one serve as its replacement. I am an IT infrastructure engineer by profession, so my contribution to the conversation is mainly from a hardware/systems perspective rather than from the theoretical Machine Learning standpoint. I got my start with HPC's (Beowulf clusters) around ten years ago when I was a Physics undergrad in university, and this is what the experience has come to almost a decade later. Not everyone is going to want to read all of this, and that's perfectly fine, the extras are just for those who want the info.
 Starting goal/idea:
 Build an all-in-one machine to support a small business. This machine should be capable of effectively inferencing frontier MoE models; aiding the business in language/text tasks where English may not be everyone's native language; data analysis; and deep topic research. Additionally, it should be capable of simultaneous image generation tools for graphic design users, enabling rapid image editing, and presentation augments for marketing, without the business ever having to worry about API credits or hard limits on tool usage. The idea is that a 3090 stack (a still generally "good" baseline performance for LLMs) "led" by one 5090 (for best prompt processing possible during large inputs + added VRAM) would handle the workload of an advanced LLM while a second 5090 remains available for other creative work. The end result would indicate that this goal has been achieved.
 Overview
 Specs
 CPU: 64 Core TR 3995WX
 RAM: 512Gb DDR4-3200 ECC
 VRAM: 256Gb GDDR6x/GDDR7 (8x3090's + 2x5090's)
 Enclosure: Core W200 Thermaltake Case
 Mobo: ASUS Pro WRX80E-SAGE/SE Wifi
 PSU: 1300W+1600W (29
