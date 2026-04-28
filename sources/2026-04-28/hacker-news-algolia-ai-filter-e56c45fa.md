---
title: 'Show HN: AI memory with biological decay (52% recall)'
url: 'https://github.com/sachitrafa/YourMemory'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-26T20:58:31.000Z'
fetched_at: '2026-04-28T02:04:18.410Z'
---
Most RAG setups fail because they treat memory like a static filing cabinet. When every transient bug fix or abandoned rule is stored forever, the context window eventually chokes on noise, spiking token costs and degrading the agent's reasoning.
This implementation experiments with a biological approach by using the Ebbinghaus forgetting curve to manage context as a living substrate. Memories are assigned a "strength" score where each recall reinforces the data and flattens its decay curve (spaced repetition), while unused data eventually hits a threshold and is pruned.
To solve the "logical neighbor" problem where semantic search misses relevant but non-similar nodes, a graph layer is layered over the vector store. Benchmarked against the LoCoMo dataset, this reached 52% Recall@5, nearly double the accuracy of stateless vector stores, while cutting token waste by roughly 84%.
Built as a local first MCP server using DuckDB, the hypothesis is that for agents handling long-running projects, "what to forget" is just as critical as "what to remember." I'd be interested to hear if others are exploring non-linear decay or similar biological constraints for context management.
GitHub: https://github.com/sachitrafa/cognitive-ai-memory
Comments URL: https://news.ycombinator.com/item?id=47914367
Points: 93
# Comments: 46
