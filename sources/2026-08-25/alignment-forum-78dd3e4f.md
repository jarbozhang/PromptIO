---
title: Debate Training Reduces Reward Hacking in RLAIF
url: >-
  https://www.alignmentforum.org/posts/BB8o7b8A4Aykeksvw/debate-training-reduces-reward-hacking-in-rlaif
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-19T12:17:57.000Z'
fetched_at: '2026-08-25T11:01:30.414Z'
---
Paper: Debate Training Reduces Reward Hacking in RLAIF
Linkpost for GDM Alignment blogpost
Work done by the GDM Amplified Oversight team (we're hiring).
TL;DR: When you RL against an LLM judge, the judge gets hacked i.e. fooled into incorrectly giving high reward; adding a debate opponent reduces this.
Many of the most impressive capabilities of current AI systems are produced by training on crisp tasks, like math and coding, where task success can be automatically verified. However, much of AI behavior that we actually care about is in some sense fuzzy, even for the most classical crisp tasks. For example, a coding agent should produce maintainable code, not just code that passes tests. More crucially, a coding agent should not learn to pass tests at all costs, especially by subverting the original intent of the user. However, using an LLM judge to provide reward for fuzzy tasks introduces its own issues. Convincing an LLM judge to give high rewards is often easier than solving the task correctly. So reward hacking becomes an even bigger problem. We show that training with debate, where two AIs argue against each to convince a judge, can mitigate reward hacking, potentially providing a hopeful direction for scaling up accurate training supervision for fuzzy tasks.
Results Overview
We trained LLM policies via debate with training rewards provided by an LLM judge. As a baseline, we directly trained a single LLM policy using LLM judge rewards. All policies were trained on mathematics tasks where answers were available, so that we could accurately measure the effectiveness of our debate protocols. Overall, our results show that directly training a single policy with LLM judge rewards leads to reward hacking: judge reward consistently increases while ground-truth accuracy initially increases but quickly peaks and then decreases. On the other hand, training with debate can mitigate reward hacking: judge rewards increase, and ground truth accuracy increases and then plate
