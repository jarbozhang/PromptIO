---
title: >-
  Uncertainty-Aware Structured Data Extraction from Full CMR Reports via
  Distilled LLMs
url: 'https://arxiv.org/abs/2605.08045v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yi Yu
  - Parker Martin
  - Zhenyu Bu
  - Yixuan Liu
  - Yi-Yu Zheng
categories:
  - cs.CL
  - cs.CL
published: '2026-05-08T17:35:41Z'
fetched_at: '2026-05-11T08:20:12.073Z'
---
Converting free-text cardiac magnetic resonance (CMR) reports into auditable structured data remains a bottleneck for cohort assembly, longitudinal curation, and clinical decision support. We present CMR-EXTR, a lightweight framework that converts free-text CMR reports into structured data and assigns per-field confidence for quality control. A teacher-student distillation pipeline enables fully offline inference while limiting manual annotation. Uncertainty integrates three complementary principles -- distribution plausibility, sampling stability, and cross-field consistency -- to triage human review. Experiments show that CMR-EXTR achieves 99.65% variable-level accuracy, demonstrating both reliable extraction and informative confidence scores. To our knowledge, this is the first CMR-specific extraction system with integrated confidence estimation. The code is available at https://github.com/yuyi1005/CMR-EXTR.

Authors: Yi Yu, Parker Martin, Zhenyu Bu, Yixuan Liu, Yi-Yu Zheng
Categories: cs.CL, cs.CL
