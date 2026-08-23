---
title: Getting close to 100K context on 32GB VRAM with Qwen3.6-27 at Q8
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unpelb/getting_close_to_100k_context_on_32gb_vram_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T01:24:03.000Z'
fetched_at: '2026-07-05T23:01:37.128Z'
---
Not really a tutorial, but more of sharing my attempts at getting higher contexts on Q8 of Qwen3.6-27 with 32GB VRAM.
 Disclaimer: Not in-depth research. Crowd wisdom suggests that Qwen is more tolerant of model quantization, but my experience suggests otherwise. I have nothing quantitative to back this up, only my personal experience in using it for vibe coding a couple of personal projects (which aren't very big either, but have been working on them for a few weeks).
 Context: I am able to run Q8 at ~60K context easily and found that it works better than Q6 or Q5 (purely subjective experience). But I can easily get 128K context with Q5 with unquantized kv, so I wanted to see how much I could push with Q8.
 System: 5090 with 64GB system RAM. Remote server running headless Ubuntu.
 After a few trial and error approaches, I find the following are working. Some notes:
  
VRAM is right at the edge, and maybe in long coding contexts, you may need to drop context for a bit more space.
 The benchmark I'm using is just for token inference speed. Nothing more.
 Options -b and -ub help shave like a 100MB of VRAM.
  
Option 1: 95K context, KV: Q8_0 and Q8_0, VRAM when starting: 230MB, VRAM after bench: 90MB
 bash build/bin/llama-server \ -m ~/myp/models/bartowski_Qwen_Qwen3.6-27B-Q8_0.gguf \ --temp 0.6 \ --top_p 0.95 \ --top_k 20 \ --min_p 0.0 \ --repeat-penalty 1.0 \ --presence-penalty 0.0 \ -c 95000 \ -t 16 \ -ngl 99 \ --flash-attn on \ --host 0.0.0.0 --port 8080 \ --no-mmproj \ --spec-type draft-mtp \ --spec-draft-n-max 4 \ --parallel 1 \ -kvo \ -ctk q8_0 \ -ctv q8_0 \ -b 1024 \ -ub 256 
 ``` python3 mtp_bench.py code_python pred= 192 draft= 183 acc= 145 rate=0.792 tok/s=141.6 code_cpp pred= 192 draft= 214 acc= 137 rate=0.640 tok/s=121.9 explain_concept pred= 192 draft= 225 acc= 134 rate=0.596 tok/s=115.6 summarize pred= 192 draft= 176 acc= 146 rate=0.830 tok/s=146.0 qa_factual pred= 192 draft= 198 acc= 141 rate=0.712 tok/s=131.4 translation pred= 192 draft= 221 acc= 135 r
