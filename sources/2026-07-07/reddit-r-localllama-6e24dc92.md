---
title: >-
  As promised, here is the GitHub link for my 100% local voice-to-voice
  assistant
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uom9zb/as_promised_here_is_the_github_link_for_my_100/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T03:44:55.000Z'
fetched_at: '2026-07-06T23:01:08.256Z'
---
I've posted up earlier versions of this project before, promising a GitHub link, but never got around to pushing the code from my local system. Sorry all, I have a very busy life :P
 Anyway, without further ado:
 GitHub: https://github.com/igorbarshteyn/athena
 Athena is a fully offline, privacy-first voice assistant that runs entirely on local hardware. Athena combines a large mixture-of-experts language model (Qwen3.5-397B), neural text-to-speech (Orpheus 3B), real-time speech recognition (Whisper-small.en), and a SNAC neural audio codec into a four-process pipeline — all in C++ with zero Python at runtime (one optional Python script exists for a one-time, offline emotion2vec+ model conversion at setup).
 Athena speaks with natural emotion (laughs, sighs, gasps), reads the basic affect in your voice and responds to it, remembers across sessions (with evolving long-term memory and personality that persist between conversations), maintains long conversational context, is interruptible mid-sentence (speak over her and she stops, keeping what she already said in context), and runs on a single consumer GPU + system RAM. No cloud, no telemetry, no API keys.
 Right now the system is tuned to act as a friend and to be very connection-seeking. These parameters can be tuned to one's liking via system prompts embedded in the code.
 Here is a two-session demo video demonstrating these capabilities:
 https://youtu.be/8HuRUpJ4_as?t=237 - Session 1 - planting memories
 https://youtu.be/8HuRUpJ4_as?t=2137 - Session 2 - testing recall
    submitted by    /u/Responsible_Fig_1271  
 [link]   [comments]
