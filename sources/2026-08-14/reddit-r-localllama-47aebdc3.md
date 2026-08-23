---
title: >-
  SenseNova-Vision: a 7B open model that does segmentation, depth, detection,
  OCR, and 3D reconstruction with no task-specific heads
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vndd6p/sensenovavision_a_7b_open_model_that_does/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-13T15:07:39.000Z'
fetched_at: '2026-08-14T11:01:32.396Z'
---
Stumbled across this new vision model, SenseNova-Vision. It's a 7B MoT model, Apache 2.0 license, which is cool. The main idea is it treats pretty much all computer vision stuff as just one generation problem. Like, instead of needing a bunch of different models for detection, segmentation, depth, whatever, this one model handles it all.
 You just give it a natural language instruction, maybe some visual hints, and it spits out text, images, or both. For text, it can do things like categories, bounding boxes, OCR, keypoints, camera angles. And for images, it's doing segmentation masks, depth maps, surface normals, even multi-view point maps. You can mix and match for more complex tasks.
 No special prediction heads or decoders, which is kinda neat. Just one set of weights, and the prompt tells it what to do.
 So it can do the usual stuff: object detection, keypoints, OCR, all kinds of segmentation (binary, instance, semantic), depth and surface normal estimation. But the really interesting bits, for me anyway, are the multi-view 3D reconstruction and camera pose estimation.
 They actually added dedicated benchmarks for those in the latest update. Usually, you'd need specialized tools like COLMAP for that kind of multi-view reconstruction from multiple images, but this model just does it with a single prompt. That's kinda wild if it works well.
 They trained it on a massive dataset, 50M instruction-response pairs, built from a bunch of different CV annotations. And it started from an existing multimodal model, so no crazy new architecture there.
 There's a web demo if you wanna mess around with it, and the weights are up on Hugging Face too.
 Just a heads up though, before you get too hyped: the full web demo needs a beefy GPU, like 1x80GB. And for benchmarking, they're talking 8x80GB. So, yeah, not really something you're gonna run on your average consumer card. It just dropped on July 8th, so probably expect some rough edges. Also, they've released the training pip
