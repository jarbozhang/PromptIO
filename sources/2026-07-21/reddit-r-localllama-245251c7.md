---
title: Gemma 4 is still lazy
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1v1ccun/gemma_4_is_still_lazy/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T05:22:51.000Z'
fetched_at: '2026-07-20T23:00:57.696Z'
---
Please tell me I'm doing something wrong.
 My config:
 [*] flash-attn = on jinja = true fit = true offline = true mmproj-offload = false mmap = false cram = -1 parallel = 1 [unsloth/gemma-4-31B-it-qat-UD-Q4_K_XL-TP-WORK-147K] hf = unsloth/gemma-4-31B-it-qat-GGUF:UD-Q4_K_XL ctx-size = 147456 temp = 1.0 top-p = 0.95 top-k = 64 sm = tensor fit = off spec-default = true chat-template-kwargs = {"preserve_thinking": true} 
 I've pulled the latest Unsloth GGUF with the new chat template, set preserve thinking to true, yet still Gemma is just terrible at agentic work. I give it a task in Hermes, it does a couple of tool calls, responds with something along the lines of "I did A but B and C happened, now I'm gonna do D" and just stops. I tell it to just do the task and not stop, and it does it again. Not an issue with Qwen 3.6 27B at UD-Q5_K_XL, not an issue with DeepSeek V4 Flash at UD-IQ3_XXS, not an issue even with the older GPT-OSS 120B, I can give a task to all of these and come back to see them still fruitfully chewing on the problem, so, what's up with Gemma 4?
 Is the model really just bad for multi-turn agentic work? To be fair, Gemma is a great chatbot. I enjoy discussing topics like worldbuilding with it. But it just feels like it doesn't want to put any effort into agentic work, despite clearly being a very capable model.
    submitted by    /u/ABLPHA  
 [link]   [comments]
