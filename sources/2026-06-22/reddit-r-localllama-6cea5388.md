---
title: >-
  AllenAI releases MolmoMotion vision models for predicting future motion based
  on short frame history
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubgj8j/allenai_releases_molmomotion_vision_models_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T04:26:18.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
AllenAI just released two models in the MolmoMotion family:
 https://huggingface.co/allenai/MolmoMotion-4B-H3-F30
 https://huggingface.co/allenai/MolmoMotion-4B-H1-F32
  
MolmoMotion is a 4B vision-language model that forecasts 3D point trajectories under natural-language action instructions. Given a short RGB observation history, a set of user-specified 2D query points with their 3D history, and an action description, it predicts where those points move in 3D (camera frame, in meters) over a future horizon.
  
One model is trained on a three-frame history, and the other on a one-frame history.
 These models will be useful for any application which requires predicting objects' future positions based on past observations.
    submitted by    /u/ttkciar  
 [link]   [comments]
