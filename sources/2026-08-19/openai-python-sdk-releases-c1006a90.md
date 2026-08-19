---
title: v3.0.0
url: 'https://github.com/openai/openai-python/releases/tag/v3.0.0'
source: OpenAI Python SDK Releases
source_type: rss
language: en
published: '2026-08-12T01:54:46.000Z'
fetched_at: '2026-08-19T11:02:45.915Z'
---
3.0.0 (2026-08-12)
⚠ BREAKING CHANGES
api: HTTPX2 is now the default HTTP client, and httpx is no longer installed automatically. Applications using custom HTTPX clients, transports, or configuration objects must migrate to their HTTPX2 equivalents or use the temporary, runtime-only legacy HTTPX escape hatch. See the HTTPX2 migration guide.
Features
api: migrate to HTTPX2 (#3594)
