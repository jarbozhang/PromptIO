---
title: >-
  Parameter-Efficient Continuous-Variable Photonic Quantum Neural Networks for
  Edge Quantum AI: Demonstration in Oral Cancer Detection
url: 'https://arxiv.org/abs/2606.28252v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Akshay Bhagwan Sonawane
  - Sophie Choe
  - Lakshman Tamil
categories:
  - quant-ph
  - cs.LG
  - quant-ph
published: '2026-06-26T16:37:53Z'
fetched_at: '2026-06-29T23:02:47.156Z'
---
Early detection of oral cancer markedly improves clinical outcomes, yet specialized diagnostic tools remain scarce in low-resource settings. Smartphone-based screening is a scalable alternative but needs lightweight models that run within edge-hardware constraints. Hybrid classical-quantum architectures are emerging candidates for parameter-efficient learning, yet most rely on qubit hardware that needs cryogenic operation, unsuitable for edge deployment. Continuous-variable (CV) photonic quantum computing, which operates at room temperature, offers a complementary route. We investigate a hybrid classical-CV quantum classifier for oral cancer detection from smartphone images. The pipeline combines a MobileNetV1 feature extractor, principal component analysis to 16 dimensions, and a parameterized CV-QNN of displacement, interferometric, and Kerr gates on a photonic backend. We propose a simplified $Φ\circ D \circ U_1$ CV-QNN architecture that cuts trainable parameters 40-45% relative to the standard CV-QNN layer of Killoran et al. (2019a), and identify dimensionality-reduction and encoding-restriction strategies that mitigate barren plateaus, raising loss-gradient variance by roughly 58 orders of magnitude. Whether the simplified layer beats the full layer is width-dependent: the full layer holds a small but significant edge at two qumodes, whereas the simplified layer is significantly better at four qumodes using 44% fewer parameters. The strongest model, a four-qumode simplif

Authors: Akshay Bhagwan Sonawane, Sophie Choe, Lakshman Tamil
Categories: quant-ph, cs.LG, quant-ph
