---
title: tencent/Hy-Embodied-RxBrain-1.0 · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ux0x0v/tencenthyembodiedrxbrain10_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T09:30:47.000Z'
fetched_at: '2026-07-15T23:01:42.665Z'
---
Introduction
 RxBrain (Hy-Embodied-RxBrain-1.0) is a unified multimodal foundation model for embodied cognition — a single model that couples language reasoning with visual imagination to deliver three core capabilities:
  
🤖 Embodied Understanding & Reasoning — question answering and chain-of-thought over images and multi-frame video.
 🔮 World State Prediction — imagine the near-future frames an action produces in the physical world.
 🧩 Joint Subgoal Planning — decompose a task into steps, emitting for each step both the next action (language) and the goal image it should reach (vision).
  
These capabilities are unified through interleaved generation: within a single autoregressive sequence RxBrain alternates reasoning text and flow-matched imagined frames — a learned <Image> token decides when to imagine — so an embodied plan couples what to do with what the world should look like, step by step.
 ⭐️ Key Features
  
🧠 Unified Mixture-of-Transformers (MoT): A ~6.2B-parameter backbone with modality-specific pathways (text / vision / generation), so understanding and image synthesis share one autoregressive model instead of separate towers.
 🎨 Flow-Matching Image Head: Imagined frames are produced by a flow-matching head decoding into a frozen FLUX VAE latent space, enabling text-to-image, multi-frame world-model rollout, and goal-image planning.
 🔗 Interleaved Reasoning + Imagination: Text reasoning and generated frames are emitted in one sequence, coupling symbolic plans with visual goals.
  
   submitted by    /u/jacek2023  
 [link]   [comments]
