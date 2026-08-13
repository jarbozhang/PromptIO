---
title: CohereLabs/North-Micro-Vision-Instruct · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vmjmna/coherelabsnorthmicrovisioninstruct_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T16:50:24.000Z'
fetched_at: '2026-08-13T11:02:02.145Z'
---
North Micro Vision Instruct is a 2.4B-parameter open-weight vision-language model with native-resolution image support, released under the Apache 2.0 license. It is designed as a compact foundation for prototyping, task-specific fine-tuning, and specialized multimodal applications.
 Highlights
  
Native-resolution image processing that preserves aspect ratios and fine visual detail.
 Broad image-understanding capabilities across VQA, captioning, grounding, OCR, charts, and documents.
 Multilingual and multi-image support.
 Compact 2.4B-parameter scale suited to customization and deployment experimentation.
 Apache 2.0-licensed model weights.
  
Model Details
  
 Property Value 
  
 Model ID CohereLabs/North-Micro-Vision-Instruct 
  Total parameters 2.4B 
  Language model 2B parameters 
  Vision encoder 400M parameters; custom-trained starting from SigLIP 2 SO400M 
  Inputs Interleaved text and images 
  Output Text 
  Languages English, German, French, Spanish, Italian, Portuguese, Hindi, Japanese, Korean, Chinese, Arabic, and more 
  Tokenizer vocabulary size 262,144 
  LM Backbone context window 128K tokens 
  Multimodal training context 8K tokens 
  Checkpoint precision bfloat16 
  License Apache 2.0 
 
 The language backbone supports a 128K-token context window, but the validated operating range for multimodal prompts is up to 8K tokens. Longer multimodal contexts may rely on extrapolation and have not been benchmarked.
 Intended Use
 North Micro Vision Instruct is intended for research and development use cases such as:
  
Prototyping and task-specific fine-tuning.
 General visual question answering and image captioning.
 Multilingual and multi-image understanding.
 Visual grounding and spatial understanding.
 OCR, chart and document understanding, and structured information extraction.
  
Limitations
  
The model is intended as a compact foundation for customization rather than a replacement for larger general-purpose chat assistants.
 It is not a reasoning mo
