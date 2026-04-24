---
title: Release v5.6.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.6.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-04-22T15:52:30.000Z'
fetched_at: '2026-04-24T03:00:15.259Z'
---
Release v5.6.0
New Model additions
OpenAI Privacy Filter
OpenAI Privacy Filter is a bidirectional token-classification model for personally identifiable information (PII) detection and masking in text. It is intended for high-throughput data sanitization workflows where teams need a model that they can run on-premises that is fast, context-aware, and tunable. The model labels an input sequence in a single forward pass, then decodes coherent spans with a constrained Viterbi procedure, predicting probability distributions over 8 privacy-related output categories for each input token.
Links: Documentation
[Privacy Filter] Add model (#45580) by @vasqu in #45580
QianfanOCR
Qianfan-OCR is a 4B-parameter end-to-end document intelligence model developed by Baidu that performs direct image-to-text conversion without traditional multi-stage OCR pipelines. It supports a broad range of prompt-driven tasks including structured document parsing, table extraction, chart understanding, document question answering, and key information extraction all within one unified model. The model features a unique "Layout-as-Thought" capability that generates structured layout representations before producing final outputs, making it particularly effective for complex documents with mixed element types.
Links: Documentation | Paper
add Qianfan-OCR model definition (#45280) by @marvinzh in #45280
SAM3-LiteText
SAM3-LiteText is a lightweight variant of SAM3 that replaces the heavy SAM3 text encoder (353M parameters) with a compact MobileCLIP-based text encoder optimized through knowledge distillation, while keeping the SAM3 ViT-H image encoder intact. This reduces text encoder parameters by up to 88% while maintaining segmentation performance comparable to the original model. The model enables efficient vision-language segmentation by addressing the redundancy found in text prompting for segmentation tasks.
Links: Documentation | Paper
Add SAM3-LiteText (#44320) by @NielsRogge in #44320
SLANet
SL
