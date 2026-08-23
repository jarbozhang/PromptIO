---
title: OpenMOSS-Team/MOSS-Transcribe-Diarize · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uru6wf/openmossteammosstranscribediarize_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T15:50:31.000Z'
fetched_at: '2026-07-09T23:01:04.805Z'
---
MOSS-Transcribe-Diarize 0.9B is an end-to-end audio understanding model for long-form multi-speaker transcription, diarization, timestamps, and acoustic event awareness.
 Given an audio or video file, the model generates a compact speaker-aware transcript in one pass, including timestamps and anonymous speaker labels such as [S01], [S02], and beyond.
 Introduction
 MOSS-Transcribe-Diarize 0.9B turns real-world long-form audio into structured, speaker-aware transcripts in one pass. Instead of stitching together separate ASR and diarization systems, it jointly performs speech transcription and speaker diarization, producing time-aligned text with consistent speaker labels.
 The model is built for meetings, calls, podcasts, interviews, lectures, videos, and other long or messy multi-speaker recordings. It can also emit acoustic event annotations, giving downstream systems a richer view of what happened, who spoke, and when.
 Core capabilities:
  
Long-form transcription: Converts long audio or video recordings into timestamped text.
 Speaker-aware diarization: Assigns anonymous speaker labels such as [S01] and [S02] without a separate diarization pipeline.
 Promptable generation: Supports custom transcription instructions, hotwords, and acoustic event annotations.
  

  
 Component Specification 
  
 Text backbone Qwen3-0.6B style causal decoder 
  Audio encoder Whisper-Medium encoder configuration 
  Audio frontend WhisperFeatureExtractor, 16 kHz, 80 mel bins, 30 s chunks 
  Audio-text bridge 4x temporal merge + MLP adaptor 
  Fusion Audio features replace `< 
  Output format Compact [start][Sxx]text[end] transcript with speaker tags such as [S01] 
 
 GGUF:
 https://huggingface.co/mudler/moss-transcribe.cpp-gguf
    submitted by    /u/pmttyji  
 [link]   [comments]
