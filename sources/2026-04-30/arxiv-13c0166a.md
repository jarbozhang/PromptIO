---
title: 'MoRFI: Monotonic Sparse Autoencoder Feature Identification'
url: 'https://arxiv.org/abs/2604.26866v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Dimitris Dimakopoulos
  - Shay B. Cohen
  - Ioannis Konstas
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-04-29T16:32:57Z'
fetched_at: '2026-04-30T08:51:20.279Z'
---
Large language models (LLMs) acquire most of their factual knowledge during the pre-training stage, through next token prediction. Subsequent stages of post-training often introduce new facts outwith the parametric knowledge, giving rise to hallucinations. While it has been demonstrated that supervised fine-tuning (SFT) on new knowledge may exacerbate the problem, the underlying mechanisms are still poorly understood. We conduct a controlled fine-tuning experiment, focusing on closed-book QA, and find latent directions that causally contribute to hallucinations. Specifically, we fine-tune Llama 3.1 8B, Gemma 2 9B and Mistral 7B v03 on seven distinct single QA datasets, controlling for the percentage of new knowledge and number of training epochs. By measuring performance on the test set, we validate that incrementally introducing new knowledge increases hallucinations, with the effect being more pronounced with prolonged training. We leverage pre-trained sparse autoencoders (SAEs) to analyze residual stream activations across various checkpoints for each model and propose Monotonic Relationship Feature Identification (MoRFI) for capturing causally relevant latents. MoRFI filters SAE features that respond monotonically to controlled fine-tuning data mixtures of a target property. Our findings show that exposure to unknown facts disrupts the model's ability to retrieve stored knowledge along a set of directions in the residual stream. Our pipeline reliably discovers them across

Authors: Dimitris Dimakopoulos, Shay B. Cohen, Ioannis Konstas
Categories: cs.CL, cs.LG, cs.CL
