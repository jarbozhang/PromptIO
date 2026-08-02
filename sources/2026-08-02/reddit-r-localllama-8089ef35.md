---
title: Xberg v1 is out
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1vdd795/xberg_v1_is_out/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T09:06:51.000Z'
fetched_at: '2026-08-02T11:00:59.751Z'
---
Hi all,
 I'm happy to announce that Xberg v1 is out.
 Xberg is the successor to Kreuzberg, equivalent to what would have been Kreuzberg v5. It's a content intelligence framework that handles a very wide range of inputs: documents (currently 101 formats), code and data formats (currently 367 types), audio/video transcription, and URLs (both static and JS-rendered content). It extracts and prepares that content for downstream processing.
 It's an extremely efficient, high-performance engine (see our PDF benchmarks below). For PDFs and images specifically, we handle native PDFs with very high performance and accuracy, and we ship multiple OCR engines that match the quality of the best Python libraries (e.g. docling, PaddleOCR, RapidOCR) at substantially better performance and stability.
 The changes between Kreuzberg v4 and Xberg v1 are substantial, and I invite you to read the full changelog for the complete picture. The highlights below give a sense of what's new:
  
Pure-Rust PDF backend (pdf_oxide) replaces pdfium, with no native pdfium dependency.
 Layout-aware pipeline: reading order reconstructed with ONNX layout detection (PP-DocLayoutV3 / RT-DETR) and Docling-style predecessor-graph reordering.
 Per-page scanned-page detection with selective OCR, plus AcroForm/XFA form fields and outline-based headings.
 Across-the-board optimization of OCR and PDF extraction (memory discipline, pooled model sessions, streamed conversions).
 Native PaddleOCR backend (PP-OCRv6, with medium / small / tiny tiers) alongside Tesseract.
 Pure-Rust Candle OCR/VLM stack (TrOCR, GLM-OCR, GOT-OCR, DeepSeek-OCR, and PaddleOCR-VL) running without ONNX Runtime or native Tesseract.
 A second, ONNX-Runtime-free inference path via tract, which is what makes in-browser (WASM) and mobile inference possible.
 Named-entity recognition natively in Rust (GLiNER2), extensible to all bindings, including an in-browser WASM model with no server round-trip.
 Structured LLM extraction (extract_structured
