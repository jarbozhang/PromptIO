---
title: 'Show HN: Statewright – Visual state machines that make AI agents reliable'
url: 'https://github.com/statewright/statewright'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-12T14:24:55.000Z'
fetched_at: '2026-05-13T10:19:12.989Z'
---
Agentic problem solving in its current state is very brittle.  I fell in love with it, but it creates as many problems as it solves.
I'm Ben Cochran, I spent 20+ years in the trenches with full-stack Engineering, DevOps, high performance computing & ML with stints at NVIDIA, AMD and various other organizations most recently as a Distinguished Engineer.
For agents to work reliably you either need massive parameter counts or massive context windows to keep the solution spaces workable. Most people are brute forcing reliability with bigger models and longer prompts.
What if I made the problem smaller instead of making the model bigger?
I took a different approach by using smaller models: models in the 13-20B parameter range and set them to task solving real SWE-bench problems. I constrained the tool and solution spaces using formal state machines. Each state in the machine defines which tools the model can access, how many iterations it gets and what transitions are valid. A planning state gets read-only tools.  An implementation state gets edit tools (scoped to prevent mega edits) and write friendly bash tools. The testing state gets bash but only for testing commands.  The model cannot physically skip steps or use the wrong tool at the wrong time. It is enforced via protocol, not via prompts.
The results were more promising than I would have expected. Across multiple model families irrespective of age (qwen-coder, gpt-oss, gemma4) and the improvements were consistent above the 13B parameter inflection point. Below that, models can navigate the state machine but can't retain enough context to produce accurate edits. More on the research bit: https://statewright.ai/research
Surprisingly this yielded improvements in frontier models as well. Haiku and Sonnet start to punch above their weight and Opus solves more reliably with fewer tokens and death spirals.  Fine tuning did not yield these kinds of functional improvements for me. The takeaway it seems is that context win
