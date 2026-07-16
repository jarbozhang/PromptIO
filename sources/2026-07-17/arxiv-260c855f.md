---
title: >-
  Deep Interaction: An Efficient Human-AI Interaction Method for Large Reasoning
  Models
url: 'https://arxiv.org/abs/2607.14049v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hefeng Zhou
  - Jinxuan Zhang
  - Jiong Lou
  - Yuxin Liu
  - Chaochao Lu
categories:
  - cs.AI
  - cs.AI
published: '2026-07-15T17:16:43Z'
fetched_at: '2026-07-16T23:02:09.821Z'
---
The emergence of Chain-of-Thought (CoT) reasoning has significantly enhanced the ability of large language models (LLMs) to tackle complex, multi-step tasks. However, when errors occur, current interaction approaches typically involve re-generating another response that may make mistakes again, or users laboriously flag the faulty step in follow-up turns that may get responses &lt;You are right, I made a mistake here&gt; followed by similar errors recurring. To address this issue, we propose an efficient human intervention mechanism for precisely correcting reasoning errors in LLMs, termed Deep Interaction. Our approach enables direct editing of the original response, allowing erroneous parts to be corrected while preserving accurate reasoning steps. We refine the edited CoT into a distilled prompt, which then steers the LLM along the corrected reasoning path. Experimental results show that our method achieves over a 25% improvement in correction success rate and reduces token usage by approximately 40% on STEM tasks reasoning compared to baseline approaches.

Authors: Hefeng Zhou, Jinxuan Zhang, Jiong Lou, Yuxin Liu, Chaochao Lu
Categories: cs.AI, cs.AI
