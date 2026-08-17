---
title: Approximate Muon with low-rank adapters
url: 'https://arxiv.org/abs/2608.14492v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ben Anson
  - Conor Houghton
  - Edward Milsom
categories:
  - cs.LG
  - cs.LG
published: '2026-08-14T17:07:37Z'
fetched_at: '2026-08-17T11:03:44.074Z'
---
The Muon optimizer shows clear benefits versus alternatives when pretraining neural networks. However, it is used less frequently for parameter-efficient fine-tuning (PEFT). One potential reason is that the most common PEFT method, LoRA, does not naturally combine with Muon since it is not mathematically possible to orthogonalize the weight update given by a low-rank parameterization. In this paper, we address this issue by approximating the solution to a relaxed Muon objective in the low-rank setting via linearization and then least-squares. We provide an efficient implementation that uses matmul operations only, as opposed to more complex linear algebra decomposition routines. Our method, sMuon (small Muon), performs favourably across SFT and a ReLoRA pretraining experiment. While results are model- and eval-dependent, we find overall that using Muon for low-rank fine-tuning provides moderate performance improvements.

Authors: Ben Anson, Conor Houghton, Edward Milsom
Categories: cs.LG, cs.LG
