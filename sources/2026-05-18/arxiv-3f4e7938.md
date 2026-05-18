---
title: 'Widening the Gap: Exploiting LLM Quantization via Outlier Injection'
url: 'https://arxiv.org/abs/2605.15152v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaohua Zhan
  - Kazuki Egashira
  - Robin Staab
  - Mark Vero
  - Martin Vechev
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-14T17:50:39Z'
fetched_at: '2026-05-18T00:51:02.183Z'
---
LLM quantization has become essential for memory-efficient deployment. Recent work has shown that quantization schemes can pose critical security risks: an adversary may release a model that appears benign in full precision but exhibits malicious behavior once quantized by users. However, existing quantization-conditioned attacks have been limited to relatively simple quantization methods, where the attacker can estimate weight regions that remain invariant under the target quantization. Notably, prior attacks have consistently failed to compromise more popular and sophisticated schemes, limiting their practical impact. In this work, we introduce the first quantization-conditioned attack that consistently induces malicious behavior that can be triggered by a broad range of advanced quantization techniques, including AWQ, GPTQ, and GGUF I-quants. Our attack exploits a simple property shared by many modern quantization methods: large outliers can cause other weights to be rounded to zero. Consequently, by injecting outliers into specific weight blocks, an adversary can therefore induce a targeted, predictable weight collapse in the model. This effect can be used to craft seemingly benign full-precision models that exhibit a wide range of malicious behaviors after quantization. Through extensive evaluation across three attack scenarios and LLMs, we show that our attack achieves high success rates against a broad range of quantization methods on which prior attacks fail. Our resu

Authors: Xiaohua Zhan, Kazuki Egashira, Robin Staab, Mark Vero, Martin Vechev
Categories: cs.LG, cs.AI, cs.LG
