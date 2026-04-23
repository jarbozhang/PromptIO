---
title: >-
  Qwen3 TTS is seriously underrated - I got it running locally in real-time and
  it's one of the most expressive open TTS models I've tried
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ssugid/qwen3_tts_is_seriously_underrated_i_got_it/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T18:46:34.000Z'
fetched_at: '2026-04-23T02:21:55.374Z'
---
Heya guys and gals, 
 Around a year ago I released and posted about Persona Engine as a fun side project, trying to get the whole ASR -> LLM -> TTS pipeline going fully locally while having a realtime avatar that is lip-synced (think VTuber). I was able to achieve this and was super happy with the result, but the TTS for me was definitely lacking, since I was using Sesame at the time as reference. After that I took a long break.
 A week or two ago, I thought to give the project a refresh, and also wanted to see how far we have come with local models, and boy was I pleasantly surprised with Qwen3 TTS. During my initial tests it was lacking, especially the version published by the Qwen team themselves, but after digging around and experimenting a lot I was able to:
  
Make streaming with the model work reliably. The architecture of the model is perfect for this, since the decoder uses a sliding window, which means if you stream the LLM response, that's completely fine and the TTS will keep coherent prosody, pitch, and intonation.
 Get the model working with llama.cpp, because I am using C# and speed is important, so also quantized it.
 The model was lacking word-level timings and phonemes which Kokoro (the previous, more robotic sounding TTS) had. So I had to implement CTC word-level alignment to be able to know when certain words are spoken (important for subtitles + getting phonemes to have the lips move correctly).
  
Once this was all done, I also decided to finetune my own Qwen3-TTS voice. The cloning capabilities are really cool, but very lacking in contextual understanding and struggles with pronouncing. Additionally, the custom trained voices provided by the Qwen team didn't have any female native speakers, and I didn't want to create a new Live2D model. 
 In the end, the finetune blew me away and will probably continue improving it.
 GitHub is here: https://github.com/fagenorn/handcrafted-persona-engine
 Check it out, have fun, and let me know whatever crazy 
