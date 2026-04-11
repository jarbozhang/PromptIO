---
title: >-
  Quantifying Explanation Consistency: The C-Score Metric for CAM-Based
  Explainability in Medical Image Classification
url: 'https://arxiv.org/abs/2604.08502v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kabilan Elangovan
  - Daniel Ting
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-09T17:47:31Z'
fetched_at: '2026-04-11T01:43:18.434Z'
---
Class Activation Mapping (CAM) methods are widely used to generate visual explanations for deep learning classifiers in medical imaging. However, existing evaluation frameworks assess whether explanations are correct, measured by localisation fidelity against radiologist annotations, rather than whether they are consistent: whether the model applies the same spatial reasoning strategy across different patients with the same pathology. We propose the C-Score (Consistency Score), a confidence-weighted, annotation-free metric that quantifies intra-class explanation reproducibility via intensity-emphasised pairwise soft IoU across correctly classified instances. We evaluate six CAM techniques: GradCAM, GradCAM++, LayerCAM, EigenCAM, ScoreCAM, and MS GradCAM++ across three CNN architectures (DenseNet201, InceptionV3, ResNet50V2) over thirty training epochs on the Kermany chest X-ray dataset, covering transfer learning and fine-tuning phases. We identify three distinct mechanisms of AUC-consistency dissociation, invisible to standard classification metrics: threshold-mediated gold list collapse, technique-specific attribution collapse at peak AUC, and class-level consistency masking in global aggregation. C-Score provides an early warning signal of impending model instability. ScoreCAM deterioration on ResNet50V2 is detectable one full checkpoint before catastrophic AUC collapse and yields architecture-specific clinical deployment recommendations grounded in explanation quality rat

Authors: Kabilan Elangovan, Daniel Ting
Categories: cs.CV, cs.AI, cs.CV
