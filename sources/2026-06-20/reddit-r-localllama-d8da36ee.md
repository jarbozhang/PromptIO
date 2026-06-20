---
title: >-
  [NEW MODEL] SupraLabs just released supra-title-FFT-preview, 115K samples,
  almost 10x our first chat title dataset
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ualbn2/new_model_supralabs_just_released/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T02:56:51.000Z'
fetched_at: '2026-06-20T04:27:01.318Z'
---
Hey r/LocalLLaMA! Following up on Supra-Title-350M-exp (our first chat title generation model), we're releasing supra-title-FFT-preview, trained on a much larger and cleaner dataset.
 🤗 supra-title-FFT-preview
 What changed
 Our first chat title model was trained on 12K samples (chat-titles-12K) and it showed: decent on common conversation patterns, weak on niche topics. This release is trained on 115K samples from a new filtered dataset, chat-titles-filtered-115K.
  
 Model Dataset size 
  
 Supra-Title-350M-exp 12K samples 
  supra-title-FFT-preview 115K samples 
 
 Same base, same task, just a lot more coverage. Per our naming convention, this is the last checkpoint before the final non-preview release.
 Specs
  
 Spec Value 
  
 Base model LiquidAI/LFM2.5-350M-Base 
  Parameters ~0.4B 
  Precision BF16 
  Training Full fine-tune (FFT), not LoRA 
  Framework Unsloth 
  Task Single-purpose: chat title generation 
 
 Still no system prompt needed. Send the user message, get a title back.
 Quick start
 Transformers pipeline:
 from transformers import pipeline pipe = pipeline("text-generation", model="SupraLabs/supra-title-FFT-preview") messages = [{"role": "user", "content": "bruh my wifi keeps disconnecting every 10 minutes"}] print(pipe(messages)) 
 Or load directly:
 from transformers import AutoTokenizer, AutoModelForCausalLM import torch MODEL_ID = "SupraLabs/supra-title-FFT-preview" tokenizer = AutoTokenizer.from_pretrained(MODEL_ID) model = AutoModelForCausalLM.from_pretrained(MODEL_ID, torch_dtype=torch.bfloat16, device_map="auto") messages = [{"role": "user", "content": "what's the easiest way to make fluffy pancakes?"}] inputs = tokenizer.apply_chat_template( messages, add_generation_prompt=True, tokenize=True, return_dict=True, return_tensors="pt" ).to(model.device) outputs = model.generate(**inputs, max_new_tokens=40) print(tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:], skip_special_tokens=True)) 
 vLLM (OpenAI-compatible server):
 vllm se
