---
title: I need a model that gets stuck in loops.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u5630v/i_need_a_model_that_gets_stuck_in_loops/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T00:03:43.000Z'
fetched_at: '2026-06-14T23:18:17.963Z'
---
I am testing out some loop identification, protection & recovery features in our agent, and I am looking for a model that gets stuck in loops frequently. The worst I've seen recently is GLM Flash at low temperature and extreme quantization. If there is a model that loops perhaps 75% of the time in all kinds of ways, and calls tools well 25% of the time that would be ideal to set up a testing framework
 The goal is to be able to heuristically determine what a loop looks like and assign a score to the output with the probability that the model is in a loop so that the agent can find ways to backtrack and reprompt until the loop gets broken.
 What model do you think would give the best sample data?
    submitted by    /u/TokenRingAI  
 [link]   [comments]
