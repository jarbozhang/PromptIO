---
title: >-
  How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption
  in Agentic Coding Tasks
url: 'https://arxiv.org/abs/2604.22750v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Longju Bai
  - Zhemin Huang
  - Xingyao Wang
  - Jiao Sun
  - Rada Mihalcea
categories:
  - cs.CL
  - cs.CY
  - cs.HC
  - cs.SE
  - cs.CL
published: '2026-04-24T17:54:47Z'
fetched_at: '2026-04-27T07:57:01.875Z'
---
The wide adoption of AI agents in complex human workflows is driving rapid growth in LLM token consumption. When agents are deployed on tasks that require a significant amount of tokens, three questions naturally arise: (1) Where do AI agents spend the tokens? (2) Which models are more token-efficient? and (3) Can agents predict their token usage before task execution? In this paper, we present the first systematic study of token consumption patterns in agentic coding tasks. We analyze trajectories from eight frontier LLMs on SWE-bench Verified and evaluate models' ability to predict their own token costs before task execution. We find that: (1) agentic tasks are uniquely expensive, consuming 1000x more tokens than code reasoning and code chat, with input tokens rather than output tokens driving the overall cost; (2) token usage is highly variable and inherently stochastic: runs on the same task can differ by up to 30x in total tokens, and higher token usage does not translate into higher accuracy; instead, accuracy often peaks at intermediate cost and saturates at higher costs; (3) models vary substantially in token efficiency: on the same tasks, Kimi-K2 and Claude-Sonnet-4.5, on average, consume over 1.5 million more tokens than GPT-5; (4) task difficulty rated by human experts only weakly aligns with actual token costs, revealing a fundamental gap between human-perceived complexity and the computational effort agents actually expend; and (5) frontier models fail to accurat

Authors: Longju Bai, Zhemin Huang, Xingyao Wang, Jiao Sun, Rada Mihalcea
Categories: cs.CL, cs.CY, cs.HC, cs.SE, cs.CL
