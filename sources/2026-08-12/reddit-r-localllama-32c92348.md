---
title: >-
  Revision Prompting: Trades slow (decoded) output tokens for cheap (prefilled)
  input tokens.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vlfxr3/revision_prompting_trades_slow_decoded_output/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T12:22:48.000Z'
fetched_at: '2026-08-12T11:01:19.739Z'
---
TL;DR: If you re-run the same prompt whenever the input changes, try sending the old input/output plus a diff of the input, and ask the model for a patch to the output. You generate ~2-10x fewer output tokens, and the untouched parts of the output stay byte-identical. This works, since in LLMs, tg is the bottleneck and prefill is comparatively free. Write-up: https://revisionprompting.info
 So at work, we have a few prompts that run as part of automated pipelines, same instruction every time. Translating documentation, pulling structured data out of invoices, that kind of thing. When the input changes, the first, naive strategy is to re-run the prompt on the new input.
 We did that for some time and it has two problems. The model rewrites parts of the output that the input change didn't touch, because LLMs are non-deterministic. So a typo fix in one paragraph produces a whole new translation with slightly different wording everywhere. And you sit through full generation every time, for what's usually a small change.
 So we are now using what we call "Revision Prompting": We keep the original input and output around, and when the input changes, we prompt with
 Instruction]: [Input] produces [Output]. Now, the input got updated as follows: [diff of old input vs new input] Please produce a patch to update the output. 
 then apply the patch to the old output. Unix diff format works fine for text, JSON Patch for JSON.
 In our pipelines this cut processing time by ~80% and cost by ~65% (these numbers depend a lot on your task — savings scale with how small the input changes are). The revision prompt has \more** input tokens (old input + old output + diff) but a *much\* shorter generation --> so we're trading decode for prefill, and "as a side-effect"
 also get the improved consistency :).
 Caveats: if a large part of the input changed, just re-run normally. And you need to be storing the old input/output pairs.
 Hope this is useful!
 (FYI: There's also a write-up with mor
