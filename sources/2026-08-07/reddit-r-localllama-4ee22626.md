---
title: >-
  I compared even more parsers on 14 PDF-parsing capabilities using different
  types
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vh7bxu/i_compared_even_more_parsers_on_14_pdfparsing/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-06T15:23:50.000Z'
fetched_at: '2026-08-07T11:00:46.506Z'
---
In a previous post, I compared MinerU, Granite-Docling, and PaddleOCR-VL. Many commentors suggested I added their favorite parsers. So I did. And also added some new capabilities to differentiate the top models. Here is the full list of parser compared:
  
MinerU 2.5 (1.2B VLM)
 Granite-Docling (258M VLM)
 PaddleOCR-VL (0.9B VLM)
 XBerg 1.0 (text-layer parser, CPU)
 HURIDOCS PDLA v0.0.35 (VGT layout model + Tesseract)
 LiteParse 2.11 (Tesseract based, CPU)
 Chandra (Datalab's OCR model)
 LightOnOCR-1B
  
What I found:
  
Chandra swept the table: 14 of 14 faithful. Real merged-cell HTML tables, correct LaTeX (display and inline), near perfect on the 1909 cursive, and the only parser of the eight that kept the italics on the 1904 page. On the stain it did the right thing: skipped it instead of guessing. The catches: 91 s/page on an L4
 The handwriting column was a massacre. XBerg, LiteParse and PDLA returned noise or literally nothing (cursive defeats classical OCR). Granite leaked raw DocTags into the output. PaddleOCR-VL read most of it but invented an aristocratic "Maulevrier" for plain "Maude". LightOnOCR wrote fluent, confident, wrong text over the illegible stain, which is the failure you'd be most worried about given the use case
 LightOnOCR-1B is impressive for its size: real LaTeX, clean pipe tables, 7.9 s/page on an L4. But it dropped the end of one page mid-sentence and hallucinated on the handwriting.
  
Same disclosure as before: the three original VLM rows ran on hexread.com (my product), everything else ran locally or an L4.
 EDIT: Sources, raw outputs, test files and scripts are in this repo for reference: alaamroue/pdf-parser-bench
    submitted by    /u/LowerGears  
 [link]   [comments]
