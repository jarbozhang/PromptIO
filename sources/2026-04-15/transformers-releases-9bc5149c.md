---
title: 'v5.2.0: GLM-5, Qwen3.5, Voxtral Realtime, VibeVoice Acoustic Tokenizer'
url: 'https://github.com/huggingface/transformers/releases/tag/v5.2.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-02-17T13:23:20.000Z'
fetched_at: '2026-04-15T02:22:38.536Z'
---
New Model additions
VoxtralRealtime

VoxtralRealtime is a streaming speech-to-text model from Mistral AI, designed for real-time automatic speech recognition (ASR). Unlike the offline Voxtral model which processes complete audio files, VoxtralRealtime is architected for low-latency, incremental transcription by processing audio in chunks as they arrive.
The model combines an audio encoder with a Mistral-based language model decoder, using time conditioning embeddings and causal convolutions with padding caches to enable efficient streaming inference.
Add Voxtral Realtime (#43769) by @eustlb
GLM-5 - GlmMoeDsa

The zAI team launches GLM-5, and introduces it as such:
GLM-5, targeting complex systems engineering and long-horizon agentic tasks. Scaling is still one of the most important ways to improve the intelligence efficiency of Artificial General Intelligence (AGI). Compared to GLM-4.5, GLM-5 scales from 355B parameters (32B active) to 744B parameters (40B active), and increases pre-training data from 23T to 28.5T tokens. GLM-5 also integrates DeepSeek Sparse Attention (DSA), largely reducing deployment cost while preserving long-context capacity.
Reinforcement learning aims to bridge the gap between competence and excellence in pre-trained models. However, deploying it at scale for LLMs is a challenge due to the RL training inefficiency. To this end, we developed slime, a novel asynchronous RL infrastructure that substantially improves training throughput and efficiency, enabling more fine-grained post-training iterations. With advances in both pre-training and post-training, GLM-5 delivers significant improvement compared to GLM-4.7 across a wide range of academic benchmarks and achieves best-in-class performance among all open-source models in the world on reasoning, coding, and agentic tasks, closing the gap with frontier models.
Add GlmMoeDsa (#43858) by @Cyrilvallez
Qwen3.5, Qwen3.5 Moe

The Qwen team launches Qwen 3.5, and introduces it as such:
We are deligh
