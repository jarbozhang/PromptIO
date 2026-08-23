---
title: >-
  CachyLLama’s: llama.cpp fork with persistent KV cache that makes long
  local-agent sessions much less painful
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5k08a/cachyllamas_llamacpp_fork_with_persistent_kv/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-24T18:39:22.000Z'
fetched_at: '2026-07-25T11:01:40.186Z'
---
I’m not affiliated with this project, but I’ve been running it recently and I’m surprised it hasn’t received more attention here:
 https://github.com/fewtarius/CachyLLama
 CachyLLama is a fork of llama.cpp focused on a problem that matters a lot on slower hardware: repeated prompt processing. Not only does it have a new "SSD" based cache, but it also has some other improvements with caching, like a multi-tier KV cache.
 My local models generate at an acceptable speed once they get going. The painful part is using an agentic coding harness that sends a large system prompt, tool definitions, and most of the conversation back to the server on every request. A long session can spend far more time reprocessing familiar context than generating the answer.
 CachyLLama adds persistent SSD-backed KV checkpoints and a system-prompt cache. When the beginning of a request matches previously processed context, it can restore that state and evaluate only the changed tail rather than starting over. The checkpoints can also survive a server restart.
 On my older dual-MI50 setup, this has made repeated requests in long agent sessions substantially more responsive. I have not produced a controlled benchmark yet, so consider this an operator report rather than a scientific result, but the practical difference has been very noticeable.
 The project’s own 7840U/780M benchmark reports:
  
~1,243-token prompt: 9.3s cold, 0.41s warm
 ~5,409-token prompt: 43.3s cold, 0.57s warm
 ~15,700-token prompt: 143.1s cold, 0.99s warm
  
The important distinction is that this does not claim to make generation faster. It avoids repeating prompt-evaluation work that has already been done.
 It also contains handling for hybrid architectures such as Qwen 3.5/3.6, Gemma 4, and GLM-4.7, where restoring recurrent state is more complicated than restoring a conventional attention-only KV cache.
 Has anyone else here tried it? It's been really helpful for me but I haven't seen any mention of it anywhere else.
 
