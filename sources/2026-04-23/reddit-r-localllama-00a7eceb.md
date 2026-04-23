---
title: Qwen3.6-27B Uncensored Aggressive is out with K_P quants!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sstq1w/qwen3627b_uncensored_aggressive_is_out_with_k_p/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T18:20:22.000Z'
fetched_at: '2026-04-23T02:21:55.375Z'
---
Thank you members for the heads-up - this current release doesn't live up to my standards and I was able to reproduce a breaking bug which takes it back to the drawing board. If this is on my end and not on llama.cpp - Expect a proper re-upload of the GGUF files hopefully tomorrow (middle of the night currently) - I decided against deleting and reopening the post, keeping things transparent :)
 The dense sibling of the 35B-A3B drop is here, Qwen3.6 27B Uncensored Aggressive is out!
 Aggressive = no refusals; NO personality changes/alterations or any of that, it is the ORIGINAL release of Qwen just completely uncensored
 https://huggingface.co/HauhauCS/Qwen3.6-27B-Uncensored-HauhauCS-Aggressive
 0/465 refusals*. Fully unlocked with zero capability loss.
 From my own testing: 0 issues. No looping, no degradation, everything works as expected.
 One thing I noticed vs the 35B-A3B: this model is a bit more sensitive to prompt clarity. Vague/under-specified prompts can drift so do your best to spell out format, constraints, scope and it stays on rails. FYI so you get the most out of it. To me it seems like it's a 'coding/stem-first' model from the way it handles social interactions.
 To disable "thinking" you need to edit the jinja template or use the kwarg {"enable_thinking": false}. Heads up — Qwen3.6 doesn't support the /think and /no_think soft switches that Qwen3 had, so the kwarg is the way.
 What's included:
 - Q8_K_P, Q6_K_P, Q5_K_P, Q4_K_P, IQ4_XS, Q3_K_P, IQ3_M, IQ3_XS, Q2_K_P, IQ2_M
 - mmproj for vision support
 - All quants generated with imatrix
 K_P Quants recap (for anyone who missed the MoE releases): custom quants that use model-specific analysis to preserve quality where it matters most. Each model gets its own optimized profile. Effectively 1-2 quant levels of quality uplift at ~5-15% larger file size. Fully compatible with llama.cpp, LM Studio, anything that reads GGUF (Be forewarned, Ollama can be more difficult to get going).
 Quick specs:
 - 27B den
