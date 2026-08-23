---
title: >-
  KLQ: Training-free measured rotation quantization. Beats all training-free
  rotation-based quantization methods on W4A4KV4-bits. Llama 3.2 1B
  KLQ-quantized beats SpinQuant and gets close to ReSpinQuant
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vk2n2k/klq_trainingfree_measured_rotation_quantization/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T22:01:46.000Z'
fetched_at: '2026-08-10T11:01:36.121Z'
---
First of all, I'm not a lab, this was a solo summer research project that finally culminated into the github repo and the writeup. The repo includes a much deeper dive with methods, findings about quantization and geometry, limitations, and proposed experiments. I'll also mention that this is far from production-grade, it's mostly a theoretical framework with a "fake" quantization demo as it lacks real kernels.
 The geometry of LLMs embedding spaces is highly uneven with a few features having the most magnitude, this has been known for years by now and it's in great part why rotation-based quantizers do so well against uniform quantization: While uniformly quantizing tries to allocate bits evenly in a naturally uneven space, rotations can forcefully make that space even again so uniformly allocating bits is the best strategy (DuQuant, 2nd half of ResQ, QuaRot...). Generic rotations (Hadamard) even the space out on average but can't match a specific model's geometry, leaving residual damage. This can be fixed by using learnable rotations (SpinQuant, ReSpinQuant) but this is computationally intensive as it requires extensive post-training gradient descent.
 KLQ takes a different approach to quantization, instead of trying to make the space even and then quantize uniformly. KLQ measures how uneven the space is, ranks directions of the eigenbasis from most important to least important, and with a price function treating each direction as a independent information transmission channels uses the provably optimal (under some idyllic assumptions about damage anyways) waterfilling algorithm to give the most bit-width to the most important directions and least bit-width to least important directions.
 Another thing that sets KLQ apart is the use of causal KL damage measurements, there are a few quantization algorithms that do try to measure the space and then quantize unevenly. CoQuant, for example, does measure the activation space, but then ranks directions by magnitude/var
