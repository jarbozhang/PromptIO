---
title: >-
  My experience with the Intel Arc Pro B70 for local LLMs: Fast, but a complete
  mess (for now)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgdt7t/my_experience_with_the_intel_arc_pro_b70_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T03:02:10.000Z'
fetched_at: '2026-04-10T00:43:27.396Z'
---
full disclaimer using ai to help clean up my mess of thoughts. i have a tendency of not being coherent once i get many words out.
 ​TL;DR: Bought a B70 on launch day. Achieved an impressive 235 t/s with Gemma 3 27B on vLLM(100 requests), but the software stack is a nightmare. MoE is barely supported, quantifying new architectures is incredibly fragile, and you will fight the environment every step of the way. Definitely not for the faint of heart.
 ​Hey everyone,
 ​I ordered the Intel Arc Pro B70 on the 27th right when it released. I’ve previously wrestled with ROCm on my 7840HS, so my thought process was, "How much worse could it really be?" Turns out, it can be a complete mess.
 ​To be totally fair, I have to admit that a good chunk of my pain is entirely self-inflicted. I used this hardware upgrade as an excuse to completely overhaul my environment:
 ​OS: Moved from Ubuntu 25.10 (with a GUI) to Fedora 43 Server.
 ​Engine: Transitioned from Ollama -> llama.cpp -> vLLM. (Intel is heavily supporting vLLM, and I’m optimizing for request density, so this seemed like a no-brainer).
 ​Deployment: Moved everything over to containers and IaC.
 ​I figured going the container/IaC route would make things more stable and repeatable. I’ve even been cheating my way through some of it by utilizing Claude Code to help build out my containers. But at every turn, running new models has been a massive headache.
 ​The Good
 ​When it actually works, the throughput is fantastic. I was able to run a Gemma 3 27B Intel AutoRound quant. Running a vLLM benchmark, I managed to generate 235 t/s across 100 requests. For a local deployment prioritizing request density, those numbers are exactly what I was hoping for.
 ​The Bad & The Gotchas
 ​The ecosystem just isn't ready for a frictionless experience yet:
 ​MoE Support: Mixture of Experts models are still only partially supported and incredibly finicky.
 ​Quantization Nightmares: I'm currently trying to run a quant through AutoRound for Gemma
