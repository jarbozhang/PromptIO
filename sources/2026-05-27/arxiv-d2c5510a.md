---
title: Channel-wise Vector Quantization
url: 'https://arxiv.org/abs/2605.26089v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wei Song
  - Tianhang Wang
  - Yitong Chen
  - Tong Zhang
  - Zuxuan Wu
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-05-25T17:52:08Z'
fetched_at: '2026-05-27T01:19:09.167Z'
---
We present Channel-wise Vector Quantization (CVQ), a novel image tokenization paradigm that replaces patch-wise tokens with channel-wise tokens. Unlike conventional vector quantization, which assigns a discrete token to each patch feature vector, CVQ quantizes each channel of the feature map. This formulation represents an image as discrete levels of visual details, rather than as a grid of spatial patches. Based on CVQ, we introduce a new visual autoregressive framework with "next-channel prediction". Instead of rendering images patch by patch in raster order, our Channel-wise Autoregressive (CAR) model predicts image channels sequentially, producing progressively enriched visual details. Specifically, it first sketches global structure and then refines fine-grained attributes, akin to a human artist's workflow. Empirically, we show that: (1) CVQ achieves 100% codebook utilization with a 16K+ codebook size without any bells and whistles, and substantially improves reconstruction quality over conventional VQ; and (2) CAR attains a DPG score of 86.7 and a GenEval score of 0.79, demonstrating strong effectiveness for text-to-image generation.

Authors: Wei Song, Tianhang Wang, Yitong Chen, Tong Zhang, Zuxuan Wu
Categories: cs.CV, cs.AI, cs.CV
