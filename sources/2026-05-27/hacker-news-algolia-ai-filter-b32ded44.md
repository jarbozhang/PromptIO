---
title: 'Models.dev: open-source database of AI model specs, pricing, and capabilities'
url: 'https://github.com/anomalyco/models.dev'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-22T20:26:07.000Z'
fetched_at: '2026-05-27T01:18:31.403Z'
---
Article URL: https://github.com/anomalyco/models.dev
Comments URL: https://news.ycombinator.com/item?id=48241172
Points: 159
# Comments: 28

Supplemental context gathered 2026-05-27:

- GitHub repo: anomalyco/models.dev
- Description: An open-source database of AI models.
- Stars at fetch time: 4277
- Forks at fetch time: 1006
- Created: 2025-06-04
- Latest push observed: 2026-05-27T01:21:03Z
- Default branch: dev
- Project site/API: https://models.dev and https://models.dev/api.json

README summary:

Models.dev describes itself as a comprehensive open-source database of AI model specifications,
pricing, and capabilities. The project says there is no single database with information about all
available AI models, so it is community-contributed and also used internally in opencode.

The API can be accessed with:

```bash
curl https://models.dev/api.json
```

The README says the Model ID field can be used for lookup and matches the identifier used by AI SDK.
The repo stores data as TOML files organized by provider and model, then generates the website and
API. Provider definitions include name, npm package, auth environment variables, documentation URL,
and optional OpenAI-compatible base URL. Model definitions include capability flags such as file
attachments, reasoning, tool calling, structured output, temperature support, knowledge cutoff,
release date, update date, open-weight status, cost per million tokens, context/input/output limits,
and supported modalities.
