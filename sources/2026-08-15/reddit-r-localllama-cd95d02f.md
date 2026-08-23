---
title: 'A hunch: Qwen3.8-27B''s general knowledge got pruned (good, if true)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vokpw6/a_hunch_qwen3827bs_general_knowledge_got_pruned/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-14T21:52:55.000Z'
fetched_at: '2026-08-15T11:01:21.074Z'
---
I'm always testing an image prompt with a picture of a historic place in my hometown – a small but well known 250,000 people town in Germany. I'll just ask the model, in which City this photo has been taken.
 With the 3.6 generation of both the 27B and the 35B A3B variants, the models sometimes got the right answer and sometimes they didn't. So the signal for this particular knowledge was already weak.
 The 35B variant got it right more often but at least, the models reasoning showed my City most of the times, even if it hallucinated the wrong final answer.
 Both models could be easily nudged to the right answer with a few hints and then produced some little extra insight about the history or scene and its surroundings, that was mostly true.
 Qwen3.8-27B on the other hand barely knows the city at all and has absolutely no clue about related popular, historic facts regarding the scenery or the surrounding buildings.
 Nudging isn't very fruitful as well and if told the real name of the city, reasoning shows, that the model only agrees, because the user says so.
 I have the feeling, that Qwen labs maybe pruned useless general knowledge for more coding knowledge and agentic skill.
 All models ud q4_k_xl variants, image-min-tokens 2048, with and without reasoning.
 Anyone else with this feeling?
 Disclaimer: My hunch could be very well absolute bullshit. Sample size way to low and methodically sloppy af. 
    submitted by    /u/bonobomaster  
 [link]   [comments]
