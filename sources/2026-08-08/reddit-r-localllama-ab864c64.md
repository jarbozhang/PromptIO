---
title: Is anyone else finding DeepSeek-V4-Flash unreliable for non-coding tasks?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vikgrj/is_anyone_else_finding_deepseekv4flash_unreliable/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T02:53:36.000Z'
fetched_at: '2026-08-08T11:01:01.044Z'
---
(I am not a native speaker, written by myself, so please bear with me)
 I really want to like DeepSeek-V4-Flash-0731. But it has serious flaws that don't align with the high score on intelligence benchmarks. And those flaws render it useless unfortunetely for anything else except, maybe, coding. It fails in subtleties that seem small but are crucial, and fails in more obvious tasks that should be easy to solve. Those errors make it unreliable enough for me to not even trust it the simplest tasks in office work like summarizing text or writing letters.
 Maybe I am doing something wrong here. Some of the issues below don't seem to be normal for an LLM of that size.
 To be clear: I want this model to work. It's faster than Gemma-4-31B and its total parameter count is 8 times higher. It is good at thinking things through, excellent at doing research if given web search access. But for language it not only fails on "beautiful wording" but on extracting the relevant concept from a context. Those areas seem not to be tested in benchmarks, but they are essential when doing office work.
 They are easier to explain with examples. Below I'll show you three.
 Ability 1: Including the revelant yet being concise
 Given a text to create meeting notes from.
 DeepSeek-V4-Flash-0731:
  
Spreading irregular income over the year to make sure the essentials are available every month.
  
Gemma-4-31B:
  
Concept: The financial investments are designed to cover only part of the needs. The remaining gap will be filled by averaging the irregular income from self-employment throughout the year.
  
DeepSeek-V4-Flash-0731's version is missing that there are two income sources. So while it points out the essence (the issue), that doesn't become clear enough because it is only part of the story.
 Gemma somehow has an ability to understand the essence and put it into sentences that are concise yet precise in beautiful wording. Look at "by averaging the irregular income", that is a very elegant way
