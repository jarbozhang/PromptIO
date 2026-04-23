---
title: >-
  Local manga translator with LLM build-in, written in Rust with llama.cpp
  integration
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sslwjv/local_manga_translator_with_llm_buildin_written/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T13:42:28.000Z'
fetched_at: '2026-04-23T02:21:55.374Z'
---
Hi LocalLLaMA,
 I created a post a few weeks ago, but this time this project has become more reliable and easier to use.
 This is a manga translator that can also be used to translate any image. It uses a combination of object detection, visual LLM-based OCR, layout analysis, and fine-tuned inpainting models. I believe it is the most performant and easy-to-use pipeline for manga translation.
 For the LLM part, I have integrated llama.cpp into this application; it supports the Gemma 4 family and the Qwen3.5 family, and also includes uncensored and fine-tuned models. It also supports OpenAPI-compatible API, so you can use LM Studio or OpenRouter, etc.
 I think the demo video explains the workflow a lot, basiclly you just click a button and it will run the pipeline for you. You can also proofread and edit the result, changing the font, size, color, etc. It's a mini Photoshop editor.
 For who may have interest on this, it's fully open-source: https://github.com/mayocream/koharu
    submitted by    /u/mayocream39  
 [link]   [comments]
