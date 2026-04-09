---
title: >-
  Measurement of Generative AI Workload Power Profiles for Whole-Facility Data
  Center Infrastructure Planning
url: 'https://arxiv.org/abs/2604.07345v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Roberto Vercellino
  - Jared Willard
  - Gustavo Campos
  - Weslley da Silva Pereira
  - Olivia Hull
categories:
  - eess.SY
  - cs.DC
  - cs.LG
  - eess.SY
published: '2026-04-08T17:56:41Z'
fetched_at: '2026-04-09T07:18:08.755Z'
---
The rapid growth of generative artificial intelligence (AI) has introduced unprecedented computational demands, driving significant increases in the energy footprint of data centers. However, existing power consumption data is largely proprietary and reported at varying resolutions, creating challenges for estimating whole-facility energy use and planning infrastructure. In this work, we present a methodology that bridges this gap by linking high-resolution workload power measurements to whole-facility energy demand. Using NLR's high-performance computing data center equipped with NVIDIA H100 GPUs, we measure power consumption of AI workloads at 0.1-second resolution for AI training, fine-tuning and inference jobs. Workloads are characterized using MLCommons benchmarks for model training and fine-tuning, and vLLM benchmarks for inference, enabling reproducible and standardized workload profiling. The dataset of power consumption profiles is made publicly available. These power profiles are then scaled to the whole-facility-level using a bottom-up, event-driven, data center energy model. The resulting whole-facility energy profiles capture realistic temporal fluctuations driven by AI workloads and user-behavior, and can be used to inform infrastructure planning for grid connection, on-site energy generation, and distributed microgrids.

Authors: Roberto Vercellino, Jared Willard, Gustavo Campos, Weslley da Silva Pereira, Olivia Hull
Categories: eess.SY, cs.DC, cs.LG, eess.SY
