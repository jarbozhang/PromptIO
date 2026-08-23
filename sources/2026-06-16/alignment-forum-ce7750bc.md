---
title: Efficient tradeoffs and the safety-usefulness tradeoff model
url: >-
  https://www.alignmentforum.org/posts/mBsZTZxtjgCdN4CDA/efficient-tradeoffs-and-the-safety-usefulness-tradeoff-model
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-08T20:28:17.000Z'
fetched_at: '2026-06-16T06:32:16.699Z'
---
I often use what I’ll call the “safety-usefulness tradeoff model”, which is: developers face a tradeoff between "safety" and "usefulness" of an AI deployment, and the developer has only limited willingness or ability to sacrifice usefulness for the sake of safety. This model assumes that developers choose whether to take safety-relevant actions based on their cost efficiency, i.e., the marginal safety gain relative to the cost. However, that is not necessarily true. In this post, I spell out different stories for how developers choose what safety-relevant actions to take, in order to clarify when this model is relevant and how strategies for reducing AI risk are affected when its assumptions don't hold.

The model suggests two ways a safety-concerned person can increase safety:

Safety tech improvements: push out the Pareto frontier, so that any given level of usefulness reduction buys more safety than it would have previously.
Safety budget increase: increase the extent to which the developer sacrifices usefulness for safety. On the cheaper end, this means implementing safety measures; on the more expensive end, it might mean refraining from training or deploying models whose risks they can't mitigate.

Throughout this post, I’ll use “you” to refer to the person who wants safety and who is using this model to decide what to do—this model ignores that people who are concerned about AI risks disagree with each other.
The safety/usefulness tradeoff model can be motivated in two fundamentally different ways:

Rushed reasonable developer: The AI developer perfectly shares your preferences and beliefs, but is under constraints that force them to deploy and develop their AIs. For example, maybe they have a competitor that is a year behind them and they think it would be disastrous for the competitor to catch up. This is the context in which I first thought about the model.
Limited political will: The AI developer doesn't share your preferences and beliefs, and places much
