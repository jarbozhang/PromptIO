---
title: Locally run assistant on a w-10 board on a local Xiaozhi server
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1us9yjo/locally_run_assistant_on_a_w10_board_on_a_local/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T01:48:27.000Z'
fetched_at: '2026-07-10T23:01:38.135Z'
---
Hello, Locallama! 
 "long-time" member here, from the days when the max context window doubled from 2K to a whooping 4K! Now I feel like I am living in a dream world, doing things I could not have imagined back then.
 This is Belochka, or Bella, running on a Mac and projected to an ESP 32 w-10 board, the "Rune Board" because runes :-). In the background is Qwen 3.6 35B 3AB q4_k_m gguf on LM Studio. She kinda mentioned her capabilities, but pretty much she is like a personal assistant on a Mac. She also has a telegram bridge, and can send me things from my machine; files; generated music; etc. I mean at this point, whatever you ever wanted your personal assistant do for you, she can do it.
 She listens all the time; ignores when she feels like she cannot contribute to the discussion; or, jumps in, etc.
 I want to thank all the people who made this hobby so much fun: llama.cpp, LM Studio, Xiaozhi, Hermes-agent, mi agent, Anthropic Fable and other models, Qwen AI Lab, Aliexpress - I am not paid nor associated with any of them.
 The flow is the following, everything modded:
 Mi (https://github.com/av/mi) -> telegram bridge (from Hermes agent) -> Xiaozhi server (open source running locally) -> Tailscale Tunnel with Token -> cell phone hotspot -> Telegram/w-10 esp 32 Board / esp32 Xiaozhi or Deepskeek toys / esp32 Cameras / ESP32 anything you can imagine
 I always wanted to have an assistant that I could take with me anywhere, running locally, with access to all my stuff, smart enough to pretty much be like a human assistant. I think this moment is here or almost here, thanks to the local AI community and the recent batch of Qwen models.
 The current implementation needs cell phone connection but... the W10 board has LoRa = text only but no cell needed, and that's my next planned thing that I am currently tinkering with.
 Why am I posting this? I am not self-promoting anything and I am not planning to open-source the code - the cleanup effort will be just too much; plus t
