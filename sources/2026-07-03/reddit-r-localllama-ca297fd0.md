---
title: >-
  openlumara, my manually coded super-token-efficient harness, now works across
  any UI that can connect to an openAI endpoint! koboldlite, openwebui, you name
  it. basically, openAI bridge. yay!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulol44/openlumara_my_manually_coded_supertokenefficient/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T17:23:58.000Z'
fetched_at: '2026-07-02T23:00:55.717Z'
---
this was a long time coming, but it's finally here! you can now basically supercharge whichever UI you're already using with the power of openlumara. click that link for more information about openlumara itself. TL;DR: super token efficient framework built from the ground up for local models, reinventing a lot of conventions about harnesses and agents that were made for cloud API's and which tend to make local models work badly. see the link for more info on how it works with the quirks of local models rather than against them. anyway,
 in this demo i have it set up like this:
 koboldlite connects to openlumara, and then openlumara connects to llamacpp
 so koboldlite (or openwebui, or anything else) -> openlumara -> llamacpp/koboldcpp/whateveryouwant
 more technically, openlumara itself is connected to llamacpp. openlumara has the API bridge running on port 8000, which koboldlite connects to, just like any other openai API. and bam, instant lumara!
 oh and you can collapse the thinking headers if it bothers you. it's just a setting in the api bridge channel settings
    submitted by    /u/rosie254  
 [link]   [comments]
