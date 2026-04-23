---
title: 'Show HN: GoModel – an open-source AI gateway in Go'
url: 'https://github.com/ENTERPILOT/GOModel/'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-21T14:11:53.000Z'
fetched_at: '2026-04-23T02:21:54.225Z'
---
Hi, I’m Jakub, a solo founder based in Warsaw.
I’ve been building GoModel since December with a couple of contributors. It's an open-source AI gateway that sits between your app and model providers like OpenAI, Anthropic or others.
I built it for my startup to solve a few problems:
  - track AI usage and cost per client or team
  - switch models without changing app code
  - debug request flows more easily
  - reduce AI spendings with exact and semantic caching

  - ~17MB docker image
    - LiteLLM's image is more than 44x bigger ("docker.litellm.ai/berriai/litellm:latest" ~ 746 MB on amd64)
  - request workflow is visible and easy to inspect    
  - config is environment-variable-first by default

Website: https://gomodel.enterpilot.io
Any feedback is appreciated.
Comments URL: https://news.ycombinator.com/item?id=47849097
Points: 195
# Comments: 71
