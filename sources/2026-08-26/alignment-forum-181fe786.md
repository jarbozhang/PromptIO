---
title: Does DiffusionGemma do latent reasoning?
url: >-
  https://www.alignmentforum.org/posts/QBuJ3suRZxrrxSTtv/does-diffusiongemma-do-latent-reasoning
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-16T04:22:18.000Z'
fetched_at: '2026-08-26T11:02:11.066Z'
---
TL;DR
Google DeepMind's recent model DiffusionGemma (DG) generates text via diffusion, meaning many diffusion steps happen before generating the final output. In particular, these diffusion steps carry vectors in addition to tokens. If we cannot interpret these tokens and vectors, the model has significant opaque serial depth, potentially harming monitorability. Recently, Engels et al. found that DG nevertheless maintains high monitorability, for instance by showing that projecting the distribution to its top-k items largely retains performance. We strengthen these results by showing that this performance degradation is largely a sampler artifact and good performance can be maintained with only the top item, supporting the case for high monitorability. Still, we also find some rare case studies where the distribution vector is load-bearing computationally, i.e. where top-1 projection would be detrimental. However even in these cases, it just encodes superposition, remaining interpretable.
Apart from model behavior, we also examined how interpretability techniques carry over to DiffusionGemma, including probes, steering, and J-lens. We find that performance is largely retained. This is a positive update on the interpretability of diffusion models that are derived from text-pretrained LLMs (an efficient training method more likely to be deployed), but might not apply for more general paradigms.
Overall, this supports the paper's conclusion that DiffusionGemma remains highly monitorable, while nevertheless showing that there are cases where models can learn to use vector-valued information.
Github
Introduction
Large language models arrive at answers to complex questions through chains-of-thought. These chains are generated token-by-token in a sequence of autoregressive steps. This gives fairly large visibility into the model's process of arriving at the answer, and has been the main pillar for monitorability in recent years (see e.g. Guan et al.). In contrast, latent r
