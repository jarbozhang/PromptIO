---
title: >-
  Codebase getting larger - Qwen3.6-27B starting to compound issues - how to
  work smartly with this model?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u56yr7/codebase_getting_larger_qwen3627b_starting_to/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T00:46:54.000Z'
fetched_at: '2026-06-14T23:18:17.962Z'
---
I had initially hand coded a small chat bot to interact with llama server with tool usage. But then started vibe coding with Qwen3.6-27B and was blown away. Obviously I added a ton of features since then and the codebase has blown up in size.
 But I'm now noticing that there are a lot of tiny tiny bugs in the code that I'm having to review manually and fix. Things which should have been obvious (to a junior dev I feel). Thank goodness I'm doing this in Python which I have many years of professional experience.
 But this lead me to thinking that maybe I'm not using it correctly. Maybe there is a better way to use this model. My approach so far has been:
  
Start pi
 Prompt - "Read the current project". This takes up about 50% of the current available context (out of 128K)
 Implement this feature or Fix this bug.
 Context hits 80% or above, run /compact.
  
But after seeing all these bugs, I'm tracing through the code trying to patch one by one. I use a new conversation for every change, and instead of reading the entire workspace, I ask it to focus on exact functions or even lines ex: lines 670-650. And then ask it to read and confirm specific bugs and fix them exactly how I want them.
 I have also removed all kv quantization in hopes of mitigating the bugs. This is the command I'm using now (My specs are 5090 w 64GB RAM)
 /home/lenny/myp/llama.cpp/build/bin/llama-server \ -m ~/myp/models/unsloth_mtp_Qwen3.6-27B-UD-Q5_K_XL.gguf \ --temp 1.0 --top_p 0.95 --top_k 64 \ -c 131072 -t 16 -ngl 99 --flash-attn on \ --host 0.0.0.0 --port 8080 \ --spec-type draft-mtp --spec-draft-n-max 4 --parallel 1 
 Obviously this is now taking a lot more time to build and debug features. 
 My question is - are there other approaches I can take to minimize bugs when using this model?
 PS: Example bug:
 There's a feature to schedule a task at a specific time or recurrence. This takes execution_time as a param. The bug I found goes like this:
 try: parse time in UTC. except: logging.error("fa
