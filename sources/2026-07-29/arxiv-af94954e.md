---
title: >-
  MDTransformer: A Hardware-Software Co-Design of Mode-Division Photonic
  Transformer Accelerator with Inverse-Designed Coherent Crossbar
url: 'https://arxiv.org/abs/2607.26016v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Solomon Micheal Serunjogi
  - Rachmad Vidya Wicaksana Putra
  - Ayat Taha
  - Muhammad Shafique
  - Mahmoud Rasras
categories:
  - cs.AR
  - cs.AI
  - cs.DC
  - cs.AR
published: '2026-07-28T17:27:49Z'
fetched_at: '2026-07-29T11:02:31.057Z'
---
Recently, photonic transformer accelerators (PTAs) have successfully achieved significant speedup and energy efficiency improvements over electronic accelerators for expediting Transformer inference. However, state-of-the-art rely on expensive multi-wavelength light generation and large dot-product units due to active phase-shifter components, thus making their approach inefficient and impractical. To address this, we propose MDTransformer, a novel hardware-software co-design of PTA based on mode-division optical dataflow and operations. Specifically, MDTransformer performs complex matrix operations using spatial-mode interference, that leverages the inverse-designed multi-mode couplers, crossings, and Mach-Zehnder IQ modulators into a compact mode-division photonic tensor core (MPTC), capable of executing matrix multiplications in the optical domain. Its each guided mode (i.e., TE0-TE3) acts as an independent computational lane, enabling four-fold parallelism-per-waveguide without spectral filtering or free-spectral-range limitations. Moreover, its coherent detection and IQ modulation jointly encode amplitude and phase, realizing complex-valued arithmetic for full-range operations in transformers. MDTransformer offers analog multiplication with sub-4-bit effective precision and inter-modal crosstalk below -30 dB. Its inverse-designed approach also offers scalable and full compatibility with single-laser continuous-wave operation at 1550 nm. Experimental results show that MDT

Authors: Solomon Micheal Serunjogi, Rachmad Vidya Wicaksana Putra, Ayat Taha, Muhammad Shafique, Mahmoud Rasras
Categories: cs.AR, cs.AI, cs.DC, cs.AR
