---
title: Modular Pretraining Enables Access Control
url: >-
  https://www.alignmentforum.org/posts/43vKjWuH4goLwrFHA/modular-pretraining-enables-access-control
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-09T00:03:25.000Z'
fetched_at: '2026-07-13T23:02:41.808Z'
---
Full author list: Ethan Roland*, Murat Cubuktepe*, Erick Martinez*, Stijn Servaes, Keenan Pepper, Mike Vaiana, Diogo Schwerz de Lucena, Judd Rosenblatt, Addie Foote, Cem Anil, Alex Cloud; *Equal contribution
tldr: Frontier AI models have knowledge that could be misused for nefarious purposes. To address this risk, we introduce Gradient Routed Auxiliary Modules (GRAM), a method for isolating dangerous knowledge to specific modules within a language model. These modules can be switched on or off to control what the model knows, making it possible to restrict or extend access to the most sensitive model capabilities based on user need and trust. In our experiments, we find evidence that a single model trained in this way can approximate multiple models, each trained with a different category of dangerous data filtered out, and this ability holds for models ranging from 50M to 5B parameters. This research is preliminary and has not been applied to production models at Anthropic.
📄 Paper, 💻 Code, 🌐 Site
This work was done at AE Studio, in collaboration with Anthropic. This is a cross-post from the Anthropic Alignment science blog.
Introduction
One of the major threats from frontier AI models is the misuse of legitimately helpful knowledge for harmful tasks, such as creating biological weapons or attacking critical infrastructure. AI companies already manage this risk with a mix of defenses: training models to refuse harmful requests, running classifiers to detect and reject dangerous queries, and restricting which users can access which models through vetting and tiered deployment. Each has drawbacks. Refusals and classifiers are behavioral layers on top of knowledge the model still has; they can be jailbroken and must be retuned for every release. Tiered access works at the level of whole models and whole accounts, so it forces a coarse trade-off: either a user gets every capability the model has, or they get a weaker model across the board.
An alternative approach i
