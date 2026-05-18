---
title: 'RefDecoder: Enhancing Visual Generation with Conditional Video Decoding'
url: 'https://arxiv.org/abs/2605.15196v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiang Fan
  - Yuheng Wang
  - Bohan Fang
  - Zhongzheng Ren
  - Ranjay Krishna
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-05-14T17:59:52Z'
fetched_at: '2026-05-18T00:51:02.176Z'
---
Video generation powers a vast array of downstream applications. However, while the de facto standard, i.e., latent diffusion models, typically employ heavily conditioned denoising networks, their decoders often remain unconditional. We observe that this architectural asymmetry leads to significant loss of detail and inconsistency relative to the input image. To address this, we argue that the decoder requires equal conditioning to preserve structural integrity. We introduce RefDecoder, a reference-conditioned video VAE decoder by injecting high-fidelity reference image signal directly into the decoding process via reference attention. Specifically, a lightweight image encoder maps the reference frame into the detail-rich high-dimensional tokens, which are co-processed with the denoised video latent tokens at each decoder up-sampling stage. We demonstrate consistent improvements across several distinct decoder backbones (e.g., Wan 2.1 and VideoVAE+), achieving up to +2.1dB PSNR over the unconditional baselines on the Inter4K, WebVid, and Large Motion reconstruction benchmarks. Notably, RefDecoder can be directly swapped into existing video generation systems without additional fine-tuning, and we report across-the-board improvements in subject consistency, background consistency, and overall quality scores on the VBench I2V benchmark. Beyond I2V, RefDecoder generalizes well to a wide range of visual generation tasks such as style transfer and video editing refinement.

Authors: Xiang Fan, Yuheng Wang, Bohan Fang, Zhongzheng Ren, Ranjay Krishna
Categories: cs.CV, cs.LG, cs.CV
