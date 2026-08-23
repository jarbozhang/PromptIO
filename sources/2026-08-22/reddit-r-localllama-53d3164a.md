---
title: Qwen 3.8 27b - PI AGENT vs OPENCODE - another smaple
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vuwwww/qwen_38_27b_pi_agent_vs_opencode_another_smaple/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-22T00:02:12.000Z'
fetched_at: '2026-08-22T11:01:33.606Z'
---
That is the second comparison and the last one. 
 I will not be spamming again ;) 
 Continuation from:
 https://www.reddit.com/r/LocalLLaMA/comments/1vu0u2v/qwen_38_27b_pi_agent_vs_opencode/
 That is one of my many tests I make comparing output quality.
 What is more interesting using a PI Agent results are much better than an Opencode using a Qwen 3.8 27b ?!
 Seems PI Agent is much better in the agent environment somehow... Not counting uses less tokens , do not have a hard limit of 32k output tokens, is faster, do not freezing, compressing context far less than Opencode. For instance if you have context in the Opencode output 32k and all context 100k then the compression is starting at 67k context ... PI is starting at 90k context even if you have set output context 64k or more.
 My config for RTX 3090
 llama-server with ini config -> which is exposing API to Opencode and PI agent.
 llama-server.exe --models-preset 1_preset.ini --models-max 1 --direct-io
 config ini
 [Qwen3.8-27B_dense_c-100k] model = models/Qwen3.8-27B-Q4_K_M.gguf mmproj = models/mmproj-BF16-Qwen3.8-27B-UD-Q4_K_XL.gguf reasoning-format = deepseek flash-attn = on n-gpu-layers = 99 reasoning = on ctx-size = 100000 temperature=1.0 top-p=0.95 top-k=20 min-p=0.0 presence-penalty=0.0 repeat-penalty=1.0 mmproj-offload = false 
 ONE MORE IMPORTANT THING:
 Always use a VISION module as the model is using vision to asses the output quality!
 I am offloading it to a RAM as we do not need an extremely fast vision for a code.
 A screenshot processing on a GPU 0.3s vs a RAM 3s do not make a big difference on a few screenshots during a code generation / debugging ;)
 PROMPT:
 Create a beautiful, relaxing flight 3D simulator in a single HTML page. 
 SECOND PROMPT AFTER THE FIRS IS FINISHED:
 Also improve graphic - you can make it much better! 
    submitted by    /u/Healthy-Nebula-3603  
 [link]   [comments]
