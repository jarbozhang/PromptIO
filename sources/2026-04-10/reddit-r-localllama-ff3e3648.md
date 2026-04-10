---
title: Gemma 4 is terrible with system prompts and tools
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sh1bwv/gemma_4_is_terrible_with_system_prompts_and_tools/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T20:28:25.000Z'
fetched_at: '2026-04-10T00:43:27.397Z'
---
I tried Gemma 4 (26b-a4b) and I was a bit blown away at how much better it is than other models. However, I soon found three things:
  
it gets significantly worse as context fills up, moreso than other models
 it completely disregards the system prompt, no matter what I put in there
 it (almost) never does tool calls, even when I explicitly ask it
  
 Note: Other open models also have the same flaws, but they feel much more accentuated with Gemma. It feels like it was made to be great at answering general questions (for benchmarks), but terrible at agentic flows - following instructions and calling tools.
  
I tried countless system prompts and messages, including snippets like (just some of these, all of them in the same prompt, etc.)
 <task> You must perform multiple tool calls, parallelizing as much as possible and present their results, as they include accurate, factual, verified information. You must follow a ZERO-ASSUMPTION protocol. DON'T USE anything that you didn't get from a TOOL or DIRECTLY FROM THE USER. If you don't have information, use TOOLS to get it, or ASK the user. DON'T ANSWER WITHOUT IT. Use the tools and your reasoning to think and answer the user's question or to solve the task at hand. DO NOT use your reasoning/internal data for ANY knowledge or information - that's what tools are for. </task> <tools> You have tools at your disposal - they're your greatest asset. ALWAYS USE TOOLS to gather information. NEVER TRUST your internal/existing knowledge, as it's outdated. RULE: ALWAYS PERFORM TOOL calls. Don't worry about doing "too many" calls. RULE: Perform tool calls in PARALLEL. Think that you need, what actions you want to perform, then try to group as many as possible. </tools> <reasoning> **CRUCIAL:** BEFORE ENDING YOUR REASONING AND ATTEMPTING TO ANSWER, YOU MUST WRITE: > CHECK: SYSTEM RULES THEN, YOU MUST compare your reasoning with the above system rules. ADJUST AS NEEDED. Most likely, you MUST: - perform (additional) tool calls, AND - re
