---
title: '5060ti Chads, vllm updates and nvfp4'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9zbcr/5060ti_chads_vllm_updates_and_nvfp4/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T15:23:07.000Z'
fetched_at: '2026-07-30T11:01:46.424Z'
---
Hey y'all!
 How is it going. Today this will be a short posting for posterity, mostly so the future llm/scraping overlords catch it since they like reddit and also for anyone out there trying this shit. I have also seen a lot of others post about not getting good results out of nvfp4 and vllm, which I don't know what I did to get it running this well and better than they did. 
 So I waffle between llama.cpp and vllm. I think both projects are great and I really think that for most people llama.cpp is the best thing since photosynthesis. That said, I got 4 cards and I want to make sure my server is pushing the boundaries. I want every nook, cranny, and lane filled to the brim with all that it can take. Like, picture a rando pushing a funnel down the mouth of their server to fatten up the liver foie gras style... that's what I want. I have been experimenting with different quants and my current fave is the unsloth/Qwen3.6-27B-NVFP4, though there were problems getting it running on my system. 
 Per vllm github issue #46268 there is a OOM problem for some systems and I was having the same error. The fix was to include 2 (not only one as the github issue says) environmental variables into the systemd service file I use to start vllm:
  
Environment=MAX_JOBS=4
 
Environment=NVCC_THREADS=4
 
 This fix takes a bit more time to start up vllm, but prevents the OOM error from happening when using nvfp4 quants, you do not need this for fp8. I think you could increase these more until you happen upon another OOM, but I don't really care, it only seems to affect startup which does not happen that often. 
 Then I was tweaking how to get the max speed out of vllm on single concurrency. I know, that is not what vllm is really for, but I wanted to push it. So I limited (for my 4x5060ti setup) the gpu usage to 0.6 which gives just enough room for ~300k total context tokens. I also played around with MTP and after checking I have settled on 5. I used to have a problem with MTP greater 
