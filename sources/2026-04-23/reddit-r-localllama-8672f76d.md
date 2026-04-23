---
title: 'Running Qwen3.6-35B-A3B Locally for Coding Agent: My Setup & Working Config'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ss9pku/running_qwen3635ba3b_locally_for_coding_agent_my/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T03:20:56.000Z'
fetched_at: '2026-04-23T02:21:55.375Z'
---
Hardware
  
 Component Details 
  
 Machine MacBook Pro (Mac14,6) 
  Chip Apple M2 Max — 12-core CPU (8P + 4E) 
  Memory 64 GB unified memory 
  Storage 512 GB SSD 
  OS macOS 15.7 (Sequoia) 
 
 AI Agent Setup
 I'm using the pi coding agent as my primary development assistant. It's a local-first AI coding agent that connects to local models via llama.cpp.
 Model: Qwen3.6-35B-A3B (running via llama.cpp)
 How pi Connects to llama-server
 The pi agent communicates with llama-server via the OpenAI-compatible API. Configuration lives in ~/.pi/agent/models.json:
 { "providers": { "llama-cpp": { "baseUrl": "http://127.0.0.1:8080/v1", "api": "openai-completions", "apiKey": "ignored", "models": [{ "id": "Qwen3.6-35B-A3B", "contextWindow": 131072, "maxTokens": 32768 }] } } } 
 The Command
 llama-server \ -hf unsloth/Qwen3.6-35B-A3B-GGUF:UD-Q5_K_XL \ -c 131072 \ -n 32768 \ --no-context-shift \ --temp 0.6 \ --top-p 0.95 \ --top-k 20 \ --repeat-penalty 1.00 \ --presence-penalty 0.00 \ --chat-template-kwargs '{"preserve_thinking": true}' \ --batch-size 4096 \ --ubatch-size 4096 
 Parameter Breakdown
  
 Flag Value Why 
  
 -hf unsloth/...:UD-Q5_K_XL HuggingFace model repo with unsloth's custom UD quantization — good quality/size tradeoff (~29 GB) 
  -c 131072 128K context This model supports a massive context window — set it high for long documents or extended conversations 
  -n 32768 32K output tokens Allows long single-turn generations without hitting the generation limit 
  --no-context-shift Off Prevents context shifting during generation — keeps long responses coherent 
  --chat-template-kwargs preserve_thinking: true Keeps the model's reasoning/thinking blocks intact in the output 
  --batch-size 4096 4096 Logical batch size — higher = faster prompt processing, needs more memory 
  --ubatch-size 4096 4096 Physical batch size — kept equal to logical batch for consistency 
 
 Sampling Parameters
 The sampling parameters (--temp, --top-p, --top-k, --repeat-penalty, --presence
