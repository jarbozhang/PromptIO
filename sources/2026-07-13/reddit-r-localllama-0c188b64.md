---
title: i would like to share my experience. working with huge LLMs and poor Machine
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu6qvh/i_would_like_to_share_my_experience_working_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T05:43:37.000Z'
fetched_at: '2026-07-12T23:01:41.977Z'
---
hello people
 i wanted to share my experience with big and huge models (usually 100B+ models and 200B+ models and more)
 my laptop specs is very poor
 I7-8750H
 20G Ram
 GTX 1050 Mobile 4G Vram
 but what nearly saved me is my NVMe from samsung
 i have 512G NVMe from samsung
 and yes as you expected. i run these huge models while throwing most of the parameters in my NVMe
 but i strictly use MoE models, Dense models will kill my machine
 always used mmap. and throwing experts in my CPU
 with Quantized KV Cache (Q4_0)
 and the Quantize i usually choose when it comes to download huge model is Q3, not Q4. and if the model was extremely huge (exceeding 700B+ with more than 20B Active parameters) i dont go lower than Q2
 now coming to my experience
 i use LM Studio not llama-cpp
 i used Deepseek-V4-Flash (specifically UD-IQ3_XXS)
 i got tok/sec: 1.0 - 1.8 (could go higher. could go lower)
 and goddamn. i use these models with batches style. i send a mission. and go touch some grass. then comeback again
 but it do the job actually pretty well. my main usage is, Reverse Engineering, Bug fixes in codebases. and Code Auditing
 another experience with Nemotron-3-Super-120B-A12B UD-Q3_K_M
 getting tok/sec: 1.5-2.5
 using same thing. Batches style, send a message and go, send and go
 working well with DS-V4-Flash
 i used both in opencode, Pi
 Context window used, was around 16K to 90K could be more, could be lower,
 i know that you will recommend using Cloud models at this point, but sadly my country banned any worldwide transactions, using debit or most credit, so i either had to use Free Cloud models or big local models, and i was curious about trying these on my machine, was good experience, would use them in worst cases (no free models available)
 i would love to hear any helps that could push this 1 tok per sec into 2 or 3
    submitted by    /u/Felix_455-788  
 [link]   [comments]
