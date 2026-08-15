---
title: v0.122.0
url: 'https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.122.0'
source: Anthropic Python SDK Releases
source_type: rss
language: en
published: '2026-08-13T18:35:49.000Z'
fetched_at: '2026-08-15T11:02:10.420Z'
---
0.122.0 (2026-08-13)
Full Changelog: v0.121.0...v0.122.0
Features
api: add output_behavior to dream creation (create a new memory store or update the input store in place) (852c4bb)
Bug Fixes
bedrock,aws: run SigV4 signing off the event loop in async clients (#334) (2bae6c8)
bedrock: expose beta.messages.parse, stream and tool_runner (#366) (6eca7bb)
client: add models (52e9d94)
client: keep token exchange bound per client across copy() (#388) (c13e6e3)
client: read PathLike contents passed inside a file tuple (070f953)
client: treat empty ANTHROPIC_API_KEY / ANTHROPIC_AUTH_TOKEN as unset (#341) (76a2e68)
streaming: add context to malformed tool input JSON errors in the non-beta accumulator (#339) (a343e17)
streaming: apply all message_delta fields when accumulating streamed messages (#380) (fc1599b)
streaming: emit input_json events for server tool use blocks (#336) (ccfc8e1)
streaming: keep omitted content block fields unset in accumulated messages (#346) (cd40aab)
streaming: run the request transform once in messages.stream() (#347) (81a92da)
streaming: silence pydantic serializer warnings on message_stop events (#338) (41f9cdc)
tools: reject symlink loops in tool paths and skip special skill-archive members (#322) (43e8669)
vertex: expose beta.messages.parse and tool_runner (#367) (96723a0)
Chores
ci: run breaking-change detection as a ci.yml job on every push (6dfd16e)
examples: update messages_stream.py shebang from rye to uv (#1519) (7d72364)
internal: codegen related update (21a0e3d)
internal: drop remaining references to black (13df390)
internal: remove misc things (d6ee99e)
tests: use pytest monkeypatch and fakes instead of unittest.mock (55d246f)
tests: use pytest monkeypatch instead of unittest.mock (e0c6488)
Documentation
api: clarify that user profile name is optional for resold profiles (b8f9f61)
fix fulfillment typos in session runner (#1795) (009b035)
fix incorrect docstring in AsyncAnthropicFoundry.models (#1592) (f1f5e9b)
Refactors
use the not_giv
