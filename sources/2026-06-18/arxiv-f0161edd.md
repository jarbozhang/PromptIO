---
title: >-
  Confidence is Not Reliability: Rethinking MC Dropout in Brain Tumour
  Segmentation
url: 'https://arxiv.org/abs/2606.19300v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xin Ci Wong
  - Duygu Sarikaya
  - Kieran Zucker
  - Marc De Kamps
  - Nishant Ravikumar
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-06-17T17:24:41Z'
fetched_at: '2026-06-18T08:58:17.278Z'
---
Glioma segmentation in multiparametric MRI is a critical component of treatment planning. A segmentation model that fails silently on treatment-critical sub-regions represents a patient safety risk that overlap-based metrics such as Dice scores cannot expose. We ask whether voxel-level uncertainty estimation via Monte Carlo (MC) Dropout can reliably identify segmentation errors in clinically critical sub-regions, and whether calibration failure modes are detectable from standard reporting metrics alone. In an empirical two-model case study on 126 BraTS21 patients, we evaluate a high-performance pretrained SegResNet and a locally trained UNet with residual units (UNet-Res). MC dropout preserved segmentation accuracy ($|Δ\text{Dice}|$ $&lt;0.01$) while achieving strong uncertainty-error alignment (AUROC for entropy (H) $\approx$0.97), indicating uncertainty correctly ranks erroneous voxels above correct ones. Entropy-based patient stratification identified a high-uncertainty subgroup with substantially lower segmentation performance (median whole-tumour Dice $0.835$ vs. $0.925$), supporting uncertainty as a practical triage signal. However, global alignment can mask important region-specific differences. Despite similar AUROC, UNet-Res exhibited near-zero enhancing tumour entropy ($0.054$) and Expected Calibration Error (ECE) of $0.915$, with a Dice of only $0.714$, indicating severely miscalibrated confidence on the most clinically critical sub-region, a failure mode invisible

Authors: Xin Ci Wong, Duygu Sarikaya, Kieran Zucker, Marc De Kamps, Nishant Ravikumar
Categories: cs.CV, cs.LG, cs.CV
