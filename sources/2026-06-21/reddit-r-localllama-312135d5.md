---
title: It’s time to decentralize model distribution! Introducing Noema Atlas
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubasxo/its_time_to_decentralize_model_distribution/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T23:33:24.000Z'
fetched_at: '2026-06-21T03:18:27.867Z'
---
TL;DR: Noema Atlas is a peer-to-peer network software using Iroh for local LLM weights, free and open source (Apache-2.0). Models come from whichever peers have them, with Hugging Face and mirrors as fallback (opt-in). Every file is identified by its content hash and a signed manifest, so the same weights from any source dedupe into one verified copy and every byte is checked as it streams in. Downloads fail over automatically when a source dies, identical files are stored once (reflink/hardlink), and you can rescue and reshare weights that got taken down from HF. Native lightweight desktop app for macOS/Windows/Linux, with direct machine-to-machine transfers over Iroh. atlas.noemaai.com
 We need your help to improve this project!
 --- 
 We've been reading this community for a long time, and the same frustrations kept surfacing. The most important one it seems (especially with the taking down of Fable) is the reliance on a single source of models. Hugging Face is headquartered in the United States, allowing for future intervention from the government with regards to open source models deemed "unsafe" (most likely Chinese ones).
 So we made Noema Atlas (built using Rust), and the core idea is that it's a peer-to-peer network software allowing you to bring your models and seed them! A model you already hold can be served straight to someone else's machine, and a model you want arrives from whichever peers around the world happen to have it. Hugging Face and the usual mirrors are still there, but they only act as a fallback for when no peer is nearby or a file is too new to have spread.
 What makes the sharing safe is that a file's identity is the digest of its own contents. Model weights, regardless of where they have been sourced from, are verified using their BLAKE3 hash, which allows Noema Atlas to bring together peers without using traditional "trackers".
 A few things that came directly out of what people here have been asking for:
  
Stored once. Identical files
