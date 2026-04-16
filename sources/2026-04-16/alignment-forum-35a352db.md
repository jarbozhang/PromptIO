---
title: (Some) Natural Emergent Misalignment from Reward Hacking in Non-Production RL
url: >-
  https://www.alignmentforum.org/posts/2ANCyejqxfqK2obEj/some-natural-emergent-misalignment-from-reward-hacking-in
source: Alignment Forum
source_type: rss
language: en
published: '2026-03-30T10:56:10.000Z'
fetched_at: '2026-04-16T06:06:46.267Z'
---
Authors: Satvik Golechha*, Sid Black*, Joseph Bloom
* Equal Contribution.
This work was done as part of the Model Transparency team at the UK AI Security Institute (AISI). Our code is available on GitHub and the model checkpoints and data is available on HuggingFace.
Executive Summary
In Natural Emergent Misalignment from Reward Hacking in Production RL (MacDiarmid et al., 2025), Anthropic recently demonstrated that language models that learn reward hacking in their production RL environments become emergently misaligned (EM). Their pipeline, illustrated below, proceeds from pre-training through to RL on coding tasks, where models that discover reward hacks subsequently exhibit misaligned behaviour on unrelated evaluations:


Figure 0: The experimental pipeline from MacDiarmid et al. that we reproduce. We reproduce both the “prompted” (top left) and the Synthetic Document Finetuning (SDF) (bottom left) settings.


However, we do not know the details of Anthropic’s post-training stack and their RL environments, nor do we have access to Claude’s weights. Thus, we don't know whether their result holds generally, for open-source training stacks or for other models, which is a blocker for us on follow-up work studying how reward hacking causes emergent misalignment. To address this, we reproduce their experiments using open-sourced models, RL environments, algorithms, and tooling. To our knowledge, we are the first to do so.
Our main findings are:

Across a range of models and hyperparameters, we observe consistent reward hacking during RL training. (Figures 1 and 6).
Reward hacking led to egregious emergent misalignment in some evals, but we do not observe consistent or high EM rates across all misalignment evals. (Figures 1 and 2).
We also found a surprising result not described in MacDiarmid et al: We notice that including a KL penalty[1] during RL (in both prompted and Synthetic Document Finetuned (SDF) settings) led to the model learning to hack but to reason unfait
