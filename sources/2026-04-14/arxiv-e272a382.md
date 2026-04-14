---
title: 'VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images'
url: 'https://arxiv.org/abs/2604.09531v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guanyu Zhou
  - Yida Yin
  - Wenhao Chai
  - Shengbang Tong
  - Xingyu Fu
categories:
  - cs.CV
  - cs.AI
  - cs.CL
  - cs.CV
published: '2026-04-10T17:48:51Z'
fetched_at: '2026-04-14T00:33:19.760Z'
---
Vision-language models (VLMs) still struggle with visual perception tasks such as spatial understanding and viewpoint recognition. One plausible contributing factor is that natural image datasets provide limited supervision for low-level visual skills. This motivates a practical question: can targeted synthetic supervision, generated from only a task keyword such as Depth Order, address these weaknesses? To investigate this question, we introduce VisionFoundry, a task-aware synthetic data generation pipeline that takes only the task name as input and uses large language models (LLMs) to generate questions, answers, and text-to-image (T2I) prompts, then synthesizes images with T2I models and verifies consistency with a proprietary VLM, requiring no reference images or human annotation. Using VisionFoundry, we construct VisionFoundry-10K, a synthetic visual question answering (VQA) dataset containing 10k image-question-answer triples spanning 10 tasks. Models trained on VisionFoundry-10K achieve substantial improvements on visual perception benchmarks: +7% on MMVP and +10% on CV-Bench-3D, while preserving broader capabilities and showing favorable scaling behavior as data size increases. Our results suggest that limited task-targeted supervision is an important contributor to this bottleneck and that synthetic supervision is a promising path toward more systematic training for VLMs.

Authors: Guanyu Zhou, Yida Yin, Wenhao Chai, Shengbang Tong, Xingyu Fu
Categories: cs.CV, cs.AI, cs.CL, cs.CV
