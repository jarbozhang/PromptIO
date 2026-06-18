---
title: Firecrawl v2.10 release highlights for agent web data
url: https://github.com/firecrawl/firecrawl/releases/tag/v2.10
source: Firecrawl GitHub Release
source_type: release
language: en
published: '2026-05-15T17:34:45Z'
fetched_at: '2026-06-18T09:34:00Z'
stars: 134349
---
Firecrawl v2.10 focuses on making web and document data more useful for AI agents. The project describes itself as an API to search, scrape, and interact with the web at scale, returning clean Markdown or structured data.

Confirmed v2.10 additions:

- `/parse` endpoint. Upload local files including PDF, DOCX, DOC, ODT, RTF, XLSX, XLS, and HTML up to 50 MB, and get back clean Markdown, JSON, or a summary. Tables and reading order are preserved.
- Lockdown Mode. Set `lockdown: true` on `/scrape` to serve results from Firecrawl's index only, with gated outbound paths and zero data retention defaults.
- `question` format. Pass a natural-language prompt to `/scrape` and receive a grounded answer in `data.question`.
- `highlights` format. Return exact sentences, code blocks, and table rows from the source page that match the query, including reconstructed Markdown tables.
- `video` format. Scrape can return a signed downloadable video URL for supported sites, with explicit Lockdown gating.
- Search domain filters. `/search` adds `includeDomains` and `excludeDomains`.
- Search feedback endpoint. `POST /v2/search/:jobId/feedback` accepts ratings on search results with idempotent retries.
- Custom robots user agent. Crawl requests can evaluate robots rules against a custom agent string.
- SDK expansion. Official Go, Ruby, PHP, .NET, Rust, and Elixir updates are included.
- Fixes include multiple CVE resolutions, cache and billing fixes, PDF parsing fixes, Playwright service behavior, and crawler timeout bounds.

README facts:

- Core endpoints: Search, Scrape, Interact.
- Additional capabilities: Agent, Crawl, Map, Batch Scrape.
- Quick start examples exist for Python, Node.js, cURL, and CLI.
- Firecrawl is open source and can be used as a hosted service.

Useful article angle:

Write this as "web data pipeline for agents" rather than a generic crawler intro. The interesting change is that web pages, local documents, search results, highlighted evidence, and video links can all become cleaner agent inputs. Include a practical checklist: when to use search, scrape, parse, interact, question, and highlights.
