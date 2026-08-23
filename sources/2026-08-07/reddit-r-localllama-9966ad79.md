---
title: nvidia/NVIDIA-Nemotron-Parse-2.0 · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vh7lzy/nvidianvidianemotronparse20_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T15:34:01.000Z'
fetched_at: '2026-08-07T11:00:46.507Z'
---
NVIDIA Nemotron Parse 2.0 transforms document images into structured, machine-readable representations with text, layout classes, bounding boxes, and reading-order information. Given a Red, Green, Blue (RGB) document image and a task prompt, the model produces formatted text and spatial annotations for document elements such as titles, paragraphs, captions, tables, charts, page headers, page footers, footnotes, pictures, and bibliography entries. Compared with NVIDIA Nemotron Parse v1.2, NVIDIA Nemotron Parse 2.0 adds an approximately 20k-token vocabulary expansion for more efficient multilingual support, chart-aware document parsing with the <class_Chart> class token, and updated training coverage for chart/table-heavy documents. NVIDIA Nemotron Parse 2.0 is intended for document understanding, information retrieval, data extraction, and multimodal data-curation workflows.
 This model is ready for commercial or non-commercial use.
 Use Case:
 NVIDIA Nemotron Parse 2.0 is designed for developers and teams building document intelligence, retrieval-augmented generation (RAG), curator, extractor, and agentic AI applications. It can be used to convert scanned or rendered PDFs, presentation slides, forms, reports, tables, and mixed-content document pages into structured outputs for downstream indexing, retrieval, analytics, model training-data creation, and human-in-the-loop review.
 Capability Highlights:
  
Expanded multilingual OCR support, with substantial gains on CJK and Indic-script document text.
 Improved handwritten-text extraction for document pages containing informal, handwritten, or note-like content.
 Chart-to-table parsing that can identify chart regions and convert visible chart information into structured text for downstream use.
 Improved table handling, including stronger table detection, structure recovery, and text extraction on table-heavy documents.
  
   submitted by    /u/pmttyji  
 [link]   [comments]
