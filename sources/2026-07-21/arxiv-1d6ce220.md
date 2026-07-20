---
title: >-
  ToolSciVer: Multimodal Scientific Claim Verification with Visual Tool
  Augmented Reinforcement Learning
url: 'https://arxiv.org/abs/2607.16131v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Binglin Zhou
  - Peng Shi
  - Ryo Kamoi
  - Nan Zhang
  - Rui Zhang
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-07-17T17:11:50Z'
fetched_at: '2026-07-20T23:02:10.418Z'
---
Multimodal Scientific Claim Verification (MSCV) requires models to verify scientific claims using visually grounded evidence from papers, including figures, tables, charts, and textual context. However, existing methods often fail because they struggle to locate decisive visual evidence, accurately read structured scientific visuals, and integrate multimodal observations into reliable reasoning. We introduce ToolSciVer, the first tool-augmented framework for MSCV to our knowledge. ToolSciVer equips a VLM with three type-aware visual tools, table row/column focus, chart-to-structure parsing, and high-resolution region zoom, which convert dense scientific visuals into explicit, claim-facing evidence, and trains the policy with Group Relative Policy Optimization (GRPO) under a composite reward of answer correctness, format validity, length control, tool-use efficiency, and tool-validity penalties. Experiments on SciVer and MuSciClaims datasets on five VLMs from three model families (Qwen, InternVL, Gemma) demonstrate that our method achieves superior performance compared to four competitive baselines including prompting-based and RL-based tool-use methods, highlighting the effectiveness of learned, type-aware tool use for scientific claim verification.

Authors: Binglin Zhou, Peng Shi, Ryo Kamoi, Nan Zhang, Rui Zhang
Categories: cs.CL, cs.AI, cs.CL
