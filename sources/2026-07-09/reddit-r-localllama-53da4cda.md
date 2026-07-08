---
title: 'Döner Bench round 2: Quant compare'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uqs7ws/döner_bench_round_2_quant_compare/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T13:09:19.000Z'
fetched_at: '2026-07-08T23:01:51.274Z'
---
I reiterated on the previous comparison but this time compared different quants of the same model.
 Same prompt:
  
Write a single HTML file with a full-page canvas and no libraries. Simulate a realistic Döner Style kebab skewer rotating (vertically) in front of a gas powered heating element.
  
Especially Gemma 4 looks more lobotomized the lower you go, but the others also lost "finesse" (no turning, simpler fire and with IQ2 stuff is mostly all over the place, these are the BEST results)
 A lot of you said n=1 is worthless and therefor I ran each model & quant until I had 9 finished runs (I deleted the ones with looping or timeouts) and selected the best result (purely subjectively based on yumminess, this is still not a scientific benchmark). If a model produced a non-rendering result, I posted the error back to it and gave it more tries.
 Example:
  
TypeError: invalid assignment to const 'x' (at about:srcdoc 563:23)
 Return the full object in your response, not just the changes.
  
What should I compare next?
 And, for science, here are the full results for each model:
 Qwen 3.6 27B Q8 K XL
 Qwen 3.6 27B Q4 K XL
 Qwen 3.6 27B IQ2 M (number #5 is my favorite)
 Gemma 4 31B Q8 K XL
 Gemma 4 31B IQ4 NL
 Gemma 4 31B IQ2 M (surprisingly "stable" results, the low quant Qwens are all over the place and the Gemma 4 IQ2 look +- the same)
 Qwen 3.6 35B A3B Q8 K XL (#9 has it all, turning, fire, smoke, a skewer but all of it in the wrong place)
 Qwen 3.6 35B A3B Q4 K XL
 Qwen 3.6 35B A3B IQ2 XXS
 Overview of the Model Configurations used (I usually used the Unsloth defaults for each model). 
    submitted by    /u/Excellent_Jelly2788  
 [link]   [comments]
