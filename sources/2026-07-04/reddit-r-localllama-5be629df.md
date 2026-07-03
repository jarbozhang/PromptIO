---
title: 'GLM5.2 on 5x Pro 6000s and a 5090, an expensive journey'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1umcr5m/glm52_on_5x_pro_6000s_and_a_5090_an_expensive/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T12:10:07.000Z'
fetched_at: '2026-07-03T23:01:09.833Z'
---
This started as something I thought was reasonable. I already had a 5090 for my gaming machine, and I thought a second 5090 would make me happy. Instead, it sent me down a rabbit hole that got completely out of control.
 I wanted something that would have full PCIe 5.0 x16 speed across all slots, which started a chain of events that had me spending good money after bad. It was a bit of a nightmare, as every decision I made led to me needing to make even tougher decisions. Couple that with what was actually available, and my hand was forced in a few spots.
 I started with the motherboard and worked my way backwards, eventually ending up with this setup. I wanted something close to endgame, but I still made a few concessions:
 Threadripper Pro 9975WX
 WRX90 Sage SE
 4×48 GB DDR5-6400 RDIMM
 Antec 900 case — ended up in the bin
 The system started with two 5090s. The Antec 900 is well built, with huge space, smart connections, and refined edges, but ultimately it did nothing at all to support the GPUs. In a case this large and at this price point, that is a huge failure on their part, and for that reason I recommend avoiding it. If they had put $1 worth of bracketry in the machine to support GPUs, I’d give it a 10/10. With the lack of support, it is nearly useless unless you deal with it yourself, which I did, as you can see in the images. It’s like buying a Ferrari and having it delivered without any petrol.
 With the two 5090s, I was working with smaller Qwen models, which seemed great, but it was clear that with the limited VRAM and my desire for additional sidecars like VL, I needed something more. I had huge plans, and the models were just too small to deal with the complexity.
 So I got my first Pro 6000. I coupled it with a 5090, which made for weird tensor splits, but llama.cpp did a good job of divvying it all out. But now I was working with 120B-parameter models with almost no space for context. So it was smarter, but also a goldfish.
 Then I went to 2× Pro 6
