---
title: LiquidAI/LFM2.5-VL-3B · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vmfy8w/liquidailfm25vl3b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T14:37:27.000Z'
fetched_at: '2026-08-13T11:02:02.145Z'
---
LFM2.5-VL-3B is a multimodal variant of LFM2.5, a family of hybrid models designed for on-device deployment. It builds on LFM2-VL-3B with further mid- and post-training. LFM2.5-VL-3B can process both text and images, and uses the LFM2.5-2.6B language model as its backbone, combined with a SigLIP2 NaFlex vision encoder.
  
Better grounding: Improved grounding and object detection with natural language queries.
 Better OCR: Full page OCR with layout annotation. See layout annotation format for more information.
 Efficient inference: 228 tok/s on an Apple M5 Max and 116 tok/s on an AMD Ryzen AI Max+ 395, in under 3.3 GB of memory.
  
Find more information about LFM2.5-VL-3B in our release post.
 Model Details:
  
LM Backbone: LFM2.5-2.6B
 Vision encoder: SigLIP2 NaFlex shape‑optimized 400M
 Vocabulary size: 128,000
 Context length: 32,768 tokens
 Languages: English, Arabic, Chinese, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Vietnamese, Thai, Indonesian, Hindi, Russian, Polish
 Native resolution processing: Uses SigLIP2's NaFlex; large images are split into non-overlapping 512×512 patches and a resized whole-image thumbnail.
 Generation parameters: 
 text: temperature=0.2, top_k=50, repetition_penalty=1.0
 vision: Use the processor_config.json file.
 
  
We recommend using it for single-turn, high-throughput, low-latency tasks; for example, for near-realtime object detection in automotive applications, batch processing scanned documents with OCR with layout information for turning PDFs into searchable text, or for on-device translation of menus and road signs into your native language.
 It is not recommended for long-context, reasoning-intensive tasks, such as visual web design, or answering highly technical questions about blueprints.
 On-device Inference
 LFM2.5-VL-3B decodes 228 tokens/s on an Apple M5 Max and 116 tokens/s on an AMD Ryzen AI Max+ 395, and fits in about 3 GB of memory. It even reaches 20 tokens/s on a Galaxy S26 Ultra, so you can
