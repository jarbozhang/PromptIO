---
title: NPC Engine Using Local Models
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uibt9o/npc_engine_using_local_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T23:13:52.000Z'
fetched_at: '2026-06-29T23:01:34.476Z'
---
I’ve been working on a game-agnostic NPC engine/backend based pretty heavily on SillyTavern-style architecture, and with smaller local models getting better and better, I honestly think this kind of thing could be the future of RPGs.
 Right now I’m using NVIDIA Parakeet 0.6 for STT, Gemma 4 26B A4B for the LLM, and Qwen3-TTS for voice, and I’m getting super fast response times with pretty decent quality.
 The main thing that makes it work well is using RAG to keep prompts lean. For example, I have hundreds of possible actions NPCs can do in-game, but only the ones that actually make sense based on the player’s message / context get injected as available actions. So the model isn’t being overloaded with a giant list every turn.
    submitted by    /u/goodive123  
 [link]   [comments]
