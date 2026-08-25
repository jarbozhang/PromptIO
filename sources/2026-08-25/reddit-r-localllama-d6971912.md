---
title: 'Bart: A vintage llm'
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1vx7aci/bart_a_vintage_llm/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T16:14:44.000Z'
fetched_at: '2026-08-25T11:00:49.196Z'
---
after 3 months and $800 burned...
 Unbounded Labs is proud to introduce Bart, our vintage LLM: 2.82B parameters trained from scratch on 20.1B tokens of English written before 1931. You can talk to it right now!
 Demo: https://www.unboundedlab.com/chat/bartholomew
 Article: https://www.unboundedlab.com/blog/bartholomew
 Huggingface: https://huggingface.co/jbduran/bartholomew-sft
 Why even make a vintage llm? As proposed by Demis Hassabis, could LLMs reach the same conclusions that the great scientists of the past did? While General Relativity was out of budget, we believe that advancing this field targets the crux of AI research. Are these models capable of original ideas, or are they just spitting out the next token?
 The article is our full account, covering where the corpus came from and how we cleaned it, the benchmarks we had to build because none existed, every ablation, the training runs, the post-training, and the mistakes we made along the way.
 "What I cannot create, I do not understand" is a quote I love from Richard Feynman. Building Bart was our attempt to actually understand LLMs rather than read about them.
 What we are proudest of:
 - Best vintage base model at its scale on Vintage CORE, ahead of GPT-1900 on a smaller token budget
 - Cleaned one of the largest vintage datasets, Harvard's Institutional Books (242B->23B tokens)
 - Created Vintage CORE, the first suite of 20 benchmarks made for vintage llms
 - Ran 10 hours of autonomous research on one H100: 100 experiments, 26 improvements found
 - Released the largest vintage SFT dataset we know of: 416k graded question and answer pairs, grounded in pre-1930s text
 - Trained the final model in 5 days on an H100, holding 60% MFU the whole way
 - All datasets, methodology, training code, evals, and training runs are open sourced
 I am proud of my team. What we built will move the vintage LLM field forward, and it moved us forward as researchers and as people.
 We paid for all of it ourselves, about $807 
