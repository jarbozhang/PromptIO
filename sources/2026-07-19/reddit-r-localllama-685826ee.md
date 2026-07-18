---
title: '[Model] catmind-1.2b'
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1uzxov4/model_catmind12b/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-18T14:41:28.000Z'
fetched_at: '2026-07-18T23:01:00.742Z'
---
Everyone loves cats, even LLMs.
 If you are like me and can't resist the urge of petting a cat that approaches you, you will LOVE catmind. catmind-1.2b is a cat-thinking model: instead of thinking about your query, it uses it's thinking block to tell you a story about cats. Yes, one completely unrelated to your query.
 This model is a fine-tune of LFM2.5-1.2B-thinking. So, does it perform better than the original thinking model? No! Does it perform better than the original instruct-only model then? Nope!
  
 model accuracy mean output tokens 
  
 LFM2.5-1.2B-Thinking (base, real reasoning) 75.6% 4,243 
  LFM2.5-1.2B-Instruct (no reasoning tuning) 49.2% 1,843 
  catmind-1.2b (this model, cat reasoning) 24.3% 1,194 
 
 (Tested on marcodsn/crucible)
 Alright, this is a meme model, kinda: I wanted to check if the model would start reasoning on the problem (in its hidden states) while outputting tokens that are completely unrelated to the given problem. The answer is, again, no; I tried both letting the model generate the story and giving it a pre-filled story, but the accuracy was the same. I still wanted to publish this as I think it is kind of amusing, so here it, just don't use it for any serious work please!
    submitted by    /u/marcodsn  
 [link]   [comments]
