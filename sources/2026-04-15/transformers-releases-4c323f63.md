---
title: >-
  v5.3.0: EuroBERT, VibeVoice ASR, TimesFM2.5, PP-DocLayoutV2, OlmoHybrid,
  ModernVBert, Higgs Audio V2
url: 'https://github.com/huggingface/transformers/releases/tag/v5.3.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-03-04T17:42:16.000Z'
fetched_at: '2026-04-15T02:22:38.536Z'
---
New Model additions
EuroBERT

EuroBERT is a multilingual encoder model based on a refreshed transformer architecture, akin to Llama but with bidirectional attention. It supports a mixture of European and widely spoken languages, with sequences of up to 8192 tokens.
Links: Documentation | Paper | Blog Post
Add eurobert (#39455) by @ArthurZucker in #39455
VibeVoice ASR

VibeVoice ASR is an automatic speech recognition model from Microsoft that combines acoustic and semantic audio tokenizers with a causal language model for robust speech-to-text transcription. The model uses VibeVoice's acoustic and semantic tokenizers that process audio at 24kHz, paired with a Qwen2-based language decoder for generating transcriptions. It can process up to 60 minutes of continuous audio input, supports customized hotwords, performs joint ASR/diarization/timestamping, and handles over 50 languages with code-switching support.
Links: Documentation | Paper
Add VibeVoice ASR (#43625) by @ebezzam in #43625
TimesFM2.5

TimesFM 2.5 is a pretrained time-series foundation model that uses a decoder-only attention architecture with input patching for forecasting. The model is designed to provide accurate zero-shot forecasts across different domains, forecasting horizons and temporal granularities without requiring dataset-specific training. It builds on the original TimesFM architecture with enhancements including rotary attention, QK normalization, per-dimension attention scaling, and continuous quantile prediction.
Links: Documentation | Paper
Timesfm 2.5 (#41763) by @kashif in #41763
PP-DocLayoutV2

PP-DocLayoutV2 is a dedicated lightweight model for layout analysis, focusing specifically on element detection, classification, and reading order prediction. The model is composed of two sequentially connected networks: an RT-DETR-based detection model that performs layout element detection and classification, followed by a pointer network that orders these layout elements. It is designed to anal
