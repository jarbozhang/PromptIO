---
title: Qwen 3.8 27B xhigh vs medium small comparison (+ others for fun)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vrg907/qwen_38_27b_xhigh_vs_medium_small_comparison/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T05:36:41.000Z'
fetched_at: '2026-08-18T11:02:01.163Z'
---
It's a small experiment of mine to check thinking effort on Qwen and I do have to say xhigh does overthink but I'm not sure if it's bad because the result is rather amazing. Although the prompt was very open-ended so it took liberties. TL:DR at the bottom.
 Images in order:
 Qwen 3.8 27b xhigh, Qwen 3.8 27b medium, DS V4 Flash default thinking, ChatGPT Free with Thinking, Claude Opus 5 Medium, Qwem 3.8 27b medium adjusted prompt
 Qwen 27b is UD_Q4_XL and DS4 Flash is Q2_XXL
 Prompt: Write a simple html CARD about the benefits of eating apple. paste the code here.
 So apart from 27b's xhigh effort all models though this is a super simple request. Which it is, but they basically didn't think, or though for a few lines only, even the medium effort. In turn xhigh though very long and produced a result that is way above anything else in this test. I'm a bit torn on if it's good or not, because A) the quality of the xhigh result is insane B) it was a very simple prompt and technically every other model did it.
 Tokens (all values token output):
 3.8 27b xhigh: 23.8K
 3.8 27b medium: 794
 DS V4 Flash: 927
 3.8 27b medium modified prompt: 3.3K
 For chatgpt and claude I used online versions and as far as I see they hide their tokens right now, but can't be much higher than 1K out.
 27b medium modified prompt:
 Write a simple html CARD about the benefits of eating apple. paste the code here. It has a design of 'orchard notes' like a page from a notebook or a tear-off card. at the top it has the nr of the orchard note (apple is 01) and a header, then you get a perforation and the body afterwards. the body has an image (or emoji) of the apple in big and the benefits listed in interactable stylish format. then we have a small section for the stats e.g. calories, fiber etc for the apple and finally the card ends.
 Use pastel colors especially 'butter' and adjacent colors, it must be stylish, modern, and in-line with the required format
 I was interested to see if I try to recreat
