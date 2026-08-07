---
title: >-
  An accurate characterization of the arc of AI is that it is shaped by two
  trends: 1. Moving more and more logic to a neural model for tasks where
  training data can be densely sampl
source: X @fchollet
url: 'https://x.com/fchollet/status/2085382777604591975'
date: 'Thu Aug 06 15:09:33 +0000 2026'
likes: 245
reposts: 16
replies: 18
source_type: x
language: en
account_name: François Chollet
fetched_at: '2026-08-07T11:04:22.706Z'
---
An accurate characterization of the arc of AI is that it is shaped by two trends:

1. Moving more and more logic to a neural model for tasks where training data can be densely sampled (e.g. the shift from pre-DL feature engineering to end-to-end learning circa 2013-2016, and more recently the trend of baking more and more harness functionality directly into models over time)

2. Achieving more and more powerful / generalizable systems by leveraging those neural models in sophisticated neurosymbolic architectures, e.g. AlphaGo instead of an end-to-end Go-player model (2016), the Waymo neurosymbolic architecture instead of a single end-to-end vehicle control model (early 2020s), TTA LRMs and coding agent harnesses instead of plain LLM inference (now).

As far as I can tell, this dual trend will keep going. You can always do more with a neurosymbolic system than with just the neural model inside it.
