---
title: >-
  I got tired of my 300GB model loads taking 5min on RPC. PR 26291 speeds it
  300% to 1min30sec (4060ti+ddr4) + (4060ti+ddr5)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vilcil/i_got_tired_of_my_300gb_model_loads_taking_5min/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T03:37:37.000Z'
fetched_at: '2026-08-08T11:01:01.045Z'
---
- On b10173 - "state":"loading" 4min54sec.
 - With this PR and GGML_RPC_LOAD_THREADS 12 - "state":"loading" 1min38sec
 The PR is close to ready, will need a docs change if they want to keep the new GGML_RPC_LOAD_THREADS variable.. and hopefully they take it with the client-side being solved and someone else cant take on the remaining server effort. Getting sub minute model loads at this size would be amazing, and its not that far. 
 It was mildly amusing that I developed this on a potato hardware; and the guy testing it is probably paying per hour what my whole setup costs. 
 But in the Sovereign AI Wars, I code for the little guy running on 2-3 gaming PCs
    submitted by    /u/Chuyito  
 [link]   [comments]
