---
title: Reference-Driven Multi-Speaker Audio Scene Generation from In-the-Wild Priors
url: 'https://arxiv.org/abs/2606.19325v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Michael Finkelson
  - Daniel Segal
  - Eitan Richardson
  - Shahar Armon
  - Nani Goldring
categories:
  - cs.SD
  - cs.AI
  - cs.CV
  - cs.SD
published: '2026-06-17T17:51:50Z'
fetched_at: '2026-06-18T08:58:17.276Z'
---
Existing multi-speaker dialogue systems bind speakers to utterances through structured supervision: per-turn tags, multi-stream transcriptions, or learnable speaker embeddings. These systems operate within speech-only pipelines that produce clean vocal sequences without the ambient texture of real conversations. We take a different approach. Our method, ScenA, conditions a text-to-audio flow-matching foundation model, pretrained on large-scale in-the-wild data, directly on multiple reference voices and a free-form natural language prompt that describes an entire multi-speaker audio scene. Leveraging such a foundational model allows us to inherit its capacity for natural, non-studio audio: background noise, room acoustics, overlapping dialogue, and spontaneous paralinguistic events, while adding multi-speaker control without any per-turn structure. Concretely, reference latents are concatenated into the model's token sequence and distinguished by lightweight identity-aware positional encodings. However, we identify a critical obstacle to this approach: the \textit{Reference Shortcut}. During training under standard noise schedules, the model can identify the matching reference by acoustic similarity to the noisy target, bypassing the text prompt entirely. We address this with a high-noise-biased timestep distribution that forces the model to rely on the text prompt for speaker assignment. We evaluate ScenA on the CoVoMix2-Dialogue benchmark, showing that it outperforms existin

Authors: Michael Finkelson, Daniel Segal, Eitan Richardson, Shahar Armon, Nani Goldring
Categories: cs.SD, cs.AI, cs.CV, cs.SD
