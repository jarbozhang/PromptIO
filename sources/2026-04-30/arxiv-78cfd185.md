---
title: >-
  Edge AI for Automotive Vulnerable Road User Safety: Deployable Detection via
  Knowledge Distillation
url: 'https://arxiv.org/abs/2604.26857v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Akshay Karjol
  - Darrin M. Hanna
categories:
  - cs.CV
  - cs.LG
  - cs.RO
  - eess.IV
  - cs.CV
published: '2026-04-29T16:24:45Z'
fetched_at: '2026-04-30T08:51:20.279Z'
---
Deploying accurate object detection for Vulnerable Road User (VRU) safety on edge hardware requires balancing model capacity against computational constraints. Large models achieve high accuracy but fail under INT8 quantization required for edge deployment, while small models sacrifice detection performance. This paper presents a knowledge distillation (KD) framework that trains a compact YOLOv8-S student (11.2M parameters) to mimic a YOLOv8-L teacher (43.7M parameters), achieving 3.9x compression while preserving quantization robustness. We evaluate on full-scale BDD100K (70K training images) with Post-Training Quantization to INT8. The teacher suffers catastrophic degradation under INT8 (-23% mAP), while the KD student retains accuracy (-5.6% mAP). Analysis reveals that KD transfers precision calibration rather than raw detection capacity: the KD student achieves 0.748 precision versus 0.653 for direct training at INT8, a 14.5% gain at equivalent recall, reducing false alarms by 44% versus the collapsed teacher. At INT8, the KD student exceeds the teacher's FP32 precision (0.748 vs. 0.718) in a model 3.9x smaller. These findings establish knowledge distillation as a requirement for deploying accurate, safety-critical VRU detection on edge hardware.

Authors: Akshay Karjol, Darrin M. Hanna
Categories: cs.CV, cs.LG, cs.RO, eess.IV, cs.CV
