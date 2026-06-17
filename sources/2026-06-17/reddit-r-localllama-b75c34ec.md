---
title: 'GLM 5.2 API is live, weights are on HF, and ollama has it already'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u7o9vp/glm_52_api_is_live_weights_are_on_hf_and_ollama/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-16T19:55:26.000Z'
fetched_at: '2026-06-17T03:03:11.627Z'
---
GLM 5.2 dropped on Friday locked behind the GLM Coding Plan. That was annoying if you just wanted to test it without subscribing to another IDE tier.
 Two hours ago today they opened the API and pushed weights to HuggingFace under MIT. Ollama already has it. So now you can actually run it locally or call it through whatever gateway you already use.
 Links if you want to skip the blog:
 - Weights: https://huggingface.co/zai-org/GLM-5.2
 - Blog: https://z.ai/blog/glm-5.2
 - Ollama: https://ollama.com/library/glm-5.2
 The API pricing is $1.4 per 1M input tokens and $4.4 output, same as GLM-5.1. Two thinking modes, High and Max. Max burns more tokens but pushes scores up. 1M context, though I have not tested whether it stays coherent at the far end of that window.
 Benchmarks they posted: 81.0 on Terminal-Bench 2.1, 62.1 on SWE-bench Pro, 74.4 on FrontierSWE. Trails Opus 4.8 by a point, edges GPT-5.5 by one. For an open-weights model that is a genuinely useful position. Not because it wins everything. Because it might win enough at a price that makes routing interesting.
 What I am routing to it first: extracting fields from support logs, drafting internal summaries, first pass code review comments. The boring 70 percent. If it survives a week of real traffic without weird failures, I will widen it.
    submitted by    /u/Independent_Plum_489  
 [link]   [comments]
