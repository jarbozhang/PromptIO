---
title: Agents-A1-Q8_0-GGUF works pretty well for me (anecdotal feedback)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unxrjw/agentsa1q8_0gguf_works_pretty_well_for_me/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T09:26:34.000Z'
fetched_at: '2026-07-05T23:01:37.130Z'
---
For the last day or so I've been using Agents A1 Q8 InternScience/Agents-A1-Q8_0-GGUF on my M1 Max mac (64GB) just like this:
 llama-server -hf InternScience/Agents-A1-Q8_0-GGUF --host 0.0.0.0 --port 8080 --temp 0.85 --top-p 0.95 --top-k 20 --min-p 0.0 --presence-penalty 1.1 --repeat-penalty 1.0
 (these are the parameters they recommend)
 With full 262K context available I am getting about 500 t/s pp and about 40 t/s tg. I've been using opencode with it and it seems to be roughly Qwen level - but it's early days.
 I assume there are other parameters I can tweak, I just haven't looked yet.
 Anyone else playing with it?
    submitted by    /u/FastHotEmu  
 [link]   [comments]
