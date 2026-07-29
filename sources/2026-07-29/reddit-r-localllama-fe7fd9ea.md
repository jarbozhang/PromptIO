---
title: >-
  SWE-rebench Multilingual Update (Go, Java, Python, Rust, TS). Evaluated:
  GLM-5.2, DeepSeek-V4 Pro, Qwen3.6-27B and others
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v93phk/swerebench_multilingual_update_go_java_python/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-28T16:37:50.000Z'
fetched_at: '2026-07-29T11:01:19.466Z'
---
Hi everyone!
 We’ve just released a major update to the leaderboard! We are expanding beyond Python with a new multilingual slice featuring real-world software engineering tasks across 5 languages. 
 Open-weight models:
  
 Model Pass@1 Pass@5 Pass all 5 
  
 GLM-5.2 [high] 62,9% (± 1.19%) 81,1% 39,6% 
  MiniMax M3 47,2% (± 1.13%) 69,4% 20,7% 
  MiMo V2.5 Pro 46,5% (± 0.54%) 65,8% 27,0% 
  DeepSeek-V4 Pro [high] 40,2% (± 1.29%) 64,0% 13,5% 
  Qwen3.6-27B 31,2% (± 1.68%) 57,7% 10,8% 
  Qwen3.6-35B-A3B 24,7% (± 0.79%) 43,2% 8,1% 
  Qwen3.5-35B-A3B 17,1% 36,9% 3,6% 
 
 I’ve also included a few smaller Qwen models (Qwen3.6-27B, Qwen3.6-35B-A3B, Qwen3.5-35B-A3B) as reference points for local development.
 We are planning another leaderboard update in roughly 3-4 weeks that will focus heavily on models suitable for local deployment.
 Right now, the shortlist for the next run includes: MiMo V2.5, North Mini Code, Laguna S2.1 and others
 Which local models would you most like to see evaluated? Ideally, I'm looking for models that you are actually using right now for local software development or coding agents. Drop your suggestions in the comments!
 Links & Resources:
  
Leaderboard: https://swe-rebench.com/
 Full analysis (Insights & Trajectories): https://x.com/ibragim_bad/status/2082113024874463503?s=20
 Discord: https://discord.gg/V8FqXQ4CgU
 Harbor dataset: https://hub.harborframework.com/datasets/swe-rebench/swe-rebench-leaderboard/latest (You can use this to run your own agents on the tasks!)
  
   submitted by    /u/Fabulous_Pollution10  
 [link]   [comments]
