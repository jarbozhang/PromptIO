---
title: >-
  How Robust is OCR-Reasoning? Evaluating OCR-Reasoning Robustness of
  Vision-Language Models under Visual Perturbations
url: 'https://arxiv.org/abs/2606.26041v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuxing Cheng
  - Yuan Wu
  - Yi Chang
categories:
  - cs.CV
  - cs.CL
  - cs.CV
published: '2026-06-24T17:15:42Z'
fetched_at: '2026-06-25T07:41:52.278Z'
---
Vision-language models (VLMs) have achieved strong performance on OCR-based benchmarks and increasingly focused on text-rich understanding, but their robustness under controlled visual degradation remains insufficiently understood. This gap is critical for OCR reasoning, where visual corruption can induce OCR errors and structural distortions, thereby introducing uncertainty into the reasoning task. To systematically study this problem, we introduce OCR-Robust, a benchmark designed for evaluating OCR reasoning robustness under visual perturbations. It contains 812 samples across two complementary subsets: OCR1.0, covering documents, scene text, receipts, handwriting, and mathematical content, and OCR2.0, focusing on charts, geometry diagrams, and tables. To enable efficient yet informative evaluation, we conduct a pilot study over 18 candidate perturbations and select 5 representative types at 3 severity levels each based on their impact and cross-model discriminability. We evaluate robustness using clean accuracy, Relative Corruption Retention (RCR), Worst-Case Retention (WCR), and a composite Corruption Robustness Index (CRI), and benchmark 18 models spanning proprietary systems, open-source VLMs, and OCR+LLM pipelines. Our results show that higher clean accuracy does not necessarily imply stronger robustness, and that models can suffer pronounced degradation in the worst case on OCR tasks that are sensitive to structure, and charts and tables are substantially more fragile

Authors: Yuxing Cheng, Yuan Wu, Yi Chang
Categories: cs.CV, cs.CL, cs.CV
