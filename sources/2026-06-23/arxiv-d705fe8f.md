---
title: How Transparent is DiffusionGemma?
url: 'https://arxiv.org/abs/2606.20560v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Joshua Engels
  - Callum McDougall
  - Bilal Chughtai
  - Janos Kramar
  - Senthoran Rajamanoharan
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-06-18T17:59:46Z'
fetched_at: '2026-06-23T01:36:30.443Z'
---
LLM reasoning transparency is a critical affordance for understanding model decisions, mitigating misuse and misalignment, and debugging surprising model behaviors. However, DiffusionGemma performs a larger fraction of its computation in a continuous latent space; does this make its reasoning less transparent? We study this question by decomposing transparency into two components: variable transparency, whether we understand intermediate snapshots of a model's computational state; and algorithmic transparency, whether we can use these snapshots to reconstruct the process by which the model arrived at its outputs. Naively, DiffusionGemma has poor variable transparency: its opaque serial depth, the amount of serial computation that occurs in between interpretable model states, seems at first 28.6X higher than the corresponding autoregressive Gemma 4 model. However, we show that we can map the information flowing between denoising steps through an interpretable token bottleneck with no decrease in downstream performance. Treating these intermediate states as interpretable reduces the opaque serial depth to just 1.1X that of Gemma 4. Algorithmic transparency is harder for diffusion models than for autoregressive models because all token predictions in the canvas can change at every denoising step, giving the model the power to implement complicated distributed algorithms during the denoising process. To begin bridging this gap, we conduct a suite of interpretability case studies,

Authors: Joshua Engels, Callum McDougall, Bilal Chughtai, Janos Kramar, Senthoran Rajamanoharan
Categories: cs.LG, cs.AI, cs.LG
