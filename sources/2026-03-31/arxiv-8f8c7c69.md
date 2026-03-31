---
title: Adaptive Block-Scaled Data Types
url: 'https://arxiv.org/abs/2603.28765v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jack Cook
  - Hyemin S. Lee
  - Kathryn Le
  - Junxian Guo
  - Giovanni Traverso
categories:
  - cs.CL
  - cs.CL
published: '2026-03-30T17:59:33Z'
fetched_at: '2026-03-31T16:54:12.137Z'
---
NVFP4 has grown increasingly popular as a 4-bit format for quantizing large language models due to its hardware support and its ability to retain useful information with relatively few bits per parameter. However, the format is not without limitations: recent work has shown that NVFP4 suffers from its error distribution, resulting in large amounts of quantization error on near-maximal values in each group of 16 values. In this work, we leverage this insight to design new Adaptive Block-Scaled Data Types that can adapt to the distribution of their input values. For four-bit quantization, our proposed IF4 (Int/Float 4) data type selects between FP4 and INT4 representations for each group of 16 values, which are then scaled by an E4M3 scale factor as is done with NVFP4. The selected data type is denoted using the scale factor's sign bit, which is currently unused in NVFP4, and we apply the same insight to design formats for other bit-widths, including IF3 and IF6. When used to quantize language models, we find that IF4 outperforms existing 4-bit block-scaled formats, achieving lower loss during quantized training and achieving higher accuracy on many tasks in post-training quantization. We additionally design and evaluate an IF4 Multiply-Accumulate (MAC) unit to demonstrate that IF4 can be implemented efficiently in next-generation hardware accelerators. Our code is available at https://github.com/mit-han-lab/fouroversix.

Authors: Jack Cook, Hyemin S. Lee, Kathryn Le, Junxian Guo, Giovanni Traverso
Categories: cs.CL, cs.CL
