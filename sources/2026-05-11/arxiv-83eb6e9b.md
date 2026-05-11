---
title: Zero-Shot Imagined Speech Decoding via Imagined-to-Listened MEG Mapping
url: 'https://arxiv.org/abs/2605.08075v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Maryam Maghsoudi
  - Shihab Shamma
categories:
  - cs.LG
  - eess.AS
  - cs.LG
published: '2026-05-08T17:56:19Z'
fetched_at: '2026-05-11T08:20:12.070Z'
---
Decoding imagined speech from non-invasive brain recordings is challenging because imagined datasets are scarce and difficult to align temporally across subjects and sessions In this work, we propose a new approach to the decoding of imagined speech that leverages the richer and more reliably labeled recordings during listening to speech. We collected paired listened and imagined MEG recordings to rhythmic melodic and spoken stimuli from trained musicians. Using trained musicians helped improve temporal alignment across conditions. We then developed a three-stage decoding pipeline that revealed consistent and meaningful relationships between neural activity evoked by imagining and listening to the same stimuli. First, we trained six linear and neural models to map imagined MEG responses to listened responses. We evaluated these models against a null baseline from unseen subjects to validate that the predicted-listening responses preserve stimulus-specific information. In the second stage, we trained a contrastive word decoder exclusively on the listened MEG responses, and evaluated it using four embedding strategies including semantic, acoustic, and phonetic representations. In the third stage, we process the imagined MEG responses from held-out subjects through the mapping pipeline to compute the corresponding listening responses that are then decoded by the listened decoder. Using rank-based analysis, we show that the imagined words are decodable significantly above chance.

Authors: Maryam Maghsoudi, Shihab Shamma
Categories: cs.LG, eess.AS, cs.LG
