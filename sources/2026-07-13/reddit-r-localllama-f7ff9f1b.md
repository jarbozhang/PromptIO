---
title: I didn't give up - extGemma4-40_5B returned
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu4hxp/i_didnt_give_up_extgemma440_5b_returned/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T03:49:53.000Z'
fetched_at: '2026-07-12T23:01:41.974Z'
---
Continue from my previous posts:
 https://www.reddit.com/r/LocalLLaMA/comments/1ul0cx9/i_extended_gemma431b_to_44b_88_layers_since/
 https://www.reddit.com/r/LocalLLaMA/comments/1um20ev/why_new_inserted_layers_kill_the_gemma4/
 (Warning : AI generated Post - due to my bad English)
 Hugging Face : https://huggingface.co/TOTORONG/extGemma4-40_5B
 https://preview.redd.it/veg5nuao1rch1.png?width=2752&format=png&auto=webp&s=85492b121524aa14011f57d8d4fa5ace38c0270a
 A while back I posted here about trying to grow a fine-tuned Gemma model by stacking extra layers into it (the 88-layer experiment). It flopped. The new layers just sat there like dead weight and never learned anything useful. A bunch of you were kind/curious in the comments, so here's the follow-up: I didn't drop it. I went back, figured out why it died, and tried again — and this run actually worked.
 Fair warning up front: this is a write-up for people who like tinkering, not a paper. I'm going to keep the math and the parameter-count trivia out of it and lean on analogies. If you want the gory details I'm happy to share more in the comments.
 Why the first attempt died (the short version)
 The standard trick for inserting new layers is to initialize them so they do literally nothing at first — a pass-through. The idea is "start them as a no-op, let training teach them a job."
 Think of it like hiring 17 new people onto a factory assembly line and telling them to just stand still on day one. Sounds safe. The problem: a worker who does nothing also gets no feedback. Nobody can tell them "hey, do that part a little differently," because they're not doing anything to correct. So they never learn. They just keep standing there while the line flows around them. That's what killed the first run — the new layers were starving for any signal to learn from.
 What I did differently this time
 Instead of telling the new hires to stand still, I taught each of them a rough blend of what the two coworkers on either side 
