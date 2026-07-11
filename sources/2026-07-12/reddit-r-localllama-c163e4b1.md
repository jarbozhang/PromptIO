---
title: MIT LLM Serve Dashboard I am making open source
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ut3p89/mit_llm_serve_dashboard_i_am_making_open_source/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T23:25:40.000Z'
fetched_at: '2026-07-11T23:01:42.043Z'
---
A single-file, dependency-free live dashboard for your local LLM serving box — GPU utilization, per-model throughput, KV/context fill, and system stats for llama.cpp and vLLM, in one green terminal-styled page.
 No framework, no build step, no external requests. The frontend is one index.html (opens on file://); the backend is one stdlib Python file that reads nvidia-smi and each server's Prometheus /metrics.
 https://github.com/NHClimber87/llm-serve-dashboard
 What it shows
 
  
GPUs — per-card utilization, VRAM, power, temperature, clocks, and the actual compute tenants on each card (pulled from nvidia-smi --query-compute-apps, so cards are labeled from ground truth, not VRAM guesswork).
 Primary worker — decode & prefill tokens/sec, request counts, context/KV fill, LoRA adapters. Works with llama.cpp (/metrics + /props) and vLLM (/metrics + /v1/models). The worker port is auto-discovered from listening sockets, so a bench or swap that moves the model to another port still lands on the dashboard.
 Secondary servers — an optional row of cards for extra CPU/GPU llama-servers you run (point them at any endpoints — a small CPU model, a second box, etc.). Configure with SECONDARY_SERVERS.
 System — CPU, RAM, load, network, disk.
 Model library — a browsable inventory of your loadable models with quant, ctx, and measured throughput, driven by a JSON registry you edit.
 Reasoning tap (optional) — live per-request reasoning/CoT panels, if you tee a model's reasoning_content to a log (see THOUGHT_LOG below). Off by default.
  
It's a work in progress but I know a few people asked for this dashboard in my other posts so please try it out and I will do my best to respond to questions and requests. This really helps me increase my observability. I am especially happy with the thought tap that displays the chain of thought the models have. Critical to have when using teacher model distills!
    submitted by    /u/Important_Quote_1180  
 [link]   [comments]
