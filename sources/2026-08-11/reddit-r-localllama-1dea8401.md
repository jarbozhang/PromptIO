---
title: 'Needle 2: 14MB agentic LLM for phones, wearables, smart home and robots.'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vkqy66/needle_2_14mb_agentic_llm_for_phones_wearables/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T17:12:46.000Z'
fetched_at: '2026-08-11T11:01:01.022Z'
---
Hey LocalLlaMa, Henry from Cactus here!
 We previously released Cactus Needle, a 14MB agentic LLM for tool call, device use, and structured extraction for phones, wearables, smart homes, small robots and microcontrollers. We got really great feedback here, and have now incorporated the suggestions to release Needle 2.
 The whole model is a single 14MB binary that runs a full session in 28MB of RAM; 45m parameters at 2bit compression. Needle hits 500 tokens/sec decode speed on a Raspberry Pi 5, sits between 400-1,500 tokens/sec on VR devices like Meta Quest 3S and Apple Vision Pro, and ranges 300-700 on sub-$200 phones such as the Samsung A-Series.
 On the tool call and mobile device use benchmarks, Needle 2 trades wins with closest small models like LFM2.5 230M and Apple Foundation Model, at 5x to 70x smaller, both at f16 vs Needle 2 at 2bit. Needle is based on Simple Attention Networks from our paper (https://arxiv.org/abs/2607.18363). 
 Edge AI has lately meant Macs and PCs, but that is just 1.5 billion of over 21 billion connected IoT devices in the world today, and in emerging markets most phones ship under $200, no NPU, cheap GPUs. These include budget phones, Raspberry Pis, microcontrollers, wearables, small robots like Reachy Mini, and connected home devices. 
 A conventional transformer of Needle's width and depth spends 164 MFLOPs per token, and even one squeezed down to Needle's parameter count spends 87, Needle spends 70. Even on a high-end phone, an always-on assistant lives inside a power budget; every MFLOP is milliwatt-hours, and Needle spends 7x to 85x fewer of them per token than the smallest performant LLMs. 
 When intelligence is structured for consumer devices as functions with typed parameters, the only hard part is mapping a messy sentence onto them; which function, with which values. Our research found that when framed that way, the problem needs no world knowledge and no open-ended prose, which is why 45M parameters suffice. 
 Needle 2 expand
