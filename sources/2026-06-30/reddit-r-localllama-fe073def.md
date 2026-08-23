---
title: >-
  Locally running mode turns an Image into a Cute Controllable Character you can
  Play as
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uicq8x/locally_running_mode_turns_an_image_into_a_cute/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T23:55:24.000Z'
fetched_at: '2026-06-29T23:01:34.481Z'
---
This is a sequel to my last post here !! It meant a lot to have such positive feedback last time.
 This is the 800M version of the previous model. It still has a LOT of issues but the promise is the same. Working comfortably on consumer GPUs
 The context is increased to 12 latent frames. The wierd flashes of last time are gone. Stability is much better although consistency is horrible. I'm hoping to fix that in next iteration. the 500M model gets over 60 fps on a RTX 5090 now.
 The architecture is still the same , I mostly just fattened the MLP. Again the de noiser is trained from scratch with diffusion forcing
 LLMs sample just 1 token every forward pass and add it to the KV cache. So the KV Cache is where the "context" lives
 Diffusion Models work more based on guidance. Noise in -> model does a round of denoising
 So the idea in models like mine is causal diffusion . We do a de noising loop for each frame but then add it to the KV cache too. So the KV cache is a store of all past frames.
 However because we only trained till like 20-30 latent frames (approx 80-120 pixel frames because of the pretrained VAE I use) I have to use a sliding window in the KV cache and evict intermediate useless frames so the model still thinks "yes I can work with a context I was trained with, not more"
 I've been putting out a lot of videos, pretty much everything I try on a subrdit I made called lucidmlx 
    submitted by    /u/lucidml_lover  
 [link]   [comments]
