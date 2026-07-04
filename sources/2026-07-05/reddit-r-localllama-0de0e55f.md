---
title: >-
  Ran a classic(medival europe) fantasy RP/agentic benchmark across 8 local
  models Qwen3.6-27B held up better than its size suggests
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unbm45/ran_a_classicmedival_europe_fantasy_rpagentic/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T15:15:49.000Z'
fetched_at: '2026-07-04T23:01:32.105Z'
---
Threw together a benchmark suite (quest completion, scene endings, item/time tracking, character detection, storytelling, drafting) and ran it across 8 models people talk about a lot on here. Judged with an external LLM grader, N varies per category (shown on the chart).
 Overall pass rates: gemma-4-31B on top at 87%, Qwen3.6-27B close behind at 82%, then a pretty steep drop off after gemma-4-12B (80%) down to the smaller/looser models in the 55-70% range. but oh well that expected. 
 The interesting part to me wasn't the top line, it's how uneven the sub-scores are some models that look fine on "completing quests" fall apart on "NPC thoughts" or "summarizing quests," which never shows up if you only look at overall %. Curious if others have seen the same category level cliffs on their own evals.
    submitted by    /u/UsedMorning9886  
 [link]   [comments]
