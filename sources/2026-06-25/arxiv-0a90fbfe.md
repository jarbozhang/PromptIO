---
title: >-
  Why Multi-Step Tool-Use Reinforcement Learning Collapses and How Supervisory
  Signals Fix It
url: 'https://arxiv.org/abs/2606.26027v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yupu Hao
  - Zhuoran Jin
  - Huanxuan Liao
  - Kang Liu
  - Jun Zhao
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-06-24T16:55:56Z'
fetched_at: '2026-06-25T07:41:52.284Z'
---
Tool use enables large language models (LLMs) to perform complex tasks, and recent agentic reinforcement learning (RL) methods show promise for enhancing model capabilities. However, RL alone often leads to instability or limited gains in tool-use tasks. In our experiments, some models exhibit catastrophic collapse, where performance abruptly drops and tool-invocation structures fail. The analysis reveals that these failures stem from unexpected probability spikes in specific control tokens, disrupting structured execution, yet the underlying tool-use capability remains intact, merely obscured by specific formats. To address this, we systematically investigate a diverse set of supervisory signals, including off-policy supervision, hint-based guidance, erroneous example supervision, and others, applied under both synchronous and interleaved training schemes. We find that interleaving supervised fine-tuning (SFT) with RL substantially improves stability, but exhibits degraded performance under format and content out-of-distribution (OOD) evaluation. We also analyze the impact of learning rates and generalization across settings. These results highlight the importance of understanding RL failures and demonstrate how diverse supervisory signals can guide exploratory learning, enabling robust training of LLMs for complex, multi-step tool-use tasks. Our Code is available at https://github.com/hypasd-art/Tool-RL-Box.

Authors: Yupu Hao, Zhuoran Jin, Huanxuan Liao, Kang Liu, Jun Zhao
Categories: cs.CL, cs.LG, cs.CL
