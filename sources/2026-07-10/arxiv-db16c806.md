---
title: >-
  ECGLight: Compute-Light Framework For Paper ECG Digitization and Myocardial
  Infarction Screening
url: 'https://arxiv.org/abs/2607.07683v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shreyasvi Natraj
  - Cyrus Achtari
  - Felice Gragnano
  - Andrea Milzi
  - Marco Valgimigli
categories:
  - cs.LG
  - cs.LG
published: '2026-07-08T17:42:00Z'
fetched_at: '2026-07-09T23:02:05.095Z'
---
Electrocardiography (ECG) is one of the most widely used tests for diagnosing cardiovascular disease. Yet several remote clinics still utilize paper ECG printouts for their analysis due to limited connectivity and computational capacity. As a result, vast numbers of physical ECGs obtained in remote areas still remain incapable of being accessed by contemporary artificial-intelligence (AI)-based decision support as they require high computational resources or strong high-speed internet connectivity. This causes several cases where conditions like acute coronary occlusion (ACS) is overlooked and reperfusion therapy delayed. Although prior work has tackled digitization and diagnosis separately, and utilized advanced AI models for them, there still remains a lack of a compute-light, on-device framework that reconstructs paper ECGs at high fidelity, while accurately supporting multiple clinically relevant endpoints. We address this need with an end-to-end lightweight on-device digitization-to-diagnosis pipeline that converts a smartphone photo or scan of a paper ECG into a calibrated 12-lead signal and screens for Myocardial Infarction (MI) pathologies, with SHapley Additive exPlanations (SHAP) to support interpretability. Trained and evaluated on 21,799 ECGs from the PTB-XL dataset and further validated on hospital-acquired ECG-Matrix dataset, the complete system runs in &lt;30 s per ECG on CPU-only resources, achieving 95.51% accuracy (F1 = 0.9519) for MI detection on PTB-XL and

Authors: Shreyasvi Natraj, Cyrus Achtari, Felice Gragnano, Andrea Milzi, Marco Valgimigli
Categories: cs.LG, cs.LG
