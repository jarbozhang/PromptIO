---
title: 'R-lens: Making J-lens More Faithful on Early Layers'
url: >-
  https://www.alignmentforum.org/posts/nv8oedrnLXKRzNEL9/r-lens-making-j-lens-more-faithful-on-early-layers
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-05T20:02:19.000Z'
fetched_at: '2026-08-16T11:02:06.871Z'
---
TL;DR:
We introduce the R-lens: a drop-in replacement for J-lens that produces clearer readouts on earlier layers. R-Lens is identical to J-Lens, except that we make minor and low-overhead changes to the backwards pass, following layerwise-relevance propagation, allowing us to reduce the propagation of errors. This method allows us to surface important intermediate variables more consistently and more saliently, reduce the frequency of semantically-irrelevant readouts, and even detect relevant concepts that J-lens misses entirely. We open-source our R-lenses and accompanying J-lenses here.




Introduction
Motivation
The J-lens is a powerful tool for surfacing intermediate variables in the workspace layers of a model, but we find readouts in early layers to often be noisy and largely uninterpretable. Plausibly, either J-lens is degenerate at these depths and fails to resolve content that is in fact present, or the early residual stream genuinely carries no linearly accessible, causally relevant verbalizable content.
We suspect that this is a structural issue with J-lens. J-lens is fit by backpropagating from the final-layer residual stream down to the residual stream at the readout layer. Errors are likely to accumulate over the course of layers, suggesting it may be less accurate at early layers. In this post, we ask whether we can improve on J-lens to minimize such errors and achieve cleaner, causally relevant readouts at early layers.
What is RelP and how do we apply it?
We take inspiration from Relevance Patching (RelP), a method for efficiently approximating attribution patching, a gradient based approximation to activation patching. It keeps the structure of attribution patching, which takes the dot product of an activation difference against a backward-pass, but swaps the local gradient for a propagation coefficient derived from the XAI technique of Layer-wise Relevance Propagation (LRP). LRP adds several stop gradients to the backward pass, e.g to the varian
