---
title: >-
  Qwen3.5 35b is sure still one the best local model (pulling above its weight)
  - More Details
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1smgqgy/qwen35_35b_is_sure_still_one_the_best_local_model/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T19:46:08.000Z'
fetched_at: '2026-04-16T06:06:04.166Z'
---
Last time I posted on how this model has performed in creating the webapp based on provided research paper. I got so much love to see people has appreciated the post and of-course the potential of this MOE model.
 I am sharing details on how I used this model to create webapp just using prompt and step by step guiding it. Later I converted my guidance steps into skills using same qwen-code cli with this model, that helped to add more examples.
 Here is github repo where I have added the research-webapp-skill that you all can use and validate potential of this model on different papers.
 I have added examples in the repo research-webapp-skill/examples at main · statisticalplumber/research-webapp-skill
 Below is the command that I use to run this model on 16GB VRAM RTX 5080 Laptop
 :: Set the model path set MODEL_PATH=C:\Users\test\.lmstudio\models\unsloth\Qwen3.5-35B-A3B-GGUF\Qwen3.5-35B-A3B-UD-Q4_K_L.gguf echo Starting Llama Server... echo Model: %MODEL_PATH% llama-server.exe -m "%MODEL_PATH%" --chat-template-kwargs "{\"enable_thinking\": false}" --jinja -fit on -c 90000 -b 4096 -b 1024 --reasoning off --presence-penalty 1.5 --repeat-penalty 1.0 --temp 0.6 --top-p 0.95 --min-p 0.0 --top-k 20 --context-shift --keep 1024 if %ERRORLEVEL% NEQ 0 ( echo. echo [ERROR] Llama server exited with error code %ERRORLEVEL% pause ) 
 I have tried gemma4 26b moe, its not able to make app where qwen is keeping hold of context even at 70 80K. I tried latest jinja template of gemma4 and latest models from unsloth but still its not able to pull this task.
 Again, I might be doing somewhere wrong, as I like this model too which I am using running at llama-server native UI for other tasks.
 Thanks
    submitted by    /u/dreamai87  
 [link]   [comments]
