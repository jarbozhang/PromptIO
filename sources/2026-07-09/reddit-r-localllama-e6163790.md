---
title: Can you trust local models to answer accurately?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uqpxgp/can_you_trust_local_models_to_answer_accurately/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T11:28:51.000Z'
fetched_at: '2026-07-08T23:01:51.229Z'
---
My goal is to improve as a developer, thus I needed to know if local llms can answer technical questions accurately
 The conclusion is that without rag they don't do too well, but with rag they are very good.
 Thinking didn't really help, and took so long I only got the scores for e2b and e4b, the rest are still running, it was like only +1% point for thinking.
 This is what I did:
 - Downloaded the markdown docs from the github repos for the listed projects (Node, Langchain.js, typescript, transformers.js and vue)
 - Used deepseek-v4-flash to generate multiple choice questions based on each markdown file.
 - Benchmarked the unsloth gemma QAT models with thinking disabled on all of these questions
 - Benchmarked the unsloth gemma QAT models with thinking disabled on all of these questions with the correct document added (oracle column)
 - Built a RAG system and benchmarked all the models with thinking disabled, the rag system was not limited to the correct document set as I didn't want to need to select the relevant docset whenever I ask my local llm a question.
 Was pretty happy that the RAG system worked, it took a fair bit of effort tweaking it to work.
 So TLDR - local llms, pretty awesome when hooked up to a knowledge base and RAG injects relevant documents before it answers questions.
 This is a follow on post from my original experiments - now I've included apple intelligence and qwen models as well.
 Note on apple intelligence, it only has a context length of around 4k, whereas the other models I gave them a context length of 32k. Many of the orcale documents where more than 4k tokens and the rag context injection for the top 5 results also exceeded 4k, so apple intelligence was ran with only top 3 results.
 So a score of 86% for apple intelligence is pretty strong for a tiny llm included on your device.
 Edit: Note: Apple Intelligence being tested is AFM 2 3b on device. Thanks to u/mcqwerty197 for pointing that out
 Edit: These numbers are based on 7,648 mu
