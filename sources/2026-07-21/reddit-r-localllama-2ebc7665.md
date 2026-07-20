---
title: >-
  Fractale-350M-base: memory as trained behaviour instead of long context, a
  fully open research release
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v174ql/fractale350mbase_memory_as_trained_behaviour/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T00:57:32.000Z'
fetched_at: '2026-07-20T23:00:57.698Z'
---
Some of you may remember my post about the research project behind this: a trained fast-weight memory, with the paper and the full research log at github.com/kkuette/thought-bank. This is the follow-up. The first public model of the series is out.
 Quick context: solo researcher, one RTX 3090 for everything below 97M params, openly working with Claude for implementation and write-ups. Direction and judgment are mine.
 What it is. Fractale-350M-base is a 386M-param base model pretrained from scratch on 10B tokens (code + English web) around one idea: the model's only long-term memory is a bank of 8 vectors it writes to itself, one gist vector per 512-token chunk, oldest evicted FIFO. The bank is read back as fast weights: each slot expands through a hypernet into a small low-rank MLP that the token stream passes through. Not retrieval, not attention over stored text. The memory becomes part of the forward pass.
 The context window is deliberately tiny (512-token chunks). Each chunk is a separate forward pass, so anything older than the current chunk can only reach the prediction through those 8 vectors. The pretraining objective forces the bank to matter: predict the opening of the next, never-seen chunk of a document from the bank alone (blank input).
 What's measurable. GAP = CE(reset bank) minus CE(carried bank) on held-out documents: +9.4 nats on code (CE 12.9 reset vs 3.45 carried) and +7.3 nats on web at the final checkpoint, flat from 2 to 8 chunks written (no FIFO cliff). And the gap widened from both sides during training: the bank-only arm kept sharpening while the no-bank arm degraded, meaning the model grew more dependent on its memory as pretraining progressed. At smaller scales, with exact controls: content is addressable by cues, survives eviction for 2000+ steps, and transfers docstring to code in both directions. From the paper (3M-scale mechanism, DOI on Zenodo): a single 13-token presentation installs a never-trained rule at 0.79 to 1.00 accuracy o
