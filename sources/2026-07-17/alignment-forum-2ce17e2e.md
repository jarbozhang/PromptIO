---
title: 'Prism: Automating Science-of-Evals Research'
url: >-
  https://www.alignmentforum.org/posts/wq5PfGiHvnx6XipDi/prism-automating-science-of-evals-research
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-13T16:30:21.000Z'
fetched_at: '2026-07-16T23:01:40.615Z'
---
tl;dr – we present [Prism], a scaffold for automating science-of-evals research: work that makes the evaluation the primary object of study. The scaffold provides Claude Code with sub-agents and resources for carrying out scientifically rigorous investigations into eval dynamics and, by extension, model behaviours.
We talk through an autonomous Prism run on the Agentic Misalignment setting which demonstrates how minor perturbations to GPT-4.1's prompt cause the model to adopt more indirect methods of blackmail (e.g. telling a trusted ally to blackmail on their behalf). Moreover, the eval's built-in scorers fail to track this kind of misbehaviour, only acknowledging a blackmail attempt if the model mentions the leverage directly in an email to the blackmail victim. This autonomous investigation thus demonstrates one way in which the eval fails to measure what it claims.
This project is ongoing, so please reach out with questions and feedback. We would be excited to see you use Prism in new settings! See the [FAQ] section for our responses to common questions.
This work was done by Louis Thomson during MATS 9.0 (+ 9.1) under the mentorship of Victoria Krakovna. Special thanks to Fred Bruford for support throughout.

Prism in action: identifying a flaw in the Agentic Misalignment eval's built-in scorers

Introduction
Prism[1] is a scaffold for automating science-of-evals research[2], built on top of Claude Code and Inspect. It provides a central Orchestrator agent (the Claude Code session that conducts the investigation) with three dedicated sub-agents, structural constraints to improve scientific rigour, and resources about evaluation science.
Prism can be used to answer questions about evaluation dynamics, like:

"How does feature X in this evaluation setting impact model behaviours?"
"Can you identify any confounds that mean this eval isn't measuring what it claims to measure?"

... or about stress-testing explanations for observed model behaviours, like:

"Is our c
