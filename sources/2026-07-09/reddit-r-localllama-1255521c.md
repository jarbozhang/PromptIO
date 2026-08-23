---
title: Complete local model asset generation pipeline
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ur1mim/complete_local_model_asset_generation_pipeline/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T18:42:49.000Z'
fetched_at: '2026-07-08T23:01:51.283Z'
---
So I figured I'd update the community given I just shipped a nice little feature set and feel like sharing it finally :)
 In the past few weeks, I've been test-coding an isometric RPG game/engine in Three.js, as part of my research into how LLMs work at scale in higher quality projects written from scratch (spoiler: they don't, even the SOTA ones). For that, I needed a complete team of virtual creators ;) and working through the Python pipelines for all those models is insanely frustrating (bonus points for doing that on a Strix Halo box), so I decided to port that to GGML.
 Fortunately, for AceStep I didn't have to do anything since u/webdelic made an AceStep.cpp already (https://www.reddit.com/r/LocalLLaMA/comments/1ry1dy1/acestepcpp_portable_c17_implementation_of_acestep), so all I had to do was to add some CIs for building artifacts on my fork. But I did port three other things:
 https://github.com/pwilkin/openmoss <= OpenMOSS, a family of killer open source TTS models that have full cloning + voice generation capability - excellent for creating voices for NPC characters
 https://github.com/pwilkin/thinksound.cpp <= an oft overlooked aspect of game generation - SFX generation. Voice generation models don't do SFX, I looked a bit for this one, but ThinkSound is quite a nice option.
 https://github.com/pwilkin/trellis.cpp <= the current SOTA for open-source 3D generation models, Trellis.2, together with an implementation of the background removal model
 All of those are standalone tools you can use for asset generation, but there's more! Thanks to the great folks at Lemonade who reached out to me for a little cooperation, the entirety of those features (summarized here: https://github.com/lemonade-sdk/lemonade/issues/2529 ) are now going to be available in the newest build of Lemonade. This includes nice stuff such as cascading model calls (Trellis.2 is an image-to-3D model, but you can cascade your favorite text-to-image model that uses the stablediffusion.cpp en
