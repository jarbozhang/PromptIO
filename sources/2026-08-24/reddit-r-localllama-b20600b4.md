---
title: 'New qwen3.8:27b on a 39k line C to single-file HTML / three.js port'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vwde84/new_qwen3827b_on_a_39k_line_c_to_singlefile_html/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T17:32:32.000Z'
fetched_at: '2026-08-24T11:01:49.467Z'
---
I was just curious how the new qwen3.8:27b does on a hard C to HTML porting job against Opus 5 in a default Claude Code.
 The job: my fun side project is a procedural shooter in a single C file. Port it to a single-file html / three.js with one bot. One prompt, no follow-ups, no help from me. game.c is 2.1 MB, roughly 600k tokens of C, so it doesn't fit in the window and the agent has to walk the file and work out what matters.
 Setup: qwen3.8:27b in FP8 on vLLM, FP8 KV cache, full 262144 context, RTX 6000 Pro 96GB. Nothing truncated on my side, and the file is still more than twice the window.
  
 agent model wall clock lines out result 
  
 claude code Opus 5 (cloud reference) 21 min 1759 okay 
  hermes qwen3.8:27b 4h 18m 949 bad 
  codehamr qwen3.8:27b 1h 40m 1056 bad 
 
 Video has the C original first, then the three ports in table order. Only the Opus port is something in "okay" quality.
 What I actually wanted to know is whether the HTML comes out playable at all. One run each and a one-shot prompt for 39k lines of C, so this isn't representative of anything, and I knew it was brutal for a local LLM.
 My take: local models still live or die on the prompt. Same weights under two very different harnesses gave me the same broken port. hermes carries a lot more machinery, and a single turn with a thin prompt gives it nothing to use it on, so it spent four hours reaching the same place. A verbose harness doesn't rescue a thin prompt, it just burns GPU time.
 No deep take here, unfortunately. The thing I keep staring at is the wall clock: hours of GPU on decent local hardware against 21 minutes for the cloud run. If anyone knows where those hours actually go, I'm listening.
 The C original: https://github.com/codehamr/skill-issue
 My experimental local-first, no plugins codehamr harness: https://github.com/codehamr/codehamr
 All free.
    submitted by    /u/codehamr  
 [link]   [comments]
