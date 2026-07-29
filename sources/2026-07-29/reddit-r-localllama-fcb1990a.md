---
title: I got Kimi-k3 running.....
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1v9cwfz/i_got_kimik3_running/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-28T22:09:50.000Z'
fetched_at: '2026-07-29T11:01:19.466Z'
---
Results:
 prompt eval: 40 tokens / 97.5s → 0.41 tok/s eval: 400 tokens / 1769.9s → 0.23 tok/s total: 440 tokens / 1867s (31 min) 
 Prompt:
 "Write a C++ function that reverses a linked list in place. Explain the pointer manipulation." 
 How I ran it:
  
Using PR#26185 from llama.cpp GitHub
 Used the same PR for the conversion to GGUF.
  
Hardware:
  
9965WX PRO 512 GB DDR5 6400
 RTX 6000 PRO 96GB x2
 PCIE Gen 5 Raid NVME Raid card.
 2x 4TB 9100 Pros in Raid 0 (~29 GB/s)
  
Run info:
 # other params are default, mmap is on (default.) CUDA_VISIBLE_DEVICES=0,1 llama-server \ -m k3-00001-of-00033.gguf \ --n-cpu-moe 93 -ngl 99 -c 8192 -fa on --jinja 
 Next Step: Connect the workstation using 2x 25GbE to the 100GbE Fabric (4xSpark Cluster )using RPC server.
 Update:
 Hit what appears to be a bug. Asking the Unsloth folks (discord) if they encountered this bug.
 Reported bug in PR comment. 
    submitted by    /u/Aroochacha  
 [link]   [comments]
