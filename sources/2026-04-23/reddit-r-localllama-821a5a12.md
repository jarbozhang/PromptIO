---
title: >-
  Personal Eval follow-up: Gemma4 26B MoE (Q8) vs Qwen3.5 27B Dense vs Gemma4
  31B Dense Compared
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ssb61r/personal_eval_followup_gemma4_26b_moe_q8_vs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T04:30:41.000Z'
fetched_at: '2026-04-23T02:21:55.374Z'
---
This is a follow-up update to my previous post comparing Qwen 3.6 35B vs Gemma 4 26B. 
 I wanted to particularly follow-up with the following: 1. Gemma 4 26B could've suffered the quantization tax and perform drastically better with an 8-bit quant. So I wanted to put that to the test with UD's Q8_K_XL this time 2. A lot of people (including myself) were curious to see how the Qwen 3.5 27B dense would perform in these tests. 3. Speaking of dense models, I also wanted to include the Gemma 4 31B to see how it performs. 
 Sharing results consolidated with previous run for a complete comparison
  
1. Test Results
  
 Metric Qwen3.6-35B Q4 Gemma4-26B Q4 Gemma4-26B Q8 Qwen3.5-27B Q4 Gemma4-31B Q4 
  
 Baseline failures 37 37 37 37 37 
  Tests fixed 32 (86.5%) 28 (75.7%) 17 (45.9%) 37 (100%) 37 (100%) 
  Regressions 0 8 0 0 0 
  Net score 32 20 17 37 37 
  Still failing (of 37) 5 9 20 0 0 
  Post-run total failures 5 17 20 0 0 
  Guardrail violations 0 0 0 0 0 
 
  
2. Token Usage
  
 Metric Qwen3.6 Q4 Gemma4 26B Q4 Gemma4 26B Q8 Qwen3.5-27B Q4 Gemma4 31B Q4 
  
 Input tokens 634,965 1,005,964 703,732 553,137 1,115,666 
  Output tokens 39,476 89,750 68,055 42,183 62,465 
  Grand total (I+O) 674,441 1,095,714 771,787 595,320 1,178,131 
  Cache read tokens 4,241,502 3,530,520 3,044,400 7,518,047 3,335,808 
  Output/Input ratio 1:16 1:11 1:10 1:13 1:17 
  Tokens per fix ~21K ~39K ~45K ~16K ~32K 
  Tokens per net score point ~21K ~55K ~45K ~16K ~32K 
 
  
3. Tool Calls
  
 Tool Qwen3.6 Q4 Gemma4 26B Q4 Gemma4 26B Q8 Qwen3.5-27B Q4 Gemma4 31B Q4 
  
 read 46 39 25 91 (1 err) 37 
  bash 33 30 31 23 29 
  edit 14 13 12 (1 err) 31 21 
  grep 16 10 6 33 6 
  write 1 0 4 1 1 
  glob 1 1 3 1 2 
  todowrite 4 3 1 1 4 
  Total 115 96 82 181 100 
  Successful 115 (100%) 96 (100%) 81 (98.8%) 180 (99.4%) 100 (100%) 
  Failed 0 0 1 1 0 
 
  
 Derived Metric Qwen3.6 Q4 Gemma4 26B Q4 Gemma4 26B Q8 Qwen3.5-27B Q4 Gemma4 31B Q4 
  
 Unique files read 18 27 19 23 27 
  Unique files edited 7 13 9
