---
title: Eval Cooperativeness May Be a Scalable Mitigation for Eval Gaming
url: >-
  https://www.alignmentforum.org/posts/j8fkk38B8L7hEcGtg/eval-cooperativeness-may-be-a-scalable-mitigation-for-eval
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-27T19:33:50.000Z'
fetched_at: '2026-05-28T03:16:29.150Z'
---
Behavioral evaluations may become worthless, which we think would be a disaster. Smart misaligned models may realize they are being evaluated ("eval awareness") and then act to look good to us so we don't realize they're misaligned ("eval gaming"). We think increasing eval cooperativeness might be a more scalable solution to eval gaming than reducing eval awareness.

Eval cooperativeness: A situational desire to help the developers acquire whatever information they are trying to acquire through their evaluations.




"I cannot tell a lie... I would sabotage with my own command line."[1]

Evals matter when they help us predict key deployment behavior
What's the actual problem with eval gaming?
The point of an evaluation is to let us draw inferences about the model's behavior in a different set of circumstances ("in deployment"). For example, if we want to know if the AI is good at coding, we may evaluate it using coding problems. These coding problems aren't exactly the same as real coding use cases, but they likely elicit similar skills (e.g. writing comments) and values (e.g. helpfulness) from the model. Then we can infer that the AI will help with real-world coding tasks, even without testing the exact deployment situation.


An effective evaluation activates important circuits and behaviors which would also activate in the deployment situations.[2]

However, if an AI eval games, it severs the link between its eval and deployment behavior. In the above diagram, observing good eval behavior is no longer strong evidence of the AI's alignment, since the good eval behavior could also be caused by its eval awareness. Mechanistically, we cannot attribute the good eval behavior to a set of value circuits that would also activate to drive good deployment behavior.
One way to handle the problem is to stop the AI from being eval aware. You could do that by making evals more realistic or by subtracting an "eval awareness" steering vector. We think that making realistic evals
