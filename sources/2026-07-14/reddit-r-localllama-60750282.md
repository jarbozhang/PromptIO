---
title: >-
  Wan-Dancer: A Hierarchical Framework for Minute-scale Coherent Music-to-Dance
  Generation
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uvdaq7/wandancer_a_hierarchical_framework_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T14:33:59.000Z'
fetched_at: '2026-07-13T23:01:48.268Z'
---
Generating long-duration, high-definition, and rhythmically synchronized dance videos directly from music remains a significant challenge, primarily due to the temporal constraints of current diffusion models, which typically fail beyond 20 seconds. Existing approaches, whether they rely on intermediate 3D skeletons or on end-to-end video synthesis, suffer from temporal drift, identity inconsistency, and repetitive motion patterns when extended to longer horizons. To address these limitations, we propose a novel hierarchical framework for minute-scale coherent music-to-dance generation. Our method decouples the process into global keyframe planning and local temporal refinement, leveraging full-track musical context to ensure long-range coherence. Key innovations include dynamic frame rate adaptation via time-mapped RoPE embeddings for precise alignment, an optical-flow-based loss function to enhance motion continuity, and motion-speed control to preserve high-fidelity details during rapid movements. Extensive experiments demonstrate that our framework surpasses the conventional duration barrier, generating stable, 720p/30fps videos exceeding one minute with superior temporal stability. Furthermore, the model exhibits robust versatility across five distinct dance genres, conditioned on both audio and textual prompts, establishing a new state-of-the-art in coherent, long-form dance video synthesis.
  
🔥 Latest News!!
  
July 13, 2026: 💃 We introduce Wan-Dancer, a method can generate long-duration, high-quality, rhythmic dance videos from music with global structure and temporal continuity. We released the model weights and inference code. And now you can try it on ModelScope Studio or HuggingFace Space!
 
Project : https://humanaigc.github.io/wan-dancer-project/
 
GitHub : https://github.com/Wan-Video/Wan-Dancer
 
HuggingFace : https://huggingface.co/Wan-AI/Wan-Dancer-14B
 
Paper : https://arxiv.org/abs/2607.09581
 
Full Paper : https://arxiv.org/pdf/2607.09581
 
 
