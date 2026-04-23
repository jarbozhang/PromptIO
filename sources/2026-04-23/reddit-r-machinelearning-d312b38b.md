---
title: >-
  I can't believe text normalization is so underdiscussed in streaming
  text-to-speech [D]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1ssk7rk/i_cant_believe_text_normalization_is_so/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-22T12:35:44.000Z'
fetched_at: '2026-04-23T02:21:55.516Z'
---
Kinda suprises me how little discussion there is around about mistakes in streaming TTS models
 People look for natural readers, high voice quality, expressive speech. And most models don't look dumb here and fail. They fail when you give them basic stuff like price, dates, URLs, promo codes, phone numbers.
 So I was looking for some info and found a benchmark that compares commercial real time streaming TTS models in terms of how they pronounce dates, URLs, acronyms, etc. They are checking 1000+ sentences in 31 categories then use Gemini to see how results came out. https://async-vocie-ai-text-to-speech-normalization-benchmark.static.hf.space/index.html . Looks valid to me.
 Obviously this is a vendor benchmark so I am not taking it for granted but the focus feels on point.
 This has been one of the biggest challenges for us in the production.I am curious how you guys deal with it in practice.
    submitted by    /u/lilitbroyan  
 [link]   [comments]
