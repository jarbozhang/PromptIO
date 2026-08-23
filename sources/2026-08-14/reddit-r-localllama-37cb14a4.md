---
title: 'Fixed Jinja chat template for Qwen 3.5, 3.6, and the new 3.8 release'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vnm7le/fixed_jinja_chat_template_for_qwen_35_36_and_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-13T20:22:56.000Z'
fetched_at: '2026-08-14T11:01:32.393Z'
---
Qwen just released their first 3.8 model.
 The main addition in 3.8 is prompt-steered reasoning effort. You can tell the model how deeply to think by setting reasoning_effort to xhigh, medium, or low.
 However, the official template still has some serious problems:
  
You cannot disable thinking. If you pass enable_thinking=false, it 3.8 crashes with a hard exception.
 Chat history gets poisoned. In multi-turn chats, the official template injects blank <think></think> tags before real thoughts.
 Tool calling crashes. If your client passes arguments as JSON strings (the standard OpenAI API format), the official template crashes.
 Agent stalls. The official template often drops mid-dialogue system messages and wedges multi-step tool loops.
  
I maintain a single, drop-in fixed Jinja template that works across all Qwen 3.5, 3.6, and 3.8 models:
 https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates
 What this template does:
  
Full 3.8 reasoning effort support: Steer reasoning depth with reasoning_effort (xhigh, high, low, medium).
 Restores the thinking toggle: Turn off reasoning whenever you want fast answers, either via kwargs or by typing <|think_off|> in your prompt.
 100% KV Cache hits: Keeps past thoughts intact by default so your prefix cache stays warm across turns.
 llama.cpp support: Native support for the new --reasoning-preserve flag.
 Universal tool parsing: Handles both Python dicts and JSON strings. Works on llama.cpp, vLLM, LM Studio, and MLX.
  
Recommended llama-server launch command:
 llama-server -m your_model.gguf --jinja --chat-template-file chat_template.jinja --reasoning-format deepseek 
 (The --reasoning-format deepseek flag separates thinking into the OpenAI reasoning_content field so OpenCode, Claude Code, and other harnesses do not stall on raw tokens).
 Note on hardware:
 I cannot run a 2.4 trillion parameter model on my local rig. The template passes all 28 automated tests and tokenizer parity checks, but I would appreciate feedback 
