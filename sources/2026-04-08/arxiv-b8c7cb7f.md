---
title: 'PoM: A Linear-Time Replacement for Attention with the Polynomial Mixer'
url: 'https://arxiv.org/abs/2604.06129v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - David Picard
  - Nicolas Dufour
  - Lucas Degeorge
  - Arijit Ghosh
  - Davide Allegro
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-07T17:40:37Z'
fetched_at: '2026-04-08T02:58:13.564Z'
---
This paper introduces the Polynomial Mixer (PoM), a novel token mixing mechanism with linear complexity that serves as a drop-in replacement for self-attention. PoM aggregates input tokens into a compact representation through a learned polynomial function, from which each token retrieves contextual information. We prove that PoM satisfies the contextual mapping property, ensuring that transformers equipped with PoM remain universal sequence-to-sequence approximators. We replace standard self-attention with PoM across five diverse domains: text generation, handwritten text recognition, image generation, 3D modeling, and Earth observation. PoM matches the performance of attention-based models while drastically reducing computational cost when working with long sequences. The code is available at https://github.com/davidpicard/pom.

Authors: David Picard, Nicolas Dufour, Lucas Degeorge, Arijit Ghosh, Davide Allegro
Categories: cs.CV, cs.AI, cs.CV
