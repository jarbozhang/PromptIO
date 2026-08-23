---
title: >-
  GPT-2 Small’s embedding geometry around “Trump”: discretized vs. continuous
  nearest neighbours [P]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1v07xai/gpt2_smalls_embedding_geometry_around_trump/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-07-18T21:29:05.000Z'
fetched_at: '2026-07-18T23:01:01.592Z'
---
This visualization looks at the token “Trump” in GPT-2 Small’s static embedding table, before attention or context is applied.
 The top plot is a t-SNE projection of 32,070 alphabetic tokens with at least two characters.
 The two graphs below compare Trump’s nearest neighbours under two representations of the same embedding:
 Discretized: each coordinate is thresholded before neighbours are calculated. This produces mostly generic political terms such as Mitt, Hillary, Pelosi, and Blair.
 Continuous: the original coordinates are retained. This produces a more specific group containing family members, staff, rivals, and presidents including Obama, Clinton, Bush, and Eisenhower.
 No prompting or text generation is involved; everything comes directly from GPT-2 Small’s learned token embeddings.
    submitted by    /u/Limp-Contest-7309  
 [link]   [comments]
