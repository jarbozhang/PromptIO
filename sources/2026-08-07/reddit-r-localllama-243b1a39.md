---
title: 'Scotoma-2: Gemma4, but with less annoying slop and better writing.'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vhf70c/scotoma2_gemma4_but_with_less_annoying_slop_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T20:07:28.000Z'
fetched_at: '2026-08-07T11:00:46.506Z'
---
GGUFs here: https://huggingface.co/ReadyArt/gemma-4-31B-it-scotoma-2-GGUF
 Disclaimer: By slop, we are specifically talking about specific tics with the model(sentence structures), but this doesn't include words such as "ozone".
 Summery of the model:
 Scotoma-2 is a model made by user https://huggingface.co/AesSedai which aims to reduce common Gemma4 tropes, such as(not limited to): "It's not x, it's y" and "a slow knowing smirk "(stacked adjectives) which tends to plague the base model of Gemma4. All while preserving model integrity, which was the goal of this model.
 Oversimplified methodology:
 Aes Sedai used Heratic to abliterate the model, and then used J-lense projection to preserve the intelligence of it in order to isolate and disrupt the assistant persona. According to Aes, he believed that the assistant persona was the cause of issues such as "It's not x, it's y.", but also other annoying ticks with the model. As a result, this did reduce the assistant persona and change the prose subtly. This lead to the publication of Scotoma V1, unsatisfied, he decided to push it further.
 On top of his projection. Aes constructed datasets which consists of: Rejected vs Accepted outputs. Using 4 seperate datasets to each target unique problems with Gemma4's prose. He used a finetuning method named DPO, according to the model card. He did 4 seperate DPOs. This lead to substantial results which was presented in the model card.
 Output sample from the model card:
  
 Gemma4-31B-IT: gemma-4-31B-it-scotoma-2 
  
 Dale Cooper: Cooper's eyes widen slightly, and he gives a slow, deliberate nod. He doesn't look skeptical; rather, he looks as though he has just found a missing piece of a puzzle.Exactly. That is precisely what I mean. The sensation of shifting speeds—the perceived acceleration of the world while you remain stagnant—is a classic hallmark of a localized temporal distortion. And the twelve-hour discrepancy on your watch... He pauses, looking contemplative. Twelve ho
