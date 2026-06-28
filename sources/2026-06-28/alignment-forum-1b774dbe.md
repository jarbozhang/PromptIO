---
title: Predicting LLM Safety Before Release by Simulating Deployment
url: >-
  https://www.alignmentforum.org/posts/xPXJfgqFTvuJxGZbE/predicting-llm-safety-before-release-by-simulating
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-16T19:55:05.000Z'
fetched_at: '2026-06-28T00:47:21.769Z'
---
Paper link
Before releasing a new model, labs need to understand not just what it can do, but how it is likely to behave in real-world use, including where it might introduce new risks. This becomes even more important as capabilities increase. As part of our pre-deployment safety review, we leverage targeted evaluations, red-teaming, and other checks to understand model behavior. We’ve now started using a method for simulating model deployments before they happen, which adds a complementary signal: a deployment-like preview of how a candidate model may behave before it reaches users.
Deployment Simulation is a method for simulating a future deployment before it happens. We do so by replaying previous conversations in a privacy-preserving manner with a new candidate model. By doing so, we can study how the new model responds in realistic contexts before release, including whether new undesired behaviors emerge and how often they may appear.
In our GPT-5.4 study, these forecasts were informative. For categories whose production rates changed by at least 1.5x, deployment simulation predicted the direction of change 92% of the time, compared with 54% for a baseline built from challenging prompts. Simulated deployments also looked much closer to real production traffic on evaluation-awareness measures: traditional evals often visibly have stage lights; production prefixes mostly do not.
The hardest case is agentic tool use, where realistic behavior depends on external state: filesystems, connectors, syscalls, network services, and prior tool results. We address this by using another model to simulate tool responses, with access to the original trajectory and time-matched codebase where possible. This is not a replacement for traditional evals, but it is a useful complement: safety evals should be forecasts with post-release scorecards, not just obstacle courses.
We have already used insights from Deployment Simulation during model development to identify blind spots in 
