---
title: Does FLAIR super-resolution erase or hallucinate small white-matter lesions?
url: 'https://arxiv.org/abs/2608.06311v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zahra Khodakarami
  - Yue Li
  - Pulkit Khandelwal
  - John Detre
  - Sandhitsu Das
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-08-06T17:26:01Z'
fetched_at: '2026-08-07T11:01:42.593Z'
---
White matter hyperintensities (WMH), bright regions on Fluid-attenuated Inversion Recovery (FLAIR) scans are associated with cerebrovascular pathology and neurodegeneration. FLAIR is usually acquired with thick slices in clinical settings, giving it poor through-plane resolution. Super-resolution (SR) is a widely used method for recovering an isotropic volume from an anisotropic scan. Yet whether applying it prior to WMH segmentation preserves lesion content remains unknown: a model may erase small real lesions or hallucinate absent ones. We used 1-mm isotropic high-resolution (HR) FLAIR scans from 29 individuals in the ADNI cohort, each manually segmented for WMH by an expert. Then, we degraded each to simulated 3 and 5 mm through-plane acquisitions. Multi-contrast implicit neural representation (INR), a single-contrast self-supervised model (ECLARE), and cubic interpolation were used to upsample them onto the HR grid. WMH segmentation from a simulated thick slice and the original HR FLAIR set the floor and ceiling, respectively, for the per-lesion analysis. Of four WMH segmentation methods (WMH-SynthSeg, segcsvd, MARS-WMH, TrUE-Net), we ran the analysis under the most sensitive one to small lesions on HR (MARS-WMH) with the evaluation metrics of detection sensitivity, erasure rate (HR-detected lesions lost after reconstruction), and hallucination rate (predicted components absent from both the manual and HR segmentation). The dominant effect of SR was erasure of small real 

Authors: Zahra Khodakarami, Yue Li, Pulkit Khandelwal, John Detre, Sandhitsu Das
Categories: cs.CV, cs.AI, cs.CV
