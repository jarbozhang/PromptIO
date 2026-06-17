---
title: 'Learning from the Self-future: On-policy Self-distillation for dLLMs'
url: 'https://arxiv.org/abs/2606.18195v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yifu Luo
  - Zeyu Chen
  - Haoyu Wang
  - Xinhao Hu
  - Yuxuan Zhang
categories:
  - cs.CL
  - cs.CL
published: '2026-06-16T17:24:57Z'
fetched_at: '2026-06-17T03:04:24.952Z'
---
On-policy self-distillation (OPSD) has proven effective for post-training large language models (LLMs), yet its application to diffusion LLMs (dLLMs) remains unexplored. Existing OPSD methods are inherently autoregressive-centric. They inject privileged information via left-to-right prefix conditioning with token-level divergence supervision, a design that fundamentally conflicts with the arbitraryorder generation of dLLMs. We introduce d-OPSD, the first OPSD framework tailored for dLLMs. Our approach makes two core contributions. First, we reframe self-teacher construction by using self-generated answers as suffix conditioning, enabling the student model to learn from "self future-experience" rather than privileged prefixes. Second, we shift supervision from token-level to step-level, aligning training with the iterative denoising process of dLLMs. Experiments across four reasoning benchmarks show that d-OPSD consistently outperforms RLVR and SFT baselines with superior sample efficiency, requiring only around 10% of the optimization steps by RLVR and opening a promising pathway for dLLM posttraining. The code is available at https://github.com/xingzhejun/d-OPSD.

Authors: Yifu Luo, Zeyu Chen, Haoyu Wang, Xinhao Hu, Yuxuan Zhang
Categories: cs.CL, cs.CL
