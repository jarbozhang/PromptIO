---
title: >-
  [Paper] ToMoE: Converting Dense Large Language Models to Mixture-of-Experts
  through Dynamic Structural Pruning
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vx3img/paper_tomoe_converting_dense_large_language/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T13:54:54.000Z'
fetched_at: '2026-08-25T11:00:49.195Z'
---
ToMoE: Converting Dense Large Language Models to Mixture-of-Experts through Dynamic Structural Pruning
  
Large Language Models (LLMs) have demonstrated remarkable abilities in tackling a wide range of complex tasks. However, their huge computational and memory costs raise significant challenges in deploying these models on resource-constrained devices or efficiently serving them. Prior approaches have attempted to alleviate these problems by permanently removing less important model structures, yet these methods often result in substantial performance degradation due to the permanent deletion of model parameters. In this work, we tried to mitigate this issue by reducing the number of active parameters without permanently removing them. Specifically, we introduce a differentiable dynamic pruning method that pushes dense models to maintain a fixed number of active parameters by converting their MLP layers into a Mixture of Experts (MoE) architecture. Our method, even without fine-tuning, consistently outperforms previous structural pruning techniques across diverse model families, including Phi-2, LLaMA-2, LLaMA-3, and Qwen-2.5.
  
 arXiv : https://arxiv.org/abs/2501.15316
 Full Paper PDF : https://arxiv.org/pdf/2501.15316
 GitHub : https://github.com/gaosh/ToMoE (Yes, Code available for this)
 ICML : https://icml.cc/virtual/2026/poster/68821
 OpenReview : https://openreview.net/forum?id=RFHq46pjb6
  
Somebody please create MOE models of recent Dense models like Qwen3.8-27B, Muse-Glimmer-30B, etc.,
 Thanks u/KSAM-The-Randomizer for sharing this on my old thread.
    submitted by    /u/pmttyji  
 [link]   [comments]
