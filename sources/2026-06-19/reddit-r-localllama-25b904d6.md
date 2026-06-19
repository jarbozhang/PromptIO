---
title: >-
  Cutting LLM Token Costs with rtk, headroom, and caveman - savings measured on
  real workloads
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9anzk/cutting_llm_token_costs_with_rtk_headroom_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-18T16:16:12.000Z'
fetched_at: '2026-06-19T14:35:21.919Z'
---
rtk, headroom, and caveman keep showing up whenever someone posts about cutting their token bill 60-90%. I wanted to know what they save on an actual bill instead of a benchmark, so I replayed all three over my own Claude Code history.
 My corpus was 500 of my own Claude Code sessions, 614M tokens and $926 of baseline spend, and I recomputed the cost turn by turn. headroom I ran directly since its compressor is a pure function of the payload. rtk and caveman I estimated from their own published rates and gave them the most generous numbers I could.
 Here's what they saved over real traffic.
  
headroom: 2.8% of spend ($25.61)
 rtk: 0.5% ($4.94)
 caveman: 0.4% ($3.58)
 combined: 3.7% ($34.12)
  
The advertised numbers aren't wrong. On the exact payload each tool was built for, I got the same results. headroom cut grep and diff dumps a median of 54%, rtk cut recognized shell output 33-99%, caveman halved prose. All real, all reproducible, in isolation.
 So why does the real bill barely move? Three reasons stacked on top of each other.
 First is the denominator. The advertised % divides savings by one payload. Your bill spreads the same savings across hundreds of turns.
 Second is the workload. The high-compression tricks only fire on redundant, structured dumps like grep results and JSON arrays. On my real traffic headroom activated on 45% of payloads and cut a median of 25%, because most of it was plain text and source code.
 Third is pricing, and this is the big one. Prompt caching re-sends your context at the cheap cache_read rate every turn. My bill was 42% cache_create and 29% output, and none of these tools touch those streams. They compress the cheapest token in the bill.
 There's also a coverage gap I didn't expect. rtk only reached 22% of my tool-output tokens. The other 78% went through Read, Grep, and Glob, which never hit its shell hook.
 We also need to weigh the security risk and decide whether the saving is worth a potential future compromise. Each tool
