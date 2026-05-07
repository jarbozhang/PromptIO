---
title: Great results with Qwen3.6-35B-A3B-UD-Q5_K_XL + VS Code and Copilot
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5pdf8/great_results_with_qwen3635ba3budq5_k_xl_vs_code/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T20:47:02.000Z'
fetched_at: '2026-05-07T10:33:23.089Z'
---
Long post, but hopefully helps somebody. Llama-cpp vulkan server running single AMD R9700. The settings below are showing great results with a large prompt to generate a test website that ChatGPT gave me. I then ran a prompt to generate a full suite of Playwright tests.
 I only had to nudge it once when creating the tests to tell it to fix one failing test at a time. The website was fully functional on first run.
 I think I am done tweaking and testing models (until the next big release) and can get back to coding now...
 llama-cpp | ========== LLAMA.CPP STARTUP COMMAND ========== llama-cpp | /app/llama-server -m /models/Qwen3.6-35B-A3B-UD-Q5_K_XL/Qwen3.6-35B-A3B-UD-Q5_K_XL.gguf --ctx-size 262144 --threads 8 --threads-batch 8 --gpu-layers 99 --parallel 1 --flash-attn on --batch-size 2048 --ubatch-size 1024 --cache-type-k q8_0 --cache-type-v q8_0 --cache-ram 12000 --ctx-checkpoints 50 --mmap --no-mmproj --kv-unified --reasoning off --reasoning-budget 0 --jinja --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0.0 --repeat-penalty 1.0 --presence-penalty 0.0 
 Settings for sampling come from https://huggingface.co/Qwen/Qwen3.6-35B-A3B under the "precise coding" section.
 VS Code chatLanguageModels.json :
  { "name": "Sean Llama.cpp", "vendor": "customoai", "apiKey": "${input:chat.lm.secret.3c0c0f21}", "models": [ { "id": "Qwen3.6-35B-A3B-UD-Q5_K_XL.gguf", "name": "Qwen3.6-35B", "url": "https://llm.home.arpa/v1/chat/completions", "toolCalling": true, "vision": false, "maxInputTokens": 180000, "maxOutputTokens": 10000, "family": "Qwen3", "inputTokenCost": 0.0001, "outputTokenCost": 0.0001, "temperature": 0.6, "top_p": 0.95, "top_k": 20, "repeat_penalty": 1, "presence_penalty": 0, "frequency_penalty": 0, "systemMessage": "You are a precise coding assistant. Avoid repeating plans. Execute tasks directly. Do not restate intentions multiple times.", "timeout": 600000, "retry": { "enabled": true, "max_attempts": 2, "interval_ms": 1500 } } ] } 
 ChatGPT Generated test prompt :
 You a
