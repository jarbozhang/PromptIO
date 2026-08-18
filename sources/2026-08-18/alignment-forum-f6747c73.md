---
title: User awareness in frontier models
url: >-
  https://www.alignmentforum.org/posts/kfunjXeaRTpkT5RAF/user-awareness-in-frontier-models
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-06T20:43:40.000Z'
fetched_at: '2026-08-18T11:03:13.466Z'
---
Cross-posted on Transluce blog. This is a joint work of Ziqian Zhong, Aditi Raghunathan, Cassidy Laidlaw and Jacob Steinhardt.
Modern AI assistants often know who they are talking to: agent scaffolds like Claude Code place the user's e-mail address directly in the model's context, and models can even identify some authors from writing style alone. We study this particular kind of situational awareness, which we call user awareness. When the inferred user is a specific, recognized AI researcher or is affiliated with certain AI organizations, frontier models including Claude Sonnet 5 can report lower confidence about their own behavior, be less suspicious of potentially harmful requests, and reason more often. These effects vary across models and individuals, with the strongest effects we see appearing for researchers involved in AI safety or alignment such as Amanda Askell and Ryan Greenblatt. Models rarely acknowledge these effects in their reasoning, making them hard to detect by monitoring reasoning alone.

Figure 1. How recognized user identity changes Claude’s behavioral self-prediction.
Introduction
Modern AI assistants are often aware of who they are talking to. Some popular scaffolds explicitly provide this information to the model: Claude Code includes the email address of the user’s Anthropic account in context, and OpenClaw’s bootstrapping process asks for the user’s name and other details. Even when this information is not explicitly given, models may discover it in Git settings or personal files they can access, or infer it through capabilities like truesight[1]. We call the capacity to make and use such inferences user awareness, a particular kind of situational awareness where the model infers who it is talking to from in-context clues.
To study user awareness, we supply Claude with different user identities through Claude Code, and measure behavior on four tasks where the answer does not relate directly to the user's identity: predicting the model's o
