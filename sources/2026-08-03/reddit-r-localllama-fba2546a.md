---
title: 'DeepSeek-V4-Flash-0731: When Low is higher than High'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vdqsod/deepseekv4flash0731_when_low_is_higher_than_high/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T19:16:08.000Z'
fetched_at: '2026-08-03T11:01:09.275Z'
---
I decided to test a few questions against DeepSeek-V4-Flash-0731. Locally, I was running Unsloth's UD-Q2_K_XL quant. After I saw the surprising shape of the results, I tested against DeepSeek's official API to confirm that I didn't do anything wrong.
 For anyone using OpenRouter, be aware that there is a significant bug that is breaking reasoning effort modes. I ran into that while trying to validate my local results.
 DeepSeek-V4-Flash-0731 supports four different effort modes, consisting of no reasoning, low, high, and max. We can also see how those are communicated to the model.
 As I found out, Low is surprisingly verbose.
 Averaged across 20 requests per mode, here is how many tokens were used by each mode:
  
 Mode Local Q2 total / reasoning / final DeepSeek API total / reasoning / final 
  
 None 801.7 / 0 / 801.7 948.9 / 0 / 948.9 
  Low 1,227.5 / 874.4 / 353.2 1,349.2 / 889.6 / 459.7 
  High 605.8 / 410.5 / 195.4 481.5 / 253.9 / 227.7 
  Max 1,301.4 / 1,031.8 / 269.6 698.7 / 473.9 / 224.8 
 
 I really wish that DeepSeek and Artificial Analysis had posted benchmarks for all of the effort modes, instead of only max.
    submitted by    /u/coder543  
 [link]   [comments]
