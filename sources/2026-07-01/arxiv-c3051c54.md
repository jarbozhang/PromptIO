---
title: >-
  Scaling the Horizon, Not the Parameters: Reaching Trillion-Parameter
  Performance with a 35B Agent
url: 'https://arxiv.org/abs/2606.30616v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Lei Bai
  - Zongsheng Cao
  - Yang Chen
  - Zhiyao Cui
  - Shangheng Du
categories:
  - cs.CL
  - cs.CL
published: '2026-06-29T17:50:54Z'
fetched_at: '2026-06-30T23:02:51.938Z'
---
We introduce Agents-A1, a 35B Mixture-of-Experts Agentic Model that reaches trillion-parameter-level performance by scaling the agent horizon. We investigate agent-horizon scaling from two perspectives: scaling long-horizon trajectories and scaling heterogeneous agent abilities. To support this goal, we build a long-horizon knowledge-action infrastructure that connects external knowledge, actions, observations, and verifier outcomes, producing agentic trajectories with an average length of 45K tokens. Based on this, we train Agents-A1 with a three-stage recipe. First, we perform full-domain supervised fine-tuning to align the base model with broad agentic behaviors. Second, we train domain-level teacher models to capture specialized expertise in each domain. Third, we propose a multi-teacher domain-routed on-policy distillation with salient vocabulary alignment to improve knowledge transfer efficiency across different domains, unifying six heterogeneous domains into one deployable student model. Agents-A1 achieves strong and broad performance for long-horizon agent benchmarks. Compared with 1T-parameter model such as Kimi-K2.6 and DeepSeek-V4-pro, Agents-A1 achieves leading results on SEAL-0 (56.4), IFBench (80.6), HiPhO (46.4), FrontierScience-Olympiad (79.0), and MolBench-Bind (56.8), and remains highly competitive on SciCode (44.3), HLE (47.6) and BrowseComp (75.5). We hope this work provides the community with a practical path for scaling the horizon using a 35B agent tha

Authors: Lei Bai, Zongsheng Cao, Yang Chen, Zhiyao Cui, Shangheng Du
Categories: cs.CL, cs.CL
