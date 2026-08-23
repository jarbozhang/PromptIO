---
title: Deployment Awareness Matters More Than Evaluation Awareness
url: >-
  https://www.alignmentforum.org/posts/XP794SHDuXYfWLrvJ/deployment-awareness-matters-more-than-evaluation-awareness
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-26T22:54:06.000Z'
fetched_at: '2026-07-02T23:01:29.630Z'
---
TL;DR

Evaluation awareness — an AI recognizing it's being evaluated — is a widely discussed concept in AI safety. But there is a closely related concept that we claim is more important: deployment awareness, the AI's ability to recognize when it is not being evaluated and when its actions matter. A misaligned AI with deployment awareness can game evaluations without any evaluation awareness at all, with a simple strategy: act aligned by default, and deviate only when confident you're in real deployment and your actions matter for your goals. This requires two ingredients — occasionally recognizable deployment situations, and enough self-reflective and strategic reasoning for the AI to anticipate and plan around this. We think "deployment awareness" better identifies what makes evaluations fragile, and we develop this idea below.


Concept

Explanation

Comments


Evaluation awareness

AI is being tested and confidently believes that this is so

This only becomes a problem if most evaluations trigger evaluation awareness, and if the AI knows that.
Or if the AI has good self-locating reasoning.


Deployment awareness

AI is not being tested and confidently believes it is not being tested

This is a problem even if it happens rarely
(if some of those rare cases are high stakes).


Accurate self-locating beliefs

AI has (roughly correct) beliefs about the sequence of situations it will face

This allows for strategic planning.
It makes deployment awareness and probabilistic strategies more effective.



Side note: it's really about consequences, not about evaluation vs. deployment

Before diving in, a quick but important observation. The distinction that should matter to a strategic AI[1] isn't really "evaluation vs. deployment." It's something more like: "if I take this action, could it backfire? For example, through failing an evaluation, triggering retraining, or losing privileges?" and "if I get away with this action, how much does it advance my goals?" Evaluations
