---
title: 'Cactus Hybrid: We taught Gemma 4 to know when it''s wrong'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v3nw3j/cactus_hybrid_we_taught_gemma_4_to_know_when_its/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-22T18:01:58.000Z'
fetched_at: '2026-07-23T11:00:53.306Z'
---
Hey HN, Henry & Roman here from Cactus.
 A small, on-device model is fast and private, but sometimes wrong, but frontier models are getting expensive pretty fast. So, we post-trained Gemma 4 E2B post-trained to know when it's wrong. Every response comes with a confidence score between 0 and 1. Developers can accept the on-device when it's high, hand off to a bigger cloud model when it's low. By routing only 15-35% of queries to Gemini 3.1 Flash-Lite, Gemma-4-E2B matches Gemini 3.1 Flash-Lite on most benchmarks.
 - ChartQA: 15-20%
 - LibriSpeech: 25-30%
 - MMBench, GigaSpeech, MMAU: 30-35%
 - MMLU-Pro: 45-55%
 We were always frustrated by the routing signals hybrid apps rely on: asking the model to rate itself in text (unreliable, and you're parsing prose), or token entropy heuristics (barely better than a coin flip in our tests). So we did mechanistic studies on small models, Gemma 4 particularly, and found the hidden state for different layers carry meaningful self-awareness signal for various situations.
 SO we extended the model with a 68k params probe layer (LayerNorm, low-rank projection, attention pooling, small MLP head) reads one intermediate layer during decoding and predicts p(wrong); confidence = 1 - p(wrong), returned as structured data, never parsed out of the answer text.
 Across 12 hold-out benchmarks spanning text, vision and audio, the probe averages 0.814 AUROC vs 0.549 for token entropy. The result that convinced us this is real: the probe was trained on zero audio data, yet scores 0.79-0.88 AUROC on four audio benchmarks where entropy is near-random or worse (0.32-0.52). It's reading a modality-independent correctness signal from the hidden state, not memorizing patterns from its training data.
 We published all weights on HuggingFace and provide copy-pase codes to run it on Transformers, MLX, Llama.cpp or Cactus. With Ollama, vLLM, SGLang etc in the works. For llama.cpp we ship a patch series you compile in once (upstreaming is planned). The cod
