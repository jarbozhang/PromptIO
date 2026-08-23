---
title: >-
  OpenMed 1.8: Apache-2.0 clinical de-identification that runs fully local, now
  on Android, iOS, and in the browser. 400+ open issues if you want in on 1.9
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1urt5o4/openmed_18_apache20_clinical_deidentification/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T15:13:59.000Z'
fetched_at: '2026-07-09T23:01:04.806Z'
---
Maintainer here. OpenMed is an Apache-2.0 toolkit for clinical NLP with one hard rule: patient data never leaves your hardware. No cloud calls, no API keys, works in airplane mode.
 What shipped in 1.8 this week:
  
OpenMedKit for Android (Kotlin, ONNX Runtime Mobile + ML Kit OCR): read a document, strip every name/MRN/date, entirely on the phone. iOS/Swift and React Native bridges landed too.
 Browser runtime: de-identification via Transformers.js / ONNX Runtime Web with wasm + WebGPU backends. Fully client-side, zero server calls.
 verify-pdf: most "redacted" PDFs just draw a black box while the text layer underneath survives (copy-paste pulls the name right out). This fails your redaction unless the text is actually gone.
 DICOM de-id (incl. burned-in pixel text via OCR), 5 new language ID packs, 5 new clinical NER domains.
  
The models: 1500+ on HF, all Apache 2.0. The PII ones run via MLX (Apple silicon), GGUF/llama.cpp, ONNX, or plain transformers. Two of them are currently 1st and 2nd on the (independent) PII Masking Benchmark English board, and the 44M-param one at rank 4 is small enough for a phone.
 The actual reason I'm posting: 1.9 is being built in the open right now and there are 400+ open issues. Some genuinely fun starter ones:
  
Add a PII language pack for YOUR country, with its national-ID validator (Estonian isikukood #891, Serbian JMBG #890, Croatian OIB #889, Bulgarian EGN #888 are open — more welcome)
 New clinical NER domains: pediatrics growth parameters #896, pulmonology/spirometry #893, immunization #897
 RTF #856 / ODT #857 text extraction with char-offset maps
  
11 outside contributors shipped code in 1.8; several started with exactly these. If local, private, medical AI is your thing: pick an issue, say hi in it, and you're part of the next release.
 Repo: https://github.com/maziyarpanahi/openmed Models: https://huggingface.co/OpenMed Good first issues: https://github.com/maziyarpanahi/openmed/issues?q=is%3Aissue+is%3Aopen+label%3A%22
