---
title: Confucius4-TTS, multilingual and cross-lingual zero-shot TTS engine
url: 'https://github.com/netease-youdao/Confucius4-TTS'
source: GitHub official README
source_type: github
language: en
published: '2026-06-20T00:00:00Z'
fetched_at: '2026-06-21T03:45:00Z'
---
Confucius4-TTS is an LLM-based text-to-speech system from NetEase Youdao. The README describes it as a multilingual and cross-lingual zero-shot TTS engine with the tagline “One voice. Any language.”

Official README facts:

- It uses a speech encoder plus large language model architecture.
- It supports 14 languages: Chinese, English, Japanese, Korean, German, French, Spanish, Indonesian, Italian, Thai, Portuguese, Russian, Malay and Vietnamese.
- Key features include unconstrained voice cloning, cross-lingual voice transfer, zero-shot voice transfer, emotion transfer and robust multilingual generalization.
- The README says it can preserve speaker identity across languages and synthesize fluent, natural and expressive speech.
- Code license shown in README is Apache 2.0.
- Online demo, demo page, Hugging Face model page and ModelScope model page are linked from the README.
- Installation requirements listed are Python 3.10 and CUDA 12.6.
- Setup path shown by README: clone the repository, create a conda environment, activate it and install requirements.
- Inference can be run with `example.py` using `--prompt_wav`, `--text`, `--lang`, `--out` and `--config`.
- Python API path uses `ConfuciusTTS` from `confuciustts.cli.inference`, config file `config/inference_config.yaml`, and `generate()` with text, lang and prompt_wav.
- Fine-tuning section says training covers Text2Semantic and Semantic2Acoustic modules.

The useful writing angle is content production, not model leaderboard. A reader can test whether one reference voice can produce a short multilingual voiceover, then decide whether it belongs in short video localization, podcast snippets, course material or internal demo workflows.
