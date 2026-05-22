---
title: v2.34.0
url: 'https://github.com/openai/openai-python/releases/tag/v2.34.0'
source: OpenAI Python SDK Releases
source_type: rss
language: en
published: '2026-05-04T17:33:53.000Z'
fetched_at: '2026-05-22T00:18:36.834Z'
---
2.34.0 (2026-05-04)
Full Changelog: v2.33.0...v2.34.0
Features
api: add external_key_id to projects, email/metadata params to users, update types (2d232ee)
api: add support for Admin API Keys per endpoint (b8b176a)
api: admin API updates (4ae1138)
api: manual updates (c1870f1)
api: manual updates (f6bb9c7)
support setting headers via env (1e89d8b)
Bug Fixes
allow explicit Azure auth headers (a0626ba)
api: correct prompt_cache_retention enum value from in-memory to in_memory (d47d9f0)
api: preserve python api key attribute type (62607f6)
api: resolve python auth type checks (42a31a7)
api: support admin api key auth (f029eb9)
avoid bearer fallback for admin auth (22e01a8)
preserve selected auth credentials (0d27f9d)
require bearer auth for stream helpers (d055539)
types: correct created_at and completed_at to float in Response (7da4b88)
types: correct timestamp types to int in Response model (e55631c)
use correct field name format for multipart file arrays (9ee4825)
Performance Improvements
client: optimize file structure copying in multipart requests (dca474e)
Chores
internal: more robust bootstrap script (9ec1600)
internal: reformat pyproject.toml (12ad57b)
tests: bump steady to v0.22.1 (486dfed)
Documentation
api: add rate limit and vector store info to files create (4f776df)
api: update files rate limit documentation (b141a20)
