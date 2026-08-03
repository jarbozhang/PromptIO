---
title: Vacuum 16T
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1vdh1us/vacuum_16t/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T12:39:00.000Z'
fetched_at: '2026-08-03T11:01:09.274Z'
---
https://huggingface.co/tsfrm/vacuum-16t
 A 16.5-trillion-parameter model that contains nothing. This model is just a ████ you to the labs and companies who say that "haha I have the biggest model out there!". We the people with shitty laptops want to get a record. And I now have a record for a temporary amount of time of about 16.5 trillion parameters and use for them so its completly useless.
 What it demonstrates
 Hugging Face computes a repository's parameter count from safetensors headers alone — it sums prod(shape) per tensor and never reads the tensor data. The count is therefore whatever the headers declare. Here they declare 3,841 tensors of shape [65536, 65536] in F4 (4 bits/param) across 385 shards, plus one [4294967296, 1] position-embedding tensor in a 386th.
 That is enough to place this repo at the top of the Hub sorted by num_parameters, above every real frontier model, while containing no information whatsoever. That juxtaposition is the entire point.
 The files are honest about their own size. Every byte the headers declare is really written and really uploaded: safetensors parses each header and its full-coverage check passes. Truncating a file, or overlapping two tensors so they share bytes, would make the count cheaper — both are rejected by the format, and neither is used here. The bytes are simply all 0x00.
 Real cost — measured
 |---|---| | Declared parameters | 16,501,264,351,232 | | Declared bytes | 8,250,632,175,616 (8.25 TB) | | Storage quota consumed | 8.25 TB — quota bills declared bytes | | Shard headers (all distinct) | 373,835 B | | model.safetensors.index.json | ~269,000 B | | Deduplicated weight data | 65,536 B (one 64 KiB block) | | Bytes actually transferred | ~692 KB | | Ratio | ~11,900,000 : 1 |
 The gap between the last rows and the third is the useful finding. Xet content-defined chunking deduplicates the transfer: every 64 KiB block is byte-identical, so it hashes to one chunk and crosses the wire once. Measured on a 500 MB t
