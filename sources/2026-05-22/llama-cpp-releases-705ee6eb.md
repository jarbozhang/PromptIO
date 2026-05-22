---
title: b9270
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9270'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-21T19:53:55.000Z'
fetched_at: '2026-05-22T00:18:34.629Z'
---
vocab : add Carbon-3B (HybridDNATokenizer) support (#23410)
vocab : add Carbon-3B (HybridDNATokenizer) support
Adds a new BPE pre-type LLAMA_VOCAB_PRE_TYPE_CARBON for the
src/llama-vocab.{h,cpp}: new pre-type, dispatched from
src/llama-vocab-carbon.h: pure helpers (tokenize_carbon,
conversion/base.py: detect HybridDNATokenizer by class name in
tests/test-tokenizer-carbon.cpp: 12 cases covering single 6-mer,
vocab : align Carbon-3B changes with llama.cpp conventions
Fold tokenize_carbon + emit_dna_kmers inline into
Replace the standalone unit test with the conventional
Register "carbon" in convert_hf_to_gguf_update.py's model list
vocab : move Carbon dispatch to _set_vocab_carbon + LlamaModel branch
Refactor the conversion-side changes to follow the per-tokenizer-family
conversion/base.py: add _set_vocab_carbon — self-contained, loads
conversion/llama.py: branch in LlamaModel.set_vocab on
conversion/base.py: revert the conditional in get_vocab_base and the
tests : expand ggml-vocab-carbon.gguf fixtures with model-card examples
Add 6 cases from the Carbon-3B model card on top of the existing edge
vocab : promote HybridDNATokenizer to its own LLAMA_VOCAB_TYPE
Refactor per upstream review:
This should be its own tokenizer model, ie. carbonhybriddna instead
Previously the tokenizer was modelled as LLAMA_VOCAB_TYPE_BPE plus a
This change moves it to its own vocab type, peer to PLAMO2, with the
include/llama.h: new LLAMA_VOCAB_TYPE_HYBRIDDNA = 7.
src/llama-vocab.cpp: new llm_tokenizer_hybriddna + session that
src/llama-vocab.h: drop the short-lived LLAMA_VOCAB_PRE_TYPE_CARBON.
conversion/base.py: _set_vocab_hybriddna writes
conversion/llama.py: dispatch on tokenizer_class ==
models/ggml-vocab-hybriddna.gguf{,.inp,.out}: renamed fixture +
convert_hf_to_gguf_update.py: drop the stale chkhsh entry and
Verified end-to-end against HuggingFaceBio/Carbon-{500M,3B,8B}:
vocab : relax llm_tokenizer_bpe assert to allow HYBRIDDNA
vocab : drop llm_tokenizer_bpe vocab-type assert
vocab 
