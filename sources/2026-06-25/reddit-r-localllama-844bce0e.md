---
title: >-
  How Baidu's newly released Unlimited-OCR transcribes dozens of pages in one
  forward pass
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ueanx0/how_baidus_newly_released_unlimitedocr/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T11:17:32.000Z'
fetched_at: '2026-06-25T07:40:38.232Z'
---
https://reddit.com/link/1ueanx0/video/gc21db02j89h1/player
 Baidu released Unlimited-OCR 2 days ago, and they claim it can transcribe dozens of pages in one forward pass.
 I read the research paper, and decided to make a post (link if anyone's interested)
 Problem they are solving
 The problem it targets basically well known. end-to-end OCR models transcribe a page one token at a time, and each new token attends back over everything generated so far. the accumulated KV cache drives up memory and progressively slows generation as the output grows . in practice that means page 20 costs far more than page 1, which is why most pipelines chunk a PDF page by page and stitch the results.
 Their Fix
 Their fix is a new attention mechanism, Reference Sliding Window Attention (R-SWA). the framing in the paper is: when a human copies a document, you don't re scan everything you've already written, you just glance at the surrounding context to stay oriented. R-SWA encodes that directly. the visual tokens (the encoded image) are treated as reference and stay fully visible to every generated token, while the generated text only attends to a sliding window of the previous n tokens, 128 by default.
 Based on Deepseek ocr
 The encoder is inherited from DeepSeek-OCR, which compresses a 1024x1024 page into roughly 256 visual tokens. Baidu took DeepSeek-OCR as the baseline and replaced all the decoder's attention layers with R-SWA. everything else is inherited, the encoder, the 16x image compression, and the MoE setup (3B total params, only 500M active per token) all come straight from DeepSeek.
 Note:
 On benchmarks they report 93.92% on OmniDocBench v1.6 against DeepSeek-OCR's 87.01% on v1.5, though those are vendor-reported and on slightly different benchmark versions, so worth waiting for independent evaluation before drawing firm conclusions.
 The model is MIT licensed and available on hugging face, modelscope.
 hugging face: https://huggingface.co/baidu/Unlimited-OCR
 modelscope:
