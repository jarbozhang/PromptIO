---
title: FireRedAudio & FireRedTTS3 by FireRedTeam - Huggingface
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vukj3m/fireredaudio_fireredtts3_by_fireredteam/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T16:05:05.000Z'
fetched_at: '2026-08-22T11:01:33.608Z'
---
FireRedAudio: A General-Purpose Audio Language Model with Decoupled Continuous Representations for Understanding and Generation
  
HuggingFace : https://huggingface.co/FireRedTeam/FireRedAudio
 GitHub : https://github.com/FireRedTeam/FireRedAudio
 Demo : https://fireredteam.github.io/demos/fireredaudio/
  
Overview
  
 FireRedAudio is a general-purpose audio language model built on a shared 9B-parameter LLM with decoupled continuous representations: an Audio Encoder handles understanding, while a RedAE pathway handles generation. A single model supports ASR, audio understanding, zero-shot TTS, instruct TTS, semantic/acoustic speech editing, and accurate temporal grounding over recordings up to one hour long.
 Highlights ✨
  
🧩 Purpose-built representations, one shared backbone — The Audio Encoder pathway serves understanding, while the RedAE-Patch pathway serves speech generation. Their representations remain decoupled but share the same language and reasoning backbone. To the best of our knowledge, this is the first publicly disclosed design of its kind in a unified audio-language model.
 📊 One model, a full audio stack — FireRedAudio spans ASR, broad and fine-grained audio understanding, zero-shot TTS, Instruct TTS, and free-form speech editing, achieving competitive or leading results across MMAU, MMSU, Seed-TTS-Eval, InstructTTSEval, and Ming-Freeform-Audio-Edit.
 🎙️ Create and edit speech with natural language — Clone a voice from a reference clip, design a voice from a description, or edit what was said and how it sounds through one continuous-latent generation pathway.
 ⏱️ Go from minutes to hour-long recordings — Understand recordings up to one hour with precise time-to-content alignment. Organize audio into timestamped structures, produce grounded summaries, retrieve content by time (or time by content), and reason over evidence distributed across the recording.
  
FireRedTTS3: Unified Speech Generation and Editing with Semantically Enriched Speech Repre
