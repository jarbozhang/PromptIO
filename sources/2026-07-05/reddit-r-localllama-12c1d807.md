---
title: '[Paper] GEAR: Guided End-to-End AutoRegression for Image Synthesis'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1un9955/paper_gear_guided_endtoend_autoregression_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T13:35:08.000Z'
fetched_at: '2026-07-04T23:01:32.107Z'
---
Visual generative models are typically trained in two stages. A tokenizer is first trained for reconstruction and then frozen, after which a generator is trained on its discrete indices or continuous latents. This decoupling leaves the tokenizer unaware of what the generator finds easy to model. We present GEAR (Guided End-to-end AutoRegression), which trains a vector-quantized (VQ) tokenizer and an autoregressive (AR) generator jointly and end-to-end, guided by representation alignment. The key obstacle is that the VQ index fed to the AR model is non-differentiable, so gradients cannot reach the tokenizer, and a straight-through estimator collapses. GEAR resolves this with a dual read-out of the codebook assignment. A hard, one-hot branch trains the AR with next-token prediction, while a differentiable soft branch carries a representation-alignment loss that flows back to guide only the tokenizer. The AR model thereby steers its tokenizer toward an index distribution it can predict more easily. This shifts the alignment burden from the tokenizer to the AR: the tokenizer's own features become less DINOv2-like while the AR's become more so, the opposite of diffusion-side recipes that make the latent itself semantic. GEAR speeds up ImageNet gFID convergence by up to 10x relative to the strong LlamaGen-REPA baseline, learns markedly better patch-level and spatially-coherent features, and generalizes across quantizers (VQVAE, LFQ, IBQ) and to text-to-image generation.
  
✨ Highlights
 
  
🔗 Guided end-to-end. The soft-assignment bridge lets the AR guide the tokenizer, succeeding exactly where the straight-through estimator collapses; the next-token loss never touches the tokenizer.
 🔄 Alignment flips to the AR. Opposite of diffusion-side REPA (REPA-E / VA-VAE): the tokenizer becomes less DINOv2-like and lower-entropy, while the AR's per-patch features track DINOv2 far more closely — reconstruction preserved.
 ⚡ Faster & better. ~10× faster ImageNet gFID convergence; o
