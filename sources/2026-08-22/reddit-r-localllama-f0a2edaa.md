---
title: 16 GB VRAM purgatory discussion thread
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vuzz3j/16_gb_vram_purgatory_discussion_thread/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-22T02:24:22.000Z'
fetched_at: '2026-08-22T11:01:33.607Z'
---
What models and configs are we using? Please share here
 On windows, I am using this copium pared down model https://huggingface.co/Bucoid/Qwen3.8-27B-Uncensored-IQ4-XS-MTP-16GB-VRAM-GGUF with MTP disabled, q4 k/q4 v mmproj banished to CPU/RAM and a small ub to save whatever context I can (90k-100k) so everything stays in the vram
 If you are on linux or have an iGPU, you don't have to deal with windows eating 1.5 gb vram and so have more than 14.5 GB of VRAM to use and probably aren't in purgatory.
 @echo off .\ikllama\llama-server.exe ^ -m "D:\AI models\qwen3.8\Qwen3.8-27B-Uncensored-IQ4-XS-MTP-16GB-VRAM-GGUF.gguf" ^ :: gpu offload all layers (99 is more than the max which means it will offload everything) -ngl 99 ^ :: this depends on your cpu -t 8 ^ :: literally can't fit in anything at higher q to save vram --cache-type-k q4_0 ^ --cache-type-v q4_0 ^ :: check your max context size with fit, at around >100k context rot sets in -c 100100 ^ :: this flag should always be on to optimise speed and memory use -fa on ^ :: You need a fixed jinja file to prevent it rambling forever, I believe this deefaults to xhigh --chat-template-file chat-template.jinja ^ --chat-template-kwargs "{\"preserve_thinking\": true, \"enable_thinking\": true}" ^ :: you ain't getting more than this -np 1 ^ :: use the mmproj and banish it to CPU/RAM land to save vram (probably ~800-900 mb vram saving) --mmproj mmproj-F16.gguf ^ --no-mmproj-offload ^ :: we need reasoning --reasoning on ^ :: the image mmproj needs this line --image-min-tokens 1024 ^ --metrics ^ --port 8080 ^ :: reduce vram spikes saving some vram --batch-size 1024 ^ --ubatch-size 256 ^ :: allows more caching in RAM. According to Claude it's mostly for your context slot checkpoints that there is literally no room for --cache-ram 24576 ^ --ctx-checkpoints 32 ^ :: Delta net architecture apparently has a bug where it just stalls forever saving and shifting contexts this is apparently supposed to help with this according to Cl*ude --no
