---
title: >-
  How Do LLMs and VLMs Understand Viewpoint Rotation Without Vision? An
  Interpretability Study
url: 'https://arxiv.org/abs/2604.15294v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhen Yang
  - Ping Jian
  - Zhongbin Guo
  - Zuming Zhang
  - Chengzhi Li
categories:
  - cs.AI
  - cs.AI
published: '2026-04-16T17:55:19Z'
fetched_at: '2026-04-19T01:16:45.153Z'
---
Over the past year, spatial intelligence has drawn increasing attention. Many prior works study it from the perspective of visual-spatial intelligence, where models have access to visuospatial information from visual inputs. However, in the absence of visual information, whether linguistic intelligence alone is sufficient to endow models with spatial intelligence, and how models perform relevant tasks with text-only inputs still remain unexplored. Therefore, in this paper, we focus on a fundamental and critical capability in spatial intelligence from a linguistic perspective: viewpoint rotation understanding (VRU). Specifically, LLMs and VLMs are asked to infer their final viewpoint and predict the corresponding observation in an environment given textual description of viewpoint rotation and observation over multiple steps. We find that both LLMs and VLMs perform poorly on our proposed dataset while human can easily achieve 100% accuracy, indicating a substantial gap between current model capabilities and the requirements of spatial intelligence. To uncover the underlying mechanisms, we conduct a layer-wise probing analysis and head-wise causal intervention. Our findings reveal that although models encode viewpoint information in the hidden states, they appear to struggle to bind the viewpoint position with corresponding observation, resulting in a hallucination in final layers. Finally, we selectively fine-tune the key attention heads identified by causal intervention to im

Authors: Zhen Yang, Ping Jian, Zhongbin Guo, Zuming Zhang, Chengzhi Li
Categories: cs.AI, cs.AI
