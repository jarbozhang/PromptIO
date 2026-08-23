---
title: >-
  SenseNova-U1-8b-MoT-Infographic-V2 (released yesterday) - An open source SOTA
  beast for infographic design and image editing.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ul7za1/sensenovau18bmotinfographicv2_released_yesterday/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T04:22:38.000Z'
fetched_at: '2026-07-02T23:00:55.715Z'
---
I’m pretty jaded like most of y’all. I don’t really get excited by new models much anymore. Last few weeks have been kinda meh to be honest. Monday, I stumbled upon SenseNova’s Mixture of Transformers models and they seem kinda like a different animal than other typical image gen models.
 I managed to get a couple of them running and I have to say that this series of models is impressing me when it comes to generating and editing dense infographics. 
 I haven’t seen anything except for Ideogram 4 get close to what these can make in terms of infographics. While Ideogram 4 is great, Ideogram’s license sucks, SenseNova is Apache 2, so that puts them over the top when going head-to-head in my book. 
 Now I know, I know, the latest SenseNova-u1 version 2 is not in GGUF form yet, but that’s not a problem. What I did and what you can do is tell your favorite coding harness to “take the SenseNova model and wrap it in a FastAPI wrapper and serve it as both an OpenAi-compatible image generation endpoint and a image editing endpoint in a single docker container” and let that cook for a while and boom, Bob’s your uncle. In a bit you’ll have you an image generation API endpoint that you can point your favorite chat client to as an image generator / editor. This will let you skip all that ComfyUI spaghetti-looking interface bullshit. I’ve never been a fan of ComfyUI and don’t think I ever will. Change my mind. 
 There are several different versions of the SendeNova U1 models that you can try. If you want to. 
 Infographic V2 just came out a couple days ago and is the 50 Step base model. By the way it can make pretty much any image, it’s just trained to do infographics really well. 
 https://huggingface.co/sensenova/SenseNova-U1-8B-MoT-Infographic-V2
 Infographic V1 8 Step LORA is like a lower-quality “flash” type model merge that is super speedy but not as high quality obviously because 8 steps is less than 50 (duh).
 https://huggingface.co/sensenova/SenseNova-U1-8B-MoT-LoRAs/blo
