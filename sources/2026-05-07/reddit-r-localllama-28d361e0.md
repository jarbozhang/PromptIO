---
title: >-
  Need advice on hardware purchasing decision: RTX 5090 vs. M5 Max 128GB for
  agentic software development
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5v2gr/need_advice_on_hardware_purchasing_decision_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-07T00:34:19.000Z'
fetched_at: '2026-05-07T10:33:23.088Z'
---
tl;dr - For software development, Qwen3.6 27B, 5090 gives you ~3x speed over M5 Max, letting you plow through code, while M5 Max gives you ~4x memory, letting you use higher quantization and bigger context. Which would you choose and why?
  
I've been doing a lot of research on this topic for a couple weeks now, but I still can't fully decide one way or another. I'm hoping to hear some other people's opinions on this, ideally from people who have used these hardware, for the type of work I plan to do. 
 I plan to use Qwen 3.6 27B for software development, ideally removing any reliance on cloud models other than an occasional API call to Opus/GPT if I really can't figure something out. I have tried running it on an M4 Max MBP, and it performed very well in the code that it generates. In terms of speed... Pretty bad. I asked it to implement this one feature, and it took about an hour and 20 minutes to complete it. Granted, this was with a GGUF model, llama-server without much optimization, on a massive repo that has no scaffolding, but nonetheless a very long time to sit and wait.
 Now, since there'll be enough RAM to load multiple models at once, I have thought about the possibility of using 27B for an orchestrator role that will handle the high-level planning, and it spinning up a 35B A3B subagent to handle the grunt work, e.g. exploring/searching the codebase, maybe even writing code. This will speed up things for sure, and can help maintain a clean context for the main agent. But I don't know how much this will affect the overall output, since 27B is better at writing code.
 M5 Max gets you way better PP speed than the M4 Max, and slightly better token generation. With newer techniques like MTP and using MLX, the speeds will be much better on the M5 Max than the M4 Max, could even approach usable speeds for agentic development but I'm not 100% sure that it does. The 128GB RAM allows me the freedom to use larger models if needed, but my main goal is code, and anyth
