---
title: Clarifying the role of the behavioral selection model
url: >-
  https://www.alignmentforum.org/posts/nBjo6yniFjmy2uaYa/clarifying-the-role-of-the-behavioral-selection-model
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-10T19:41:32.000Z'
fetched_at: '2026-05-18T00:50:18.761Z'
---
This is a brief elaboration on The behavioral selection model for predicting AI motivations, based on some feedback and thoughts I’ve had since publishing. Written quickly in a personal capacity.
The main focus of this post is clarifying the basic machinery of the behavioral selection model, and conveying why it matters to disambiguate between different “motivations” for AI behavior. Very similar or identical behavior in training can correspond to radically different outcomes in deployment based on what motivated it.
I’ll preface by saying: I think the behavioral selection model is quite predictive and useful to understand, especially in the short-medium term. But it leaves out some really important dynamics for predicting AI motivations, and I wish I had clarified this more in the original post. Most importantly (as Habryka mentioned), it leaves out the effect of reflection and deliberation on AI motivations (which I discuss a small amount in other pieces, and briefly at the end of this post). This might be the dominant cause of AI motivations! It also abstracts away or ignores a bunch of more concrete paths by which different motivations can arise (e.g., Anders considers a couple here).
Clarifying the basic machinery
Here’s a somewhat updated version of the causal graph from the behavioral selection model. It clears things up by making it a bit more concrete. The causal graph shows possible states of the world that the AI's actions can influence. Each node corresponds to a possible outcome in the actual world—in particular, possible consequences of the actions chosen by a certain cognitive pattern (CP). Crucially, one possible consequence is "this cognitive pattern has influence through deployment."

To recap: we want to know which cognitive patterns will drive behavior in deployment (behavior in deployment is hugely consequential!), and there was some selection process that determined which cognitive patterns the AI ended up with (e.g., RL), so we look at the str
