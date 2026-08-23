---
title: '"Uncensored" LLMs are measurably more optimistic than their base models'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9vwev/uncensored_llms_are_measurably_more_optimistic/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T13:15:09.000Z'
fetched_at: '2026-07-30T11:01:46.422Z'
---
Hi. Many people think uncensored models are basically the same model that just doesn't refuse, but...
 I was recently checking whether uncensored models would give me better answers for stock market predictions (my idea was: the uncensored one will tell you the truth and won't be polite where it shouldn't be). And I noticed that abliteration didn't only remove the refusals, it also changed the model's attitude. 
 Generally, after removing censorship the models are more optimistic. More "it will go up" calls, fewer words like maybe/uncertain, longer and more confident reasoning.
 They were not actually any better at the task, same coinflip accuracy as before - as expected. So more confident, not more right.
 The thing I didn't expect: on Gemma the confidence went down, on Qwen it went up. Same edit, opposite direction.
 I tested it on Gemma and Qwen (ran it locally on my GB10/Dell - took a while), 21,600 decisions total, and the models decided on the exact same input data (Gemma with and without censorship, Qwen with and without). I preregistered it beforehand so I wasn't just fishing for a result.
 Setup was basically: the model gets a prompt + a payload with data about a listed company (quotes, news etc.) and has to say, among other things, where it thinks the stock goes in a week: up if things look good, down if bad.
 I tried to write the whole thing up properly here if anyone's curious, data and code are in there too: https://arxiv.org/abs/2607.17427
 Has anyone seen similar disposition drift with other families (Llama, Mistral) or other methods like Heretic? Mine were huihui's abliterated ones.
    submitted by    /u/oleczek  
 [link]   [comments]
