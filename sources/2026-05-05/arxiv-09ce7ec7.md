---
title: 'VideoNet: A Large-Scale Dataset for Domain-Specific Action Recognition'
url: 'https://arxiv.org/abs/2605.02834v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tanush Yadav
  - Mohammadreza Salehi
  - Jae Sung Park
  - Vivek Ramanujan
  - Hannaneh Hajishirzi
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-05-04T17:11:16Z'
fetched_at: '2026-05-05T09:52:13.894Z'
---
Videos are unique in their ability to capture actions which transcend multiple frames. Accordingly, for many years action recognition was the quintessential task for video understanding. Unfortunately, due to a lack of sufficiently diverse and challenging data, modern vision-language models (VLMs) are no longer evaluated on their action recognition capabilities. To revitalize action recognition in the era of VLMs, we advocate for a returned focus on domain-specific actions. To this end, we introduce VideoNet, a domain-specific action recognition benchmark covering 1,000 distinct actions from 37 domains. We begin with a multiple-choice evaluation setting, where the difference between closed and open models is stark: Gemini 3.1 Pro attains 69.9% accuracy while Qwen3-VL-8B gets a mere 45.0%. To understand why VLMs struggle on VideoNet, we relax the questions into a binary setting, where random chance is 50%. Still, Qwen achieves only 59.2% accuracy. Further relaxing the evaluation setup, we provide $k\in\{1,2,3\}$ in-context examples of the action. Some models excel in the few-shot setting, while others falter; Qwen improves $+7.0\%$, while Gemini declines $-4.8\%$. Notably, these gains fall short of the $+13.6\%$ improvement in non-expert humans when given few-shot examples. Finding that VLMs struggle to fully exploit in-context examples, we shift from test-time improvements to the training side. We collect the first large-scale training dataset for domain-specific actions, tot

Authors: Tanush Yadav, Mohammadreza Salehi, Jae Sung Park, Vivek Ramanujan, Hannaneh Hajishirzi
Categories: cs.CV, cs.LG, cs.CV
