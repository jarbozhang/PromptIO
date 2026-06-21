---
title: >-
  Giving a local agent web access without paid search/scrape APIs: SearXNG +
  Scrapling
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uam3iv/giving_a_local_agent_web_access_without_paid/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T03:36:50.000Z'
fetched_at: '2026-06-21T03:18:27.866Z'
---
I wanted web access for a local-first agent without reaching for Tavily, Serper, Firecrawl, etc.
 For this agent path, I wanted no paid API keys, a search service I control, and page extraction I can run myself.
 What I ended up with is two tools: web_search and web_extract. Nothing fancy. Mostly just wiring together good open-source pieces.
 1. Search -> SearXNG
 SearXNG is a self-hostable metasearch engine. I run it in Docker and point the agent at its JSON endpoint.
 The search call is roughly:
 text GET {SEARXNG_URL}/search?q=<query>&format=json&pageno=1 
 Then I cap the results and normalize them to: {title, url, description}
 description is just the SearXNG snippet. It is not page content.
 Config is basically:
 text SEARXNG_URL=http://localhost:8080 
 Gotchas:
  
Add json to search.formats in SearXNG settings.yml.
 Public SearXNG instances are usually a bad fit for programmatic use.
 SearXNG is search-only. Use extraction when the agent needs to read a page.
  
2. Extract -> Scrapling + Trafilatura
 Search snippets are not enough. The agent needs to read the actual page.
 For web_extract, I use Scrapling with two paths:
  
Fast path: Fetcher.get(url, impersonate="chrome"). No browser. Good for normal pages.
 Stealth path: if the fast path is empty, blocked, or challenge-looking, try a real headless browser:
  
python StealthyFetcher.fetch( url, headless=True, solve_cloudflare=True, block_webrtc=True, hide_canvas=True, ) 
 The stealth path is an attempt, not a guaranteed bypass. If the page still shows a CAPTCHA or Cloudflare wall, I mark the result as blocked/partial.
 Once I have HTML, Trafilatura turns it into Markdown with links and tables. Markdown is much easier for the model than raw HTML. I also keep a visible-text fallback for pages where Trafilatura under-extracts.
 Other pieces that mattered:
  
PDFs: PDF URLs go through pypdf.
 Challenge detection: CAPTCHA/security pages get flagged instead of treated as real content.
 SSRF guard: requested URLs an
