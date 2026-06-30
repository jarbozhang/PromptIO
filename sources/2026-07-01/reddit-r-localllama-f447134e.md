---
title: >-
  TurboOCR v3 — high-speed document OCR server (C++/CUDA), ~520 img/s on RTX
  5090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ujqi9a/turboocr_v3_highspeed_document_ocr_server_ccuda/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T14:17:30.000Z'
fetched_at: '2026-06-30T23:01:36.520Z'
---
TurboOCR is a self-hosted, high-speed document OCR server, runs fully local. Here's What's New in v3:
 Speed:
  
Full pipeline now on the newest PP-OCRv6 models (up from v5): ~270 → ~520 img/s on FUNSD (v6 tiny, RTX 5090).
 Still fully local, HTTP + gRPC.
  
Structured parsing (the main addition):
  
End-to-end now: layout → tables to HTML → formulas to LaTeX → reading-order Markdown.
 Tables and formulas are strict per-request opt-in, so you only pay the cost when you actually need them.
  
Stack: C++, TensorRT FP16, multi-stream, gRPC/HTTP, direct PDF endpoint, PP-OCRv6.
 Repo: https://github.com/aiptimizer/TurboOCR
    submitted by    /u/Civil-Image5411  
 [link]   [comments]
