---
title: How transparent is DiffusionGemma (and why it matters)
url: >-
  https://www.alignmentforum.org/posts/zoYXpdaMgFT43Wc24/how-transparent-is-diffusiongemma-and-why-it-matters
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-20T20:05:50.000Z'
fetched_at: '2026-06-24T01:28:01.928Z'
---
Authors: Joshua Engels*, Callum McDougall*, Bilal Chughtai*, Janos Kramar, Senthoran Rajamanoharan, Cindy Wu, Arthur Conmy, Asic Q Chen, Jean Tarbouriech, Min Ma, Brendan O'Donoghue+, João Gabriel Lopes de Oliveira+, Rohin Shah+, Neel Nanda+
*Primary Contributor
+Advising
Paper here: https://arxiv.org/abs/2606.20560

Overview
In a recent collaboration between the GDM interpretability team and the GDM text diffusion team, we performed a transparency audit of DiffusionGemma, GDM's new text diffusion model.
Overall, we find that DiffusionGemma is not significantly less transparent than Gemma.

Gemma and DiffusionGemma perform similarly on monitorability evaluations.
Although naively DiffusionGemma has a much larger opaque serial depth, we can apply the logit lens to intermediate vectors and ablate non-interpretable information without harming performance. This implies that these intermediate nodes are interpretable, which reduces the opaque serial depth to be similar to that of Gemma.

However, even though the variables that the model uses at different steps are interpretable, this does not necessarily mean that we understand the algorithm that the model uses to reach the final answer. We thus distinguish between variable transparency, which we define as whether we can understand snapshots of the model's computation, and algorithmic transparency, which we define as whether we can use these snapshots to reconstruct the process by which the model arrived at its outputs. 
By default, algorithmic transparency is much lower for a text diffusion model. In an autoregressive model, the model proceeds through its reasoning in order, token by token; when each token is generated, we know the exact state the model was in, and can make inferences about why it generated a certain token. On the other hand, in a single "canvas" a diffusion model generates all tokens at once, and the causal relationship between different tokens is unclear; a diffusion model can e.g. use tokens at the e
