---
title: >-
  Based on an accelerating frontier -> local trajectory, expect a ~30b param
  'Mythos at home' by as soon as Jan 2027 (rationalisation below)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vq279o/based_on_an_accelerating_frontier_local/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T16:55:55.000Z'
fetched_at: '2026-08-17T11:01:38.920Z'
---
Including the rationalisation for the data below - this is a more robust version of an earlier post I did similar to this - explaining below:
 How I chose the comparisons
 The basic question I’m trying to answer is: when did an open model small enough to run on high-end consumer hardware reach roughly the capability of an earlier frontier model?
 There obviously isn’t a single benchmark that establishes equivalence, so these are judgment calls based on a mixture of direct benchmarks, human-preference evaluations, coding/agent evals and model size. I’m mostly interested in broad text, reasoning and coding capability rather than exact product parity - particularly where the original frontier model had capabilities like native audio or a more mature tool ecosystem.
  
 Comparison My rationale Confidence 
  
 GPT-3 → LLaMA-33B This is probably conservative. The original LLaMA paper found that even LLaMA-13B beat GPT-3 175B on most benchmarks, so by 33B the GPT-3 threshold had pretty clearly been crossed. High 
  GPT-3.5 → Yi-34B-Chat Yi-34B-Chat was extremely competitive with the leading proprietary chat models by late 2023. On Arena-Hard it was basically level with GPT-3.5, while on AlpacaEval it performed much better. I think GPT-3.5-class is a reasonable description, even if “clearly superior” would be too strong. Medium-high 
  GPT-4 → Qwen2.5-32B This is one of the cleaner comparisons. Qwen2.5-32B scored 74.5 on Arena-Hard, versus 37.9 for GPT-4-0613 and 78.0 for GPT-4-0125-preview. So it looks comfortably beyond original GPT-4 and close to GPT-4 Turbo, while still being a ~32B model. Medium-high 
  GPT-4o / Claude 3.5 → Qwen3-32B This is more subjective, but Qwen3-32B looks broadly in this class across reasoning, coding and human-preference evaluations. I’m not claiming full GPT-4o equivalence: GPT-4o was natively multimodal. This is really a comparison of general text/reasoning/coding intelligence. Medium 
  Claude 4 / GPT-5 → Qwen3.6-27B Qwen3.6 is remarkably st
