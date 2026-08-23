---
title: >-
  DeepSeek V4 Flash 0731 hits 82.7% on Terminal-Bench 2.1 in an independent
  public-harness run (445 trials)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjklwo/deepseek_v4_flash_0731_hits_827_on_terminalbench/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T08:39:12.000Z'
fetched_at: '2026-08-09T11:01:08.931Z'
---
Disclosure: I’m the author of Ante.
 DeepSeek recently reported an 82.7% score on Terminal-Bench 2.1 for DeepSeek V4 Flash 0731. Its evaluation used “DeepSeek Harness minimal mode,” which hasn’t been released yet.
 We wanted to see whether the reported result could be independently matched using a public, downloadable harness.
 With Ante 0.preview.71, we got:
  
368 successful trials out of 445
 82.7% accuracy (±1.79 SE)
 89 Terminal-Bench 2.1 tasks
 5 trials per task
 max reasoning effort
 no skills enabled
 deepseek/deepseek-v4-flash-0731 through OpenRouter
  
The complete Harbor job is public. It includes the pinned configuration and all 445 trial records, with rewards, exceptions, durations, and token usage.
 Deep seek v4 seems to be sensitive to harness and this is probably useful data for anyone who is interested 
 Sources:
  
DeepSeek’s reported result: https://api-docs.deepseek.com/updates/
 Public Harbor run and configuration: https://hub.harborframework.com/jobs/b2a14e4b-a422-45f2-832e-cf2eec5c8bff
 Ante benchmark page: https://antigma.ai/eval
  
   submitted by    /u/Exciting-Camera3226  
 [link]   [comments]
