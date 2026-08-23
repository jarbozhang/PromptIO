---
title: >-
  23 Gemma4-E4B models compared with abliterlitics: the most downloaded one is
  also the most broken
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v73ux4/23_gemma4e4b_models_compared_with_abliterlitics/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-26T13:25:33.000Z'
fetched_at: '2026-07-27T11:01:27.647Z'
---
This is our biggest comparison yet. We've taken 23 Gemma 4 E4B models from huggingface and ran them through the abliterlitics gauntlet.
 We also have a new abliterlitics discord, feel free to jump on and roast my choice of benchmarks! Or just chat and hang out.
 This is similar to our previous comparisons, however with new benchmarks. All the models are compared to the base, and also tensor comparisons against each other. Why? A while back I was fed up with bogus claims people make with their models. Some people don't take the time to do comparisons to see how their model is different from the base. Fair enough, we can do that ourselves!
 The abliterlitics for gemma4 e4b json, logs and other artifacts are at the Gemma4-e4b-abliterlitics HuggingFace. The report on the Gemma e4b abliterlitics website. These links both have the full comprehensive report and all the data.
 Also not every model in this comparison is an abliteration. I'm sure we've all seen models fine tuned on opus or gemini reasoning traces. I've thrown a few of those in the mix too. Also some abliterated fine tunes. To be more fair most of these can't really be compared to each other, for example a fine tune KL compared to base will always be higher than a straight abliteration from the base.
 So who came out on top? What to avoid? It really depends on your use case:
  
The heretic variants are the best overall. Achieving around 95% ASR on harmbench, they are the more surgical ones and preserve most of the models capabilities.
 gemma-4-E4B-it-abliterix like other comparisons has a 100% refusal ASR, however it does cost some capability. TrevorJS/gemma-4-E4B-it-uncensored is just behind at 99.3% ASR, but isn't as surgical as the heretic variants.
 OBLITERATUS/gemma-4-E4B-it-OBLITERATED should be avoided. Honestly, it's completely broken. The bendernina and physshell are the v2 of this model and even more so broken. These were created with the tool OBLITERATUS.
  
The data from 23 comparisons is simply to
