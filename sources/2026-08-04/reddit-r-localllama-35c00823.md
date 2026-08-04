---
title: >-
  I compared MinerU, Granite-Docling, and PaddleOCR-VL on 12 PDF-parsing
  capabilities using 6 document types
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vecxhw/i_compared_mineru_granitedocling_and_paddleocrvl/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T13:07:03.000Z'
fetched_at: '2026-08-04T11:01:38.798Z'
---
I tested them by sending the 6 documents, each meant to represent a different document type, through my own webapp and comparing every output against the source. All ran on the same L4 GPU.
 The documents:
  
Financial statements with merged multi-level headers (A typical annual report)
 Two pages of a two-column arXiv paper ("Deep Residual Learning for Image Recognition")
 Scanned German invoice with no text layer
 French municipal report with an embedded bar chart
 Typical datasheet page mixing German, French, Chinese and Russian
 A 2-page, 3-column newsletter article
  
Things to note:
  
One thing the capability grades don't show: Granite-Docling is the only one that outputs markdown-native pipe tables and real heading levels (MinerU gives you HTML tables and promotes everything to #), so on clean digital documents its raw markdown is the nicest to actually read.
 MinerU quietly read a bar chart and returned the values as a table, and wrote its own description of an embedded image (tagged as generated).
 MinerU seemed to dropped the invoice's IBAN from the footer. But the model actually transcribes it yet the MinerU's markdown generator silently discards anything it classifies as page furniture (i.e things like footers, page numbers, fine print....), and there's no option or configuration to acutally change this behavior. So I rebuild the markdown from its block list instead, and re-ran that column, to give a fair comparison. If you are using stock MinerU's .md output, you're likely have footers missing.
  
If anyone is interested in how these models compare in handling other document types, let me know and I'd be happy to compare them. I ran this benchmark using my own API provided via my own service ( hexread.com ). You can also test your PDFs directly on the website (there’s a free trial but you only get automatic model selection with that).
    submitted by    /u/LowerGears  
 [link]   [comments]
