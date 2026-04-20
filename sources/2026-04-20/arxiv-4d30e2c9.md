---
title: Information Router for Mitigating Modality Dominance in Vision-Language Models
url: 'https://arxiv.org/abs/2604.16264v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seulgi Kim
  - Mohit Prabhushankar
  - Ghassan AlRegib
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-04-17T17:20:42Z'
fetched_at: '2026-04-20T05:39:43.393Z'
---
Vision Language models (VLMs) have demonstrated strong performance across a wide range of benchmarks, yet they often suffer from modality dominance, where predictions rely disproportionately on a single modality. Prior approaches primarily address this issue by steering model's attention allocation, implicitly assuming that all modalities provide sufficient information. However, attention only determines where the model focuses, and cannot enrich information that is missing or ambiguous. In the real world, input modalities often differ in information density and their signal-to-noise ratios. In such cases, simply adjusting model's attention does not resolve the underlying lack of information. In this paper, we propose \textsc{MoIR}: \textit{Multi-modal Information Router}, an information-level fusion method that explicitly reduces information disparity prior to fusion. \textsc{MoIR} identifies less informative tokens and routes complementary information from a stronger modality, constructing information-dense token representations before they are processed by a large language model. By modifying information availability, \textsc{MoIR} enables reliable shifts in modality dominance, even when one modality is degraded. We evaluate \textsc{MoIR} on three widely used multi-modal benchmarks across multiple model backbones. Experimental results show that \textsc{MoIR} consistently demonstrates more balanced modality contribution, and improves robustness and downstream performance, p

Authors: Seulgi Kim, Mohit Prabhushankar, Ghassan AlRegib
Categories: cs.CV, cs.LG, cs.CV
