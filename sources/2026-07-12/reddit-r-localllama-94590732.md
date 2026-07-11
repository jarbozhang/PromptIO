---
title: >-
  Performance comparison on full compute performance (Anima) and LLM prompt
  processing of 5090 (600,475 and 400W) vs 6000 PRO MaxQ shunt modded and water
  cooled (at 300, 400, 475 and 600W), and 6000 PRO
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utvbey/performance_comparison_on_full_compute/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T20:49:53.000Z'
fetched_at: '2026-07-11T23:01:42.043Z'
---
Hello guys, hoping you're doing fine!
 I'm continuing after this post some time ago, comparing stock MaxQ performance and such on Anima here.
 This time, I shunt modded the 6000 PRO MaxQ, to use up to 2x amounts of power. These cards seems to be binned for high clocks and it is reflected after this.
 R002 resistance on top of stock resistance, making the card thinks it pulls half of the power, thus reaching 600W max power.
 (Note that you can also solder a R002 resistance on the empty pad and it would work the same)
 I also did watercool them to manage the heat, with a Bykski block (this one) at 170USD each from Aliexpress and a GLZM 360mm AIO. So had to get the tubes, coolant and fittings.
 Sorry for the finger marks
 GLZM AIO
 For reference, at 300W it maxes at about 45°C, and at 600W it maxes at about 60°C.
 MaxQ running at 624W
 I also rented on runpod, a 6000 PRO WS edition, which it's power limit ranges from 150W to 600W (yes, lower than the MaxQ)
 Important note again: I did undervolt+overclock the 5090 and the 6000 PRO MaxQ. I can't modify the clocks or power on the rented GPUs on runpod.
 So for this test, I ran these settings for the software for pytorch:
  
Torch 2.14.0.dev20260612+cu132 for the 5090 and 6000 PRO MaxQ.
 Torch 2.13.0+cu132 stable for the 6000 PRO WS.
 Sageattention 2.1 (on commit e9b072f0fc2682f104abbda306af3d42fc33b969), self built on CUDA 13.3.
 Forge neo on commit 644450e8bf2df24f0ba87307604d0e9f4ae3a9f7
 Installed extensions for RTX Upscaling (https://github.com/Haoming02/sd-forge-nvidia-vfx) and for extra samplers (https://github.com/Panchovix/sd_forge_neo_extra_samplers)
 torch compile: max autotune no cudagraphs
  
I ran these settings for the samplers and steps:
 Forge settings
 On text:
  
EXP Heun 2 x0 SDE for first 25 steps
 ER SDE for 10 hires pass steps
 Upscale by 1.5x
 896x1088 resolution
 Batch size 4
 CFG 5
 Shift 3
 Denoise Strength: 0.2
 Upscaler: NVIDIA Ultra
 Seed: 50906000
  
Prompt used was:
 Positive:
 masterpiece, 
