---
title: 'The Character Error Vector: Decomposable errors for page-level OCR evaluation'
url: 'https://arxiv.org/abs/2604.06160v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jonathan Bourne
  - Mwiza Simbeye
  - Joseph Nockels
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-04-07T17:56:06Z'
fetched_at: '2026-04-08T02:58:13.562Z'
---
The Character Error Rate (CER) is a key metric for evaluating the quality of Optical Character Recognition (OCR). However, this metric assumes that text has been perfectly parsed, which is often not the case. Under page-parsing errors, CER becomes undefined, limiting its use as a metric and making evaluating page-level OCR challenging, particularly when using data that do not share a labelling schema. We introduce the Character Error Vector (CEV), a bag-of-characters evaluator for OCR. The CEV can be decomposed into parsing and OCR, and interaction error components. This decomposability allows practitioners to focus on the part of the Document Understanding pipeline that will have the greatest impact on overall text extraction quality. The CEV can be implemented using a variety of methods, of which we demonstrate SpACER (Spatially Aware Character Error Rate) and a Character distribution method using the Jensen-Shannon Distance. We validate the CEV's performance against other metrics: first, the relationship with CER; then, parse quality; and finally, as a direct measure of page-level OCR quality. The validation process shows that the CEV is a valuable bridge between parsing metrics and local metrics like CER. We analyse a dataset of archival newspapers made of degraded images with complex layouts and find that state-of-the-art end-to-end models are outperformed by more traditional pipeline approaches. Whilst the CEV requires character-level positioning for optimal triage, thr

Authors: Jonathan Bourne, Mwiza Simbeye, Joseph Nockels
Categories: cs.CV, cs.LG, cs.CV
