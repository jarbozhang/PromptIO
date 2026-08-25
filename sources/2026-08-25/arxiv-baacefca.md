---
title: >-
  Robustness of Anomaly Detection Models for Industrial Control Systems under
  Training-Time Data Contamination
url: 'https://arxiv.org/abs/2608.23547v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mustafa Umut Ozbek
  - Taiwo Ojo
  - Pooria Madani
  - Khalil El-Khatib
  - Li Yang
categories:
  - cs.CR
  - cs.LG
  - cs.CR
published: '2026-08-24T17:49:36Z'
fetched_at: '2026-08-25T11:02:03.407Z'
---
Machine-learning-based anomaly detection is increasingly used in industrial control systems (ICS), yet most studies assume that detector training data is trustworthy. In practice, training data may be corrupted through compromised logs, labeling errors, manipulated historian records, or unsafe retraining processes. This paper evaluates the robustness of offline ICS anomaly-detection pipelines on the Secure Water Treatment (SWaT) benchmark under training-time contamination. We assess 11 heterogeneous anomaly detectors under three contamination strategies: random injection, similarity-targeted injection, and feature-noise injection. The first two insert attack samples into the nominal training pool, while the third adds bounded Gaussian noise to selected normal training samples. These attacks are contamination-based rather than gradient-driven poisoning methods. Contamination budgets from 1% to 10% are evaluated using clean validation and test sets under a unified offline protocol. The results show that robustness is strongly model-dependent and cannot be predicted from clean-data performance alone. Injection-based contamination causes the greatest degradation, particularly for local-density and distance-based detectors, whereas feature-noise contamination has a comparatively limited effect. PCA, SVM, HBOS, and IForest remain relatively stable, while the tuned neural detectors demonstrate intermediate robustness. Overall, the findings highlight the importance of training-data i

Authors: Mustafa Umut Ozbek, Taiwo Ojo, Pooria Madani, Khalil El-Khatib, Li Yang
Categories: cs.CR, cs.LG, cs.CR
