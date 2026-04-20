---
title: 'v5.1.0: EXAONE-MoE, PP-DocLayoutV3, Youtu-LLM, GLM-OCR'
url: 'https://github.com/huggingface/transformers/releases/tag/v5.1.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-02-05T15:44:54.000Z'
fetched_at: '2026-04-20T05:39:30.540Z'
---
New Model additions
EXAONE-MoE

K-EXAONE is a large-scale multilingual language model developed by LG AI Research. Built using a Mixture-of-Experts architecture, K-EXAONE features 236 billion total parameters, with 23 billion active during inference. Performance evaluations across various benchmarks demonstrate that K-EXAONE excels in reasoning, agentic capabilities, general knowledge, multilingual understanding, and long-context processing.
Add EXAONE-MoE implementations (#43080) by @nuxlear
PP-DocLayoutV3

PP-DocLayoutV3 is a unified and high-efficiency model designed for comprehensive layout analysis. It addresses the challenges of complex physical distortions—such as skewing, curving, and adverse lighting—by integrating instance segmentation and reading order prediction into a single, end-to-end framework.
[Model] Add PP-DocLayoutV3 Model Support (#43098) by @zhang-prog
Youtu-LLM

Youtu-LLM is a new, small, yet powerful LLM, contains only 1.96B parameters, supports 128k long context, and has native agentic talents. On general evaluations, Youtu-LLM significantly outperforms SOTA LLMs of similar size in terms of Commonsense, STEM, Coding and Long Context capabilities; in agent-related testing, Youtu-LLM surpasses larger-sized leaders and is truly capable of completing multiple end2end agent tasks.
Add Youtu-LLM model (#43166) by @LuJunru
GlmOcr

GLM-OCR is a multimodal OCR model for complex document understanding, built on the GLM-V encoder–decoder architecture. It introduces Multi-Token Prediction (MTP) loss and stable full-task reinforcement learning to improve training efficiency, recognition accuracy, and generalization. The model integrates the CogViT visual encoder pre-trained on large-scale image–text data, a lightweight cross-modal connector with efficient token downsampling, and a GLM-0.5B language decoder. Combined with a two-stage pipeline of layout analysis and parallel recognition based on PP-DocLayout-V3, GLM-OCR delivers robust and high-quality OCR
