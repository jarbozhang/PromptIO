---
title: >-
  Introducing ASCIITermDraw Bench | Testing the ability of VLMs to Generate and
  Edit ASCII
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v0ltno/introducing_asciitermdraw_bench_testing_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-19T09:17:21.000Z'
fetched_at: '2026-07-19T23:01:24.642Z'
---
ASCIITermDraw-Bench: Can a Model Actually Draw in ASCII?
 Do we really need a image generator to relay our thoughts about -
  
an architecture?
 a topology?
 a cluster og N nodes?
  
Is it possible to let our AI assistants, easily absorb and understand and make possible changes easily relayed to them by us, the creators without much hassle?
 The answer could be: simple, plain-old ASCII images
 With this, introducing ASCIITermDraw, a benchmark with which we aim to evaluate SOTA Vision Language Models on their ability to follow instructions, recognize, and draw ASCII-based images.
 Most benchmarks focus on coding, mathematics, and reasoning, but ASCIITermDraw-Bench evaluates a different capability: whether a model can create accurate diagrams using only plain text, use ASCII -- freely.
 This is more difficult than it may seem. Models can often describe a diagram correctly, but arranging boxes, labels, connections, and arrows with precise layout is a separate challenge.
 The benchmark includes 80 tasks across four areas:
  
Basic Box and layouts
 Network topologies
 Software architecture diagrams
 Image-conditioned diagram editing, where a model must modify a provided diagram while preserving everything it was not asked to change
  
Tasks span multiple difficulty levels and follow a consistent format, making results comparable across categories and models.
 Evaluation
 Each response receives two scores:
  
A structural score that verifies required labels, edges, entities, and relationships
 A semantic score produced by an LLM judge, evaluated five times per task to reduce judge variability
  
Results are aggregated across all 80 tasks, with a 95% confidence interval calculated for the final score. This provides a more rigorous measure than relying on whether a diagram simply appears correct.
 The current leaderboard is:
 - Gemma-4-31B-IT — 73.8% (±4.1)
 - Qwen3.7-Plus — 70.2% (±4.6)
 - Kimi-K2.6 — 61.8% (±6.0)
 - MiniMax-M3 — 59.5% (±6.3)
 - Qwen3.5-9B — 47.0% (±6.4)
 
