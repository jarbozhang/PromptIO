---
title: 'Gemma Avatar: Talk to Gemma 4-31B face to face'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1umee2i/gemma_avatar_talk_to_gemma_431b_face_to_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T13:23:37.000Z'
fetched_at: '2026-07-03T23:01:09.839Z'
---
This is a voice chat with Gemma 4 31B where you talk to a 3D avatar. It listens while you speak, answers with a voice and a face (the avatar is exposed to the LLM as function tools: set_mood, make_hand_gesture, make_facial_expression) and Gemma decides the expressions on its own.
 The stack is all open models: silero VAD, parakeet for STT, Gemma 4 31B (served by Cerebras, which is why replies come back fast), Qwen3-TTS. Raw PCM over a plain WebSocket.
 For lip-syncing and avatar it uses met4citizen's TalkingHead + HeadAudio (https://github.com/met4citizen/TalkingHead + https://github.com/met4citizen/HeadAudio)
    submitted by    /u/paf1138  
 [link]   [comments]
