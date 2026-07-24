---
title: PSA on Laguna S-2.1 - Use the updated chat template and GGUF
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4iqjx/psa_on_laguna_s21_use_the_updated_chat_template/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T16:23:20.000Z'
fetched_at: '2026-07-24T11:01:34.764Z'
---
Link to their official GGUF repo:
 https://huggingface.co/poolside/Laguna-S-2.1-GGUF/tree/main
 All the GGUFs received this fix 5ish hours ago - correct yarn_attn_factor to 1.0 (llama.cpp derives mscale)
 And the chat template fixes a lot of broken thinking, preserve thinking, and tool calling
 Chat template: 
 https://huggingface.co/poolside/Laguna-S-2.1-GGUF/blob/main/chat_template.jinja
 So far the model seems to be doing MUCH better.
    submitted by    /u/fragment_me  
 [link]   [comments]
