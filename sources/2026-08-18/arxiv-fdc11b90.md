---
title: >-
  Data-Efficient and Interpretable Classification of Circulating Tumor Cell
  Phenotypes in Microfluidic Devices via Deep Learning
url: 'https://arxiv.org/abs/2608.16870v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Serena Su
  - Yifan Wang
  - Senwei Liang
categories:
  - cs.LG
  - cs.LG
published: '2026-08-17T17:51:49Z'
fetched_at: '2026-08-18T11:04:07.047Z'
---
Accurate classification of circulating tumor cell (CTC) phenotypes can provide valuable information for assessing metastatic potential. Label free microfluidic devices provide a hydrodynamic obstacle course that transforms subtle biophysical characteristics of CTCs, including size and deformability, into distinct kinematic trajectories. However, the highly nonlinear fluid structure interactions governing these trajectories make the inverse problem of inferring cellular phenotype from trajectory data analytically intractable. While deep neural networks (DNNs) have emerged as a powerful approach for addressing this inverse problem, their effectiveness is constrained by the limited availability of trajectory data and the lack of physical interpretability. To address these challenges, we propose an interpretable and data efficient DNN framework for trajectory based CTC classification. To mitigate the scarcity of data, we develop Subsequence (SubSeq), a targeted augmentation strategy that randomly extracts informative local trajectory segments during training to promote learning from localized patterns. We further apply Gradient Weighted Class Activation Mapping to identify the trajectory features and physical regions of the microfluidic device that drive model predictions. Experimental results demonstrate that SubSeq improves classification accuracy over the evaluated baseline and augmentation methods. Furthermore, interpretability analysis suggests that localized trajectory segm

Authors: Serena Su, Yifan Wang, Senwei Liang
Categories: cs.LG, cs.LG
