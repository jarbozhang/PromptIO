---
title: >-
  Multi-Source Cybersecurity Logs: An ATT&amp;CK-Labeled Dataset and SLM
  Evaluation
url: 'https://arxiv.org/abs/2606.18190v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Abir Ashab Niloy
  - Ahmed Ryan
  - Imamul Hossain Rafi
  - Md Erfan
  - Md Rayhanur Rahman
categories:
  - cs.CR
  - cs.LG
  - cs.CR
published: '2026-06-16T17:21:58Z'
fetched_at: '2026-06-17T03:04:24.953Z'
---
Multi-stage cyberattacks span system, network, and browser logs. Detecting them requires correlating events across all three sources. Machine learning methods can learn these cross-source patterns, but they need labeled multi-source data. Existing public datasets fall short. Network-only datasets such as CICIDS and UNSW-NB15 miss host and browser activity. Host-focused datasets such as LMDG and CICAPT-IIoT lack browser telemetry. ATLAS includes all three sources but labels events only as malicious or benign, without MITRE Adversarial Tactics, Techniques, and Common Knowledge (ATT&amp;CK) technique granularity. No public dataset combines all three sources with per-entry ATT&amp;CK technique labels. We close the gap by building a multi-source log dataset of 870 sessions (70 attack, 800 benign) and approximately 2.3 million events. We captured system, network, and browser activity simultaneously on Windows endpoints. We labeled malicious events with ATT&amp;CK technique IDs, covering 12 tactics and 53 techniques. We generated all attack data using real tools, including Remote Access Trojan (RAT), Command and Control (C2) tunnels, and cloud exfiltration. To demonstrate learnability, we fine-tuned three Small Language Models (SLMs) (Qwen2.5-1.5B, Llama-3.2-3B, Phi-4-Mini) using Low-Rank Adaptation (LoRA). We compared each against its base variant across ten metrics on two tasks: chunk classification and ATT&amp;CK technique identification. Fine-tuning improved every model on every

Authors: Abir Ashab Niloy, Ahmed Ryan, Imamul Hossain Rafi, Md Erfan, Md Rayhanur Rahman
Categories: cs.CR, cs.LG, cs.CR
