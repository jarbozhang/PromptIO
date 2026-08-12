---
title: 'AlbumentationsX: One Augmentation Pipeline for Images and Related Annotations'
url: 'https://arxiv.org/abs/2608.11123v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Vladimir Iglovikov
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-08-11T16:34:47Z'
fetched_at: '2026-08-12T11:02:39.401Z'
---
Augmentation can corrupt a training example when an image and its annotations receive different random changes. A crop must use the same coordinates for the image, mask, boxes, keypoints, stereo views, video frames, or volume. Code paths that choose these values separately can silently misalign the data. AlbumentationsX keeps the transform list, probabilities, annotation settings, and random seed in one Compose object. Each call chooses random values once and applies them to every supported part of the training example. The library keeps each object's mask, box, and label together and lets projects add their own transforms. It can also save the pipeline definition, show what happened in one call, and run that call again. The examples place Compose after files have been decoded into arrays and before PyTorch groups examples into a batch. AlbumentationsX executes the declared transforms. Practitioners still decide whether a flip, crop, color change, or other operation preserves the correct label for their task.

Authors: Vladimir Iglovikov
Categories: cs.CV, cs.LG, cs.CV
