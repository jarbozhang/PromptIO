---
title: My thoughts on qwen 3.8 so far with agentic coding.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v16r8d/my_thoughts_on_qwen_38_so_far_with_agentic_coding/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T00:39:57.000Z'
fetched_at: '2026-07-20T23:00:57.695Z'
---
So, im 50 and autistic. I learned C++ in college when I was young and didnt really ever use it that much. I also learned a bit of assembly from using cheat engine for game hacking (dont worry! single player or private servers!) which meant I got a little LUA experience.
 I've always disliked coding. Its such a "bang head against wall" type activity but I got into it because its pretty cool being able to make a computer do what you want. This entire attitude died a LONG time ago because coding wasnt my thing. Could be my autism or whatever, could be I suck at it, could be I just plain dont like it.
 In the early days of AI I used to ask models to make simple stuff I could copy and paste, eventually it got to the point I could use a local model to clone a repo and build it.
 This shit is SO much fun.
 Ok so to the point. My game has 3d, path finding, routines and a whole bunch of other stuff. one of the more tricky parts is the game uses an LLM. I've been banging my head against a wall trying to get all of this working and today I decided to pull in an LLM which happened to be qwen 3.8.
 I explained the issues I was having and within 10 minutes it had fixed everything. It wasnt perfect but it involved llama.cpp and a custom addon on godot. 
 So my thoughts in order of impact of using the model.
 1.When it works it REALLY god damn works. This thing codes so hard, one shots even complex shit that can involve llama.cpp. I've never seen a model code so well. something on my body went really small the first time I saw it code.
 2.Right now its VERY prone to loops. I've had sessions which have just gone south after 2-3 prompts and it just repeats itself violently. (watch those eyes). hoping this will clear up.
 3.The previous models over thinking is gone.
 4.Im using the official token plan from alibaba and the speed of this thing is nuts.
 5.I never planned for a fifth point. Not sure why this is here.
 So, just some casual observations from me. Overall? im chuckling while
