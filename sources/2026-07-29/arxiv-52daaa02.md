---
title: >-
  VetClaw: An Edge-Cloud Multimodal Agentic System for Veterinary Disease
  Screening
url: 'https://arxiv.org/abs/2607.26042v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Syed Mhamudul Hasan
  - Anas AlSobeh
  - Hussein Zangoti
  - Abdur R. Shahid
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-07-28T17:50:25Z'
fetched_at: '2026-07-29T11:02:31.056Z'
---
We present VetClaw, an edge-cloud multimodal agentic system for early veterinary disease screening. VetClaw uses a camera module as an edge sensing device and sends captured images, together with optional symptom descriptions, to a server-hosted vision-language model for zero-shot disease classification. The system separates agent interaction from workflow orchestration: OpenClaw provides scheduling, tool access, user interaction, and notification services on the edge device, while LangGraph manages the stateful screening workflow, including input validation, image transmission, model invocation, safety checks, conditional routing, failure handling, and structured logging. This design moves beyond static image classification by enabling the system to collect visual evidence, invoke external models, apply deterministic safety rules, and generate diagnostic-support alerts. Results show that image-only VLM prediction remains limited, whereas symptom-guided and multimodal inputs improve zero-shot classification performance. Thus, VetClaw transforms a static prediction model into a coordinated, safety-aware system that can use tools, manage workflows, handle failures, and escalate uncertain cases.

Authors: Syed Mhamudul Hasan, Anas AlSobeh, Hussein Zangoti, Abdur R. Shahid
Categories: cs.CV, cs.LG, cs.CV
