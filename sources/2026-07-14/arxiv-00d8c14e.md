---
title: Toward Real-Time Sentence-Level Sign Language Translation
url: 'https://arxiv.org/abs/2607.09611v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Thanh-Hoang Nguyen Doan
categories:
  - cs.CL
  - cs.CL
published: '2026-07-10T17:11:03Z'
fetched_at: '2026-07-13T23:03:29.911Z'
---
Most sign language understanding systems operate at the level of isolated signs, limiting their usefulness in natural communication. We study sentence-level sign language translation (SLT) with the primary goal of real-time deployment rather than proposing a new translation architecture. We fine-tune a SHuBERT-ByT5 translation stack on a uniformly sampled 9,872-example subset of How2Sign, selected because of compute and storage constraints, using QLoRA while keeping SHuBERT frozen. The model obtains a validation BLEU of 16.7 and, on the test split, BLEU 15.9 and BLEURT 44.7. The main contribution is a hardware-aware streaming system: a Raspberry Pi 4B reference client provides camera capture, local text display, and speech output, while compute-intensive perception and translation run on a CPU/GPU backend. The capture protocol remains client-agnostic, so the same backend can serve a browser, phone, or laptop. Chunked ingestion, bounded queues, parallelized perception, temporal reordering, and a sentence-boundary state machine reduce mean post-finalization response latency from 1.873 to 1.354 seconds (27.71%) and P95 latency from 2.919 to 2.130 seconds (27.03%) over the complete 9,872-example working subset.

Authors: Thanh-Hoang Nguyen Doan
Categories: cs.CL, cs.CL
