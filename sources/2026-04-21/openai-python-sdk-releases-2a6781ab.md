---
title: v2.31.0
url: 'https://github.com/openai/openai-python/releases/tag/v2.31.0'
source: OpenAI Python SDK Releases
source_type: rss
language: en
published: '2026-04-08T21:01:00.000Z'
fetched_at: '2026-04-21T00:54:46.846Z'
---
2.31.0 (2026-04-08)
Full Changelog: v2.30.0...v2.31.0
Features
api: add phase field to conversations message (3e5834e)
api: add web_search_call.results to ResponseIncludable type (ffd8741)
client: add support for short-lived tokens (#1608) (22fe722)
client: support sending raw data over websockets (f1bc52e)
internal: implement indices array format for query and form serialization (49194cf)
Bug Fixes
client: preserve hardcoded query params when merging with user params (92e109c)
types: remove web_search_call.results from ResponseIncludable (d3cc401)
Chores
tests: bump steady to v0.20.1 (d60e2ee)
tests: bump steady to v0.20.2 (6508d47)
Documentation
api: update file parameter descriptions in vector_stores files and file_batches (a9e7ebd)
