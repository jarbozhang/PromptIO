---
title: >-
  If You Already Pay for an LLM Service, Running Local Embeddings and Rerankers
  Feels More Useful Than Running Local LLMs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1us3li5/if_you_already_pay_for_an_llm_service_running/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T21:26:10.000Z'
fetched_at: '2026-07-09T23:01:04.804Z'
---
https://preview.redd.it/v0xtn3jdu9ch1.png?width=2047&format=png&auto=webp&s=628a6a541fe5f097d0f771ae0ba3b7f44126198f
 https://preview.redd.it/vjxiucsdu9ch1.png?width=2047&format=png&auto=webp&s=74f7a18a5a30276e206e2bfb5a0c529826ce86e4
 This post was originally written in Korean, then polished and translated into English using ChatGPT.
 I do run llama.cpp locally on a Tesla P40, but as someone who already pays for ChatGPT Pro, I was gradually losing the practical reason to keep running local LLMs like Qwen 3.6 27B or Gemma 4 31B. If I need access to OpenAI models through an API-like workflow, I can usually just use Codex OAuth instead.
 But then I realized that embedding models and reranker models are not something I can access through Codex in the same way. That gave me a more practical reason to use local AI, not just as a hobby or for fun, but as something that can actually improve productivity: a memory MCP for LLMs.
 With the Codex app, GPT-based models are almost unlimited for me under ChatGPT Pro, but embedding and reranker models still almost always require paid API usage. So instead of focusing on running a local LLM, I decided to use Qwen3 Embedding 4B and Qwen3 Reranker 4B locally to build an LLM memory system through GBrain.
 The stack is roughly llama.cpp, PostgreSQL, pgvector, Ceph for the S3 API, and GitLab for storing memories as Markdown files.
 The workflow looks like this: when I use Codex, ChatGPT Web, or another client, anything I explicitly ask to remember, or anything the system considers important, is saved to GBrain through an MCP interface as a Markdown file. GBrain then indexes those files, generates embeddings for them, and uses an LLM to extract facts from each Markdown-based memory.
 Later, when a memory lookup request comes in through MCP, GBrain first retrieves potentially relevant memories using the embedding model. Then it uses the reranker model to narrow the results down to the most relevant memories before returning them.
 I think
