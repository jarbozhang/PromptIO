---
title: Towards surfacing model algorithms with meta-tokens in the J-Space
url: >-
  https://www.alignmentforum.org/posts/6ek6n7yZ5DzfarJHy/towards-surfacing-model-algorithms-with-meta-tokens-in-the-j
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-20T19:45:04.000Z'
fetched_at: '2026-07-26T11:01:26.197Z'
---
TL;DR
We used J-lens on Qwen3.6-27B to find “meta-tokens”: tokens that surface non-obvious computation in the model. When the model reads ambiguous text, 什么意思 ("what does this mean") fires in the J-space, and steering it away makes the model answer "a boiled egg every morning is hard to beat" with nutrition facts instead of catching the pun. On LCM problems, "gcd" fires, pointing at the product/GCD algorithm: swapping the GCD vector from 9 to 3 makes the model change its answer for the LCM of 27 and 90 from 270 to 810. Additionally, before the model hedges, 大概率 ("most likely") fires, and suppressing it makes the model commit to a single option (for e.g. "There are several logical places John could have gone" turns into "he went to the stationery store)." While meta-tokens are hard to find with J-lens’ single token constraint, future methods for multi-token J-lens open the possibility for valuable insights into the model’s internal algorithms.



Motivation
One important goal in interpretability is to surface the variables the model uses in its computations. Another is to surface the algorithms that give rise to these variables. We can call the former variable interpretability and the latter algorithm interpretability (see e.g. Engels et al). Recent work from Anthropic introduced an interpretability technique called the J-lens, which seems to allow us to access a cognitive space in the model. J-lens is a technique for interpreting intermediate variables in the residual stream, so initially its applications to algorithm interpretability seem highly indirect (i.e. looking at which intermediates are used can narrow down algorithms). Expanding on our preliminary findings, we find evidence that J-lens can in some cases more directly indicate the algorithm used by the model.
What are “meta-tokens”?
We loosely define meta-tokens as tokens that appear in J-lens readouts and give non-obvious evidence of the type of processing/algorithm occurring in the model. The token vector
