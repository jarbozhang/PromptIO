---
title: Real-Time Voice AI Hears but Does Not Listen
url: 'https://arxiv.org/abs/2606.26083v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Martijn Bartelds
  - Federico Bianchi
  - James Zou
categories:
  - cs.CL
  - eess.AS
  - cs.CL
published: '2026-06-24T17:55:38Z'
fetched_at: '2026-06-25T07:41:52.266Z'
---
Speech conveys information through both words and vocal delivery. We evaluate four leading production realtime voice systems-OpenAI's GPT Realtime 2, Google's Gemini 3.1 Flash Live, and Alibaba's Qwen3.5 Omni Plus and Omni Flash-on tasks where the words and the delivery patterns both convey meaningful information. Across three consequential scenarios, all four systems act on the words rather than the voice. They end calls with crying callers who insist nothing is wrong, approve wire transfers authorized in frightened voices, and enroll callers whose agreement is clearly sarcastic. Surprisingly, this is often not a failure of perception. When asked directly, three of the four systems reliably identify the distress, fear, or sarcasm they later ignore when making decisions. We observe a similar pattern when these realtime voice systems estimate accent and age, as their responses frequently follow the biases of the words rather than the acoustic properties of the speaker. We term this disconnect between perception and action the emotional intelligence gap of voice AI. Prompting systems to explicitly attend to vocal delivery improves performance only partially and inconsistently. Our findings show that current realtime voice AI systems often behave as if speech had been reduced to a transcript, suggesting that they should be used with caution in settings where the tone and emotion of delivery convey important information.

Authors: Martijn Bartelds, Federico Bianchi, James Zou
Categories: cs.CL, eess.AS, cs.CL
