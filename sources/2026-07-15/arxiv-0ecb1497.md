---
title: >-
  Encoder-Side Neuron Identification and Amplification for Acoustic Perception
  in Large Audio-Language Models
url: 'https://arxiv.org/abs/2607.11801v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yu-Han Huang
  - Chih-Kai Yang
  - Ke-Han Lu
  - An-Yu Cheng
  - Hung-yi Lee
categories:
  - cs.SD
  - cs.AI
  - cs.SD
published: '2026-07-13T16:53:08Z'
fetched_at: '2026-07-14T23:03:22.243Z'
---
Large audio-language models (LALMs) often underperform on fine-grained, non-semantic attributes of speech, such as a speaker's emotion, despite strong performance on speech content. Improving this without the cost of retraining calls for an effective inference-time intervention, yet most existing methods intervene only after the audio encoder and operate at a relatively coarse granularity. The encoder itself, where acoustic information is first extracted from the waveform, remains largely unexplored, especially at the level of individual neurons. We introduce IAAN, Identifying and Amplifying Acoustic Neurons, a training-free and label-free method that scores each feed-forward neuron in the audio encoder by contrasting its activation on the real waveform with that on a noise reference lacking the real audio's acoustic information. IAAN then amplifies a small set of the highest-scoring neurons at inference. Across ten non-semantic speech attributes, IAAN improves average accuracy by 25.7 points on Audio-Flamingo-3, 21.4 on Qwen2.5-Omni, and 9.7 on Kimi-Audio. It also improves a model already explicitly fine-tuned to prioritize acoustic evidence. In controlled comparisons, both the encoder locus and neuron-level selectivity prove necessary for this gain. Intervening after the encoder, at the decoding side or inside the language model, yields little to no improvement, or even deteriorates accuracy. The improvement also depends on which specific neurons are amplified, not merely o

Authors: Yu-Han Huang, Chih-Kai Yang, Ke-Han Lu, An-Yu Cheng, Hung-yi Lee
Categories: cs.SD, cs.AI, cs.SD
