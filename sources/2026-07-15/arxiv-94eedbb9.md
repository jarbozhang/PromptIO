---
title: 'StoryTeller: Training-Free Narrative Grounding for Long-Form Audio Description'
url: 'https://arxiv.org/abs/2607.11798v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seung Hyun Hahm
  - Minh T. Dinh
  - SouYoung Jin
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-07-13T16:50:03Z'
fetched_at: '2026-07-14T23:03:22.244Z'
---
Long-form audio description (AD) requires more than describing visible actions: it must preserve characters, events, relationships, and story context across scenes so that blind and low-vision (BLV) audiences can follow a film. Modern video-language models (VLMs) are effective on short clips, but they often treat each moment independently, producing descriptions that miss who characters are, why events matter, and how the current scene connects to earlier narrative context. We propose StoryTeller, a training-free framework for story-aware long-form AD. Instead of relying only on local visual cues, StoryTeller maintains a verified narrative memory that carries forward story-relevant information across scenes, enabling later descriptions to remain coherent, grounded, and contextually informative. Given only raw video and a movie title, StoryTeller can optionally retrieve public movie metadata to resolve names and story context, while accepting only facts that are supported by the video through semantic filtering and VLM verification. The method requires no subtitles, scripts, AD transcripts, aligned captions, character banks, precomputed face identities, or task-specific fine-tuning. To evaluate whether generated AD preserves narrative information, we introduce StoryAD-QA, a question-answering benchmark that tests whether a language model can answer story-context questions using only the generated descriptions. Experiments on standard AD benchmarks and diverse long-form videos 

Authors: Seung Hyun Hahm, Minh T. Dinh, SouYoung Jin
Categories: cs.CV, cs.AI, cs.CV
