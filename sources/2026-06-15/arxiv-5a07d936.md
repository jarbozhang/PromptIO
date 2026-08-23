---
title: 'HyperTool: Beyond Step-Wise Tool Calls for Tool-Augmented Agents'
url: 'https://arxiv.org/abs/2606.13663v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yaxin Du
  - Yifan Zhou
  - Yujie Ge
  - Jiajun Wang
  - Xianghe Pang
categories:
  - cs.CL
  - cs.CL
published: '2026-06-11T17:56:36Z'
fetched_at: '2026-06-14T23:19:44.403Z'
---
Tool-augmented LLM agents commonly rely on step-wise atomic tool calls, where each invocation, observation, and value transfer is exposed in the main reasoning trace. This creates an \emph{execution-granularity mismatch}: locally deterministic tool workflows are unfolded into repeated model-visible decisions, consuming context and forcing the model to manage low-level dataflow in the trace. We introduce \textbf{HyperTool}, a unified executable MCP-style tool interface that changes the model-visible unit of tool execution. A model invokes HyperTool with a code block that can call existing tools through their original schemas, manipulate returned values, and pass intermediate results locally, folding deterministic tool subroutines into a single outer call. To train models to use this interface, we synthesize HyperTool-format trajectories from cross-tool compositional tasks and verify them in real MCP environments. On MCP-Universe, HyperTool improves average accuracy from 15.69\% to 35.29\% on Qwen3-32B and from 9.93\% to 33.33\% on Qwen3-8B, and surpass GPT-OSS and Kimi-k2.5 on average accuracy, showing that our HyperTool can substantially improve multi-step tool use.

Authors: Yaxin Du, Yifan Zhou, Yujie Ge, Jiajun Wang, Xianghe Pang
Categories: cs.CL, cs.CL
