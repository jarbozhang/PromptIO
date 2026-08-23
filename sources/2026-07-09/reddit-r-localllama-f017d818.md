---
title: 'I need an adult: J-Space-Aware Pruning/Merging/Distillation'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uqd8i7/i_need_an_adult_jspaceaware/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T00:29:49.000Z'
fetched_at: '2026-07-08T23:01:51.282Z'
---
Warning: I am an accountant and not an ML engineer of any kind, and I'm potentially missing some important points. I wrote all this by hand, but I'll link my gemini chat where I was trying to understand this at the bottom so y'all can decide if I've got AI psychosis or not.
 I was reading through Anthropic's latest publication on the "J space" and trying to translate it to dumb dumb terms that my 3blue1brown-pilled brain can comprehend, and I think I'm grasping the core concepts, thanks in part to Gemini's help. 
 The core idea is pretty cool. If I understand correctly, they are looking at how changes to vectors after earlier layers translate to final logit distributions, and identifying the parts which are most impactful to outputs. Doing this precisely would require tons of backpropagation and expensive math, so they pre-trained an estimator using ~1,000 diverse prompts, so that they could do cheaper math instead. 
 This got me thinking, and it seems like this COULD have a big impact on pruning, merging, and distillation techniques? 
 It seems like it might be possible to create "j-space-aware" pruning or merging techniques. This would be kind of similar to REAP/REAM, but instead of router-weighted expert activations, you would be looking at the activations that are most influential on the final outputs, as estimated by the Jacobian matrices. Doing this might allow for compressing dense models without making them stupid and destroying their reasoning abilities (although it might be necessary to train a smarter estimator on more than the 1k prompts Anthropic used).
 Moreover, I was thinking about (my limited grasp of) how frontier labs distill large models into smaller models by training on both the final logit distributions and the intermediate/hidden states, which helps transfer the reasoning abilities of the big model into smaller models, and it seems like maybe this could be a big deal for distillation?
 It seems like it might be possible to apply this concept 
