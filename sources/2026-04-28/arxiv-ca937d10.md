---
title: >-
  HeadRouter: Dynamic Head-Weight Routing for Task-Adaptive Audio Token Pruning
  in Large Audio Language Models
url: 'https://arxiv.org/abs/2604.23717v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Peize He
  - Yaodi Luo
  - Xiaoqian Liu
  - Xuyang Liu
  - Jiahang Deng
categories:
  - cs.SD
  - cs.CL
  - cs.SD
published: '2026-04-26T14:00:31Z'
fetched_at: '2026-04-28T02:04:33.987Z'
---
Recent large audio language models (LALMs) demonstrate remarkable capabilities in processing extended multi-modal sequences, yet incur high inference costs. Token compression is an effective method that directly reduces redundant tokens in the sequence. Existing compression methods usually assume that all attention heads in LALMs contribute equally to various audio tasks and calculate token importance by averaging scores across all heads. However, our analysis demonstrates that attention heads exhibit distinct behaviors across diverse audio domains. We further reveal that only a sparse subset of attention heads actively responds to audio, with completely different performance when handling semantic and acoustic tasks. In light of this observation, we propose HeadRouter, a head-importance-aware token pruning method that perceives the varying importance of attention heads in different audio tasks to maximize the retention of crucial tokens. HeadRouter is training-free and can be applied to various LALMs. Extensive experiments on the AudioMarathon and MMAU-Pro benchmarks demonstrate that HeadRouter achieves state-of-the-art compression performance, exceeding the baseline model even when retaining 70% of the audio tokens and achieving 101.8% and 103.0% of the vanilla average on Qwen2.5-Omni-3B and Qwen2.5-Omni-7B, respectively.

Authors: Peize He, Yaodi Luo, Xiaoqian Liu, Xuyang Liu, Jiahang Deng
Categories: cs.SD, cs.CL, cs.SD
