---
title: Patch release v5.10.4
url: 'https://github.com/huggingface/transformers/releases/tag/v5.10.3'
source: Transformers Releases
source_type: rss
language: en
published: '2026-06-19T13:25:50.000Z'
fetched_at: '2026-07-22T11:02:25.369Z'
---
Patch release v5.10.4
Update: Note that on pypi 5.10.3 doesn't exist and this this saved under 5.10.4 (so essentially a minor version skipped). Sorry about that, that's on me. Just wanted to clarify to make this less confusing!
A few fixes needed for vLLM to sync with transformers 🤗
[fix] regression introduced by #45534 #46456 by @eustlb (#46456)
Fix {image/video/audio}_token_ids in ProcessorMixin #46500 by @hmellor (#46500)
Fix InternVL models #46524 by @hmellor (#46524)
Fix the offsets in processing #46525 by @zucchini-nlp (#46525)
Fix peft lower bound #46605 by @hmellor (#46605)
mistral common backend fix #46667 by @itazap (#46667)
Full Changelog: v5.10.2...v5.10.3
