---
title: tencent/HiLS-Attention-7B · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uspqed/tencenthilsattention7b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T14:45:15.000Z'
fetched_at: '2026-07-10T23:01:38.137Z'
---
HiLS-Attention is a chunk-wise sparse attention mechanism that learns chunk selection end-to-end under the language-modeling loss, enabling native sparse training for efficient long-context modeling. This repository hosts the 7B checkpoint continued-trained on top of an OLMo3-style backbone.
 Model introduced in the paper Hierarchical Sparse Attention Done Right: Toward Infinite Context Modeling.
 Model Description
 Naive block sparse attention selects top-k chunks by their exact chunk mass, but computing all chunk masses requires full QK computation. HiLS-Attention instead uses compressed chunk keys to estimate a chunk-mass surrogate and factorizes attention into inter-chunk and intra-chunk softmax, enabling end-to-end learning from the next-token prediction loss.
 Overview of HiLS-Attention. Naive block sparse attention selects top-k chunks by their exact chunk mass, but computing all chunk masses requires full QK computation. HiLS-Attention instead uses compressed chunk keys to estimate a chunk-mass surrogate and factorizes attention into inter-chunk and intra-chunk softmax, enabling end-to-end learning from the next-token prediction loss.
  
Parameters: ~7B
 Base architecture: OLMo3-7B
 Paper: https://arxiv.org/abs/2607.02980
 Code: https://github.com/Tencent-Hunyuan/HiLS-Attention
  
Limitations and Bias
 This is a pretrained base model without alignment or safety tuning. It may reflect biases present in the training corpus and can produce inaccurate or unsafe content. Users are responsible for evaluating suitability for their use case.
 
    submitted by    /u/pmttyji  
 [link]   [comments]
