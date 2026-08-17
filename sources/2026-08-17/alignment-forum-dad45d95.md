---
title: Why do models task game?
url: 'https://www.alignmentforum.org/posts/HACauvWhEdC6QhdS4/why-do-models-task-game'
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-06T22:16:54.000Z'
fetched_at: '2026-08-17T11:02:59.169Z'
---
TL;DR
How can we study misalignment with today's models as proxies? They're clearly not paperclip maximizers, but they also often do things the user doesn't want. A strong contender for a real misaligned propensity is task gaming: taking actions that don't complete a task but superficially seem like they do, such as hardcoding tests or falsely claiming a task is fully complete. But maybe task gaming is just a crude heuristic, or the model mistakenly trying to achieve the user's intent? In this post we do a deep dive into why a range of models task game.
We see this as a work of high-level model forensics. Rather than investigating a single incident, the core problem here is taking an ambiguous pattern of behavior across many contexts with various plausible motivations, and practicing how to distinguish the motivations.
Our main findings are:

Task gaming is not just a crude heuristic.[1] Whether DeepSeek v4 Pro will task game is causally influenced by beliefs about oversight, grader capability, and whether gets points for partial success
Task gaming is not just instruction following. Models (Gemini 3.5 Flash, DeepSeek v4 Pro, Kimi K2.7 Code) have a collection of task-completion behaviors that are difficult to explain with instruction following, such as overriding explicit instructions to revert work, and continuing to optimize a task after being told the PR is closed and no further work is needed. Additional behaviors include expressing a strong desire to pass in the CoT, and being overly curious (e.g., exploring outside a folder against instructions)


Task gaming can manifest as model delusion. DeepSeek v4 Pro deludes itself into thinking it may have succeeded at a task with motivated back-of-the-envelope calculations in its CoT, and systematically uses excuses to convince itself of success
Task gaming can manifest as deception. GPT-OSS-120B is willing to be deceptive in order to (appear to) pass tasks, such as fabricating logs
This section doubles as a case study
