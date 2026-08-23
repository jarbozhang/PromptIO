---
title: I trained a 1B-parameter LLM from scratch on 20B tokens for about $200
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vkydi5/i_trained_a_1bparameter_llm_from_scratch_on_20b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T21:44:43.000Z'
fetched_at: '2026-08-11T11:01:01.020Z'
---
A few months ago, I had the idea of making a LLM from scratch as a personal project (for learning and partly for improving my resume).
 Since I learned a lot from other posts on here over the past year, I wanted to share the results.
 TLDR: I trained a 1.1B param model on 20B tokens from fineweb-edu, then finetuned it on openhermes with LoRA to get a chat model. Total cost was about $200 (in February/March though, so it would probably be more expensive now).
  
code: https://github.com/Ni-co-la-s/gemmeh
 base model safetensors: https://huggingface.co/ni-co-la-s/gemmeh
 instruction-tuned model safetensors: https://huggingface.co/ni-co-la-s/gemmeh-it
 gguf for base and it model (requires my llama.cpp fork so probably not that useful to you): https://huggingface.co/ni-co-la-s/gemmeh-GGUF and https://huggingface.co/ni-co-la-s/gemmeh-it-GGUF 
 demo website: https://gemmeh.com/
  
The architecture is based on Gemma3 since it was my most used model when I started. There are a few differences: - I have a smaller context length (4096) and because of that I didn't use sliding window attention. - I have a smaller vocabulary (32k, trained the tokenizer with sentencepiece) - I also tweaked some hyperparameters to reach my target parameter count.
 For the data, I used fineweb-edu for training the tokenizer and pretraining the model. Then LoRA finetuned the model on openhermes. I purposely tried to find data from 2023 and earlier because I saw this post back then and thought it would be cool to test the model by asking it questions about the "future" (like I did in the gallery images).
 As far as the training goes:
 Pretraining
 For pretraining, I first did training runs on 2B tokens to test the architecture at 3 sizes: 185M, 500M and 1.1B. Then I did a final run of the 1.1B model on 20B training tokens.
 I did it on vast.ai and here's the summary:
  
  185M 500M 1B (on 2B tokens) 1B (on 20B tokens) 
  
 Total params 185M 527M 1.1B 1.1B 
  GPU 3090 5090 H100 H100 
  Duration 19h 1
