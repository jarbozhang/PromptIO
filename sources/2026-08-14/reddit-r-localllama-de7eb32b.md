---
title: >-
  Trained a 1.5B to write shell commands so I'd stop googling tar flags. Runs on
  a laptop CPU in ~1 sec.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vnl0um/trained_a_15b_to_write_shell_commands_so_id_stop/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-13T19:39:21.000Z'
fetched_at: '2026-08-14T11:01:32.391Z'
---
I've been googling "tar extract gz" for about ten years. and I finally did something about it.
 It started out as a research project and I ended up with a Fine-tuned Qwen2.5-Coder-1.5B on 125k natural-language/command pairs, merged and quantized to Q4_K_M. 941MB which runs through llama.cpp. On my laptop (i5-11320H, 4 threads): 31.9 tok/s, 0.59s median per query, 1.6GB RAM. 
 I benchmarked it and it scores 0.620 on InterCode-ALFA. Untuned Qwen2.5-Coder-7B gets 0.613, GPT-4o gets 0.73. Not frontier, but it's roughly a 7B's answer at a quarter the parameters on a CPU. Theres a 3B variant too that scores higher. 
 There's also few static safety checker, because it will absolutely write a command that wipes your root if you ask it to:
 I have published the weights: huggingface.co/ThorOdinson246/nl2sh-1.5b-Q4_K_M and Code: github.com/ThorOdinson246/whatisit-nl2sh . I posted few days ago in LocalLLM and it did well 300+ stars and so many good suggestions so I figured people here will be interested too. 
 Both Apache-2.0. If you want to poke holes in the method or you've got ideas, please comment or open a PR. A ⭐ helps if you find it useful.
    submitted by    /u/PicassoOnPause  
 [link]   [comments]
