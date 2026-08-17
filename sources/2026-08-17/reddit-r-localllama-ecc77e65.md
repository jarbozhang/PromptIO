---
title: Qwen3.8 27B reasoning effort low/medium/xhigh comparison
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vpuh7m/qwen38_27b_reasoning_effort_lowmediumxhigh/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T11:20:58.000Z'
fetched_at: '2026-08-17T11:01:38.921Z'
---
I did a short test of the different reasoning efforts, since on default xhigh the model thinks a lot.
 Not very scientific, just a quick "generate an SVG of a pelican on a bicycle" prompt with 3 different seeds. I think the result is interesting none the less: xhigh gives *much\* higher visual fidelity - but it also takes about 7x as long as low. Low and medium seem to be very close to each other.
 https://preview.redd.it/fkbx5qf41qjh1.png?width=1560&format=png&auto=webp&s=bfc1e9679802605c61af203ca27422ed763b6a19
 Hardware and setup
  
GPU: NVIDIA RTX 5080 Laptop GPU, 16 GB VRAM
 Model: unsloth/Qwen3.8-27B-UD-IQ3_XXS
 llama.cpp: build 10451, commit 10bf611e5
 Context: 65,536
 KV cache: Q8_0
 Flash Attention: enabled
 MTP speculative decoding: --spec-default --spec-type draft-mtp
 --fit off
 One concurrent slot
  
Prompt:
  
Create a polished SVG graphic of a pelican riding a bicycle. The result must clearly show a recognizable pelican actively riding a recognizable two-wheeled bicycle. Return only one complete, self-contained SVG document with a viewBox; no Markdown fences, prose, external images, JavaScript, or animation.
  
Average results
  
 Reasoning effort Reasoning tokens SVG tokens Total completion Wall time Generation speed MTP acceptance Visual score (Codex rated) 
  
 Low 4,418 3,966 8,387 111.6 s 75.4 t/s 62.1% 21.8/25 
  Medium 5,918 3,038 8,959 127.4 s 70.5 t/s 58.3% 22.5/25 
  X-High 39,398 5,085 44,487 717.8 s 62.0 t/s 52.7% 24.0/25 
 
    submitted by    /u/Danmoreng  
 [link]   [comments]
