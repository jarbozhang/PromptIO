---
title: I benchmarked 15 "E-Waste" GPUs with Modern Workloads
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uvcjd0/i_benchmarked_15_ewaste_gpus_with_modern_workloads/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T14:05:18.000Z'
fetched_at: '2026-07-13T23:01:48.262Z'
---
I've spent the last year building GPU coolers and a custom benchmarking tool to figure out if decommissioned NVIDIA enterprise GPUs have any use with modern workloads. Cards like the P100 (16GB) are going for around $75 and the V100 (16GB) for under $200. Combined with dirt-cheap X99 Xeon motherboards, they are a massive source of idle VRAM that's hard to ignore for the homelab.
 People often finger-wag and warn against these due to EOL software and terrible power efficiency. But for a homelab? You can easily work around software limits by compiling older software (like llama.cpp) from source, and to save power, just turn the box off when you aren't doing AI tasks.
 Over the winter, I used a custom Dockerized benchmarking suite to test a whole box of Tesla GPUs (K80, M10, M40, M60, P40, P100, V100, T40) across LLMs, computer vision, Blender, Whisper, and more.
 Here is the TL;DR of the results:
  
The V100 is the Sweet Spot: The V100 (16GB) completely surprised me. Its performance hangs right up there with the much more expensive T40.
 P40 > P100 for LLMs: The community consensus holds true here. If you specifically want to run Large Language Models, with Pascal, use P40.
 M60 is a Whisper Beast: If you have a ton of audio transcription to do, the M60 is shockingly capable (beating even V100) and can be had for only $50.
 Scaling is Linear: Stacking cards doesn't hit a wall of diminishing returns within a 4U chassis. More GPUs generally equal linear performance scaling, though if you mix generations, slower cards will bottleneck your faster ones in LLM setups.
 CPU/Mobo Choice: Faster single-core CPU speeds help slightly for tasks like Whisper and Vision Transformers, but generally, any cheap X99 board and high-lane Xeon will feed these GPUs perfectly fine.
  
The complete set of graphs and findings are on my blog. Now that I have the setup and tooling, I'd love to benchmark more workloads, anything missing from my findings you'd like to see next?
    submitted by  
