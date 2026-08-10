---
title: 'Lophius: A workbench for language model research, from the creator of Heretic'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjt4vi/lophius_a_workbench_for_language_model_research/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T15:43:17.000Z'
fetched_at: '2026-08-10T11:01:36.118Z'
---
Hi folks, I hate slop as much as you do, so instead of starting with "The Problem", I'll just cut to the chase:
 I just published Lophius, which is the culmination of more than two years of fighting with Jupyter and Transformers. It's a hybrid code/GUI research system that runs inside a notebook. It can eliminate mountains of boilerplate and save you many hours of time.
 Lophius can be found at https://lophius.org (code at https://github.com/p-e-w/lophius).
 Lophius handles pretty much all common research tasks: Model inspection, architecture analysis, configuration manipulation, tokenizer inspection, prompt management, inference, logits, entropy, attention scores, hidden states, and chat. In many cases, it can be used without any configuration. It intelligently manages GPU memory during inference, and can lazy-load output signals that you might want to look at later.
 Lophius has very high quality documentation and a complete tutorial. If you ever wanted to try your hand at transformer research, this might just be what you were waiting for!
 In the future, Heretic might start using Lophius as a backend, but that's a story for another day.
 Cheers :)
    submitted by    /u/-p-e-w-  
 [link]   [comments]
