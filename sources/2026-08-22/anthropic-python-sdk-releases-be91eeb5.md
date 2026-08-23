---
title: v0.123.0
url: 'https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.123.0'
source: Anthropic Python SDK Releases
source_type: rss
language: en
published: '2026-08-19T13:31:54.000Z'
fetched_at: '2026-08-22T11:02:25.711Z'
---
0.123.0 (2026-08-18)
Full Changelog: v0.122.0...v0.123.0
Features
api: additions to files and memory stores (09ce187)
api: updates to skill, files, and user profiles (c6cbffd)
client: add helpers for accessing the workspace ID in response headers (f79882b)
Bug Fixes
api: remove unsupported mid_conv_system content block (6f15b8d)
client: compute platform headers without spawning a subprocess (baca9f4)
client: export custom status errors from _exceptions.all (#459) (2950ec4)
client: export ServiceUnavailableError and DeadlineExceededError from the package root (#468) (0dcd06d)
session-runner: retry tool-result sends for at least the lease TTL (#453) (e1a4891)
tools: run synchronous session tools in a worker thread (#399) (8f88c57)
Chores
examples: remove legacy Text Completions API examples (cf5c768)
internal: remove leftover prism references (826ba7a)
