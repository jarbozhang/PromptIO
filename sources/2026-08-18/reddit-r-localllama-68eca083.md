---
title: >-
  [Paper] Intern-S2-Mobius: Foundation Model with Decoupled Knowledge and
  Reasoning
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vqrf6p/paper_interns2mobius_foundation_model_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-17T12:49:03.000Z'
fetched_at: '2026-08-18T11:02:01.163Z'
---
We introduce Mobius-v0, an architecture that comprises a globally shared Memory (FFN) that stores knowledge vectors and multiple Reasoners (Self-Attn) that iteratively achieve compositional reasoning. Using hidden states as cache and carrier, reasoners repeatedly query memory for required knowledge-vectors, while the knowledge is transmitted back to reasoning operators. Through this knowledge-reasoning-separation architecture, Mobius achieves better knowledge compression and reasoning efficiency. Built upon Mobius-v0 architecture: 1) Our 7B model trained-from-scratch achieves similar downstream score as a 7B Transformer baseline with 62.6% of baseline's training data. 2) Our Intern-S2-Mobius, continually-pretrained from Qwen3.5-35B, achieves similar downstream score while delivering nearly 4x end-to-end inference speedup.
  
 arXiv : https://arxiv.org/abs/2608.14290
 PDF : https://arxiv.org/pdf/2608.14290
 GitHub : https://github.com/InternLM/Intern-S2-Mobius
 HuggingFace : https://huggingface.co/internlm/Intern-S2-Mobius
  
   submitted by    /u/pmttyji  
 [link]   [comments]
