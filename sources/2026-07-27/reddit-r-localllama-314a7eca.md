---
title: 'My Ollama box picks the music now: an agentic DJ running on a 9B model'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v7mmgg/my_ollama_box_picks_the_music_now_an_agentic_dj/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-27T01:42:03.000Z'
fetched_at: '2026-07-27T11:01:27.647Z'
---
I got tired of my Ollama server sitting idle between chat experiments, so I pointed it at my Navidrome library and made it run a radio station.
 The DJ is an agent, not a shuffler. Each turn it gets tools (search the library, look at what played recently, check the schedule, read the weather) and picks the next track with a reason. Then it writes a short intro, TTS speaks it, and Liquidsoap ducks the music under the voice.
 What surprised me:
  
A 9B model with reasoning off and tool-calling on is enough. Qwen3.5 9B does the picking and the intro writing fine. Bigger models write better copy but they aren't required.
 Session memory matters more than model size. Without it the DJ repeats itself within an hour.
  
Fully local is real: Ollama plus Piper or Kokoro plus your own Navidrome, no API keys. One outbound call for weather (Open-Meteo). Hosted providers are optional and capped by a daily token budget.
 You need your own music library and a Docker host. And it's radio, so there's no skip button, which people either love or bounce off immediately.
 Here's what it sounds like: https://www.getsubwave.com/listen
 Code, MIT: https://github.com/perminder-klair/subwave
 Full disclosure, I built this.
    submitted by    /u/pinku1  
 [link]   [comments]
