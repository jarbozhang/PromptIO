---
title: Training an LLM from scratch on 1800's texts (160GB dataset)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uswlq8/training_an_llm_from_scratch_on_1800s_texts_160gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T18:51:37.000Z'
fetched_at: '2026-07-10T23:01:38.130Z'
---
Hi everyone, A year ago I began pre-training language models exclusively on 1800’s London data. Recently I have completed my largest dataset ever, containing 40B tokens or 160GB of 1800-1875 english data from England and the United States. I will soon train a 2B parameter model on it, but for now I’ve trained a 500M parameter evaluation model on a 5B token sample. I have also fine tuned the eval model on 1800’s Q&A pairs (using synthetic questions and answers pulled straight from the dataset), so you can ask it about historical figures, places, events, etc. It works better with London stuff for now and it’s not that accurate since it’s just an eval model but the results are promising for a larger run. 
 Some sample outputs: 
 https://preview.redd.it/ncw7d62g6gch1.png?width=1020&format=png&auto=webp&s=2fbdb24b8db90c1c36a7ba4a30238da46ed802f6
 The recipe generation for the plum pudding is insane, so hopefully the 2B model won’t tell you to stir with your feet.
 https://github.com/haykgrigo3/TimeCapsuleLLM
 https://huggingface.co/haykgrigorian/TimeCapsuleLLM-English-1800-1875-v3mini-eval1-500M
    submitted by    /u/Remarkable-Trick-177  
 [link]   [comments]
