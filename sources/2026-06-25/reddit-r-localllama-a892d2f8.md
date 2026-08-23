---
title: >-
  llama.cpp updates - granite-speech-4.1-2b, LFM2.5-ColBERT/Embedding-350M,
  Vulkan backend related changes & Misc items
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ue8tw1/llamacpp_updates_granitespeech412b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T09:37:01.000Z'
fetched_at: '2026-06-25T07:40:38.236Z'
---
Supported Models:
  
granite-speech-4.1-2b-plus by 24818
 LFM2.5-ColBERT-350M & LFM2.5-Embedding-350M by 24913
  
Vulkan:
  
vulkan: link ggml-cpu when GGML_VULKAN_CHECK_RESULTS / RUN_TESTS are enabled #24444
 vulkan: make mul_mm ALIGNED a spec constant #24689
 vulkan: support CONV_3D #24612
 vulkan: Support GET_ROWS_BACK #24883
 vulkan: support all backend tests for SQR/SQRT/SIN/COS/CLAMP/LEAKY_RELU/NORM #24582
 vulkan: Apply bias before softmax in FA, to avoid overflow #24909
  
Misc:
  
ui: New Logo + Navigation cleanup & Mobile UI/UX improvements #24897
 And other fixes, etc.,
  
Hope that Vulkan list gives some boost on pp/tg(Experts could let us know about that).
 Don't want to post multiple threads(for those models) so including all other items in this single thread.
    submitted by    /u/pmttyji  
 [link]   [comments]
