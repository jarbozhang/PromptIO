---
title: The Case for Evaluating Model Behaviors
url: >-
  https://www.alignmentforum.org/posts/J5KkwYnnaeNX7hL2s/the-case-for-evaluating-model-behaviors
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-20T18:42:36.000Z'
fetched_at: '2026-05-28T03:16:29.151Z'
---
Most evaluations of AI systems focus on their capabilities: how good they are at coding tasks, how effectively they can answer complex scientific questions, and so on.
From a safety perspective, capability evaluations have a place: by understanding how close we are to different capabilities, and the rate of progress on them, we can forecast when different risks are likely to occur, as well as the broad shape of AI development. These capability evaluations were very useful to me when writing GPT-2030, and more recently I've found the METR time horizon graph useful for extrapolating the likely degree of autonomy of future agents.
However, these evaluations also have pretty significant externalities: accurate capability measurements speed up capability research, and the work needed to fully elicit model capabilities involves developing agent scaffolds and other artifacts that directly advance model capabilities. This also means that AI labs are already highly incentivized to produce such evaluations, making the counterfactual impact lower[1].
There is a different class of evaluations that I think is significantly more valuable and underinvested in, and that doesn't have these issues. These are behavior evaluations: evaluations that measure a model's tendencies (sometimes also called propensity evals).
Here are the sorts of questions a behavior eval might answer[2]:

How often does a model agree with a user in cases where the user is factually wrong?[3]
How frequently do models explicitly verbalize awareness that they are being evaluated, and what factors lead to this?[4]
How often do different models reward hack an environment (e.g. hard-coding unit tests) and in what situations does this tend to occur?[5]
How frequently do models report having internal desires or subjective experience?[6]

To turn these questions into concrete numbers, we will typically define a judge of the behavior (often a language model with a rubric) as well as a distribution over environments th
