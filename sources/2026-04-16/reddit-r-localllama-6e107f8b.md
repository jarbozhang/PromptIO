---
title: >-
  Can't keep up with Llama.cpp changes, made a n8n workflow to summarize it for
  me daily
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1smbpn6/cant_keep_up_with_llamacpp_changes_made_a_n8n/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T16:50:42.000Z'
fetched_at: '2026-04-16T06:06:04.167Z'
---
My kind of daily news sent to me via Discord
 https://preview.redd.it/prmris11vdvg1.png?width=684&format=png&auto=webp&s=0dcb00079362a38a29d981dd2f3a4e5143c8091f
 The N8N workflow (you could probably have Hermes or another agent do similar):
 { "nodes": [ { "parameters": { "rule": { "interval": [ { "triggerAtHour": 10 } ] } }, "id": "8fbb0e44-2d2b-45e5-8f46-1f95a04d88c4", "name": "Schedule Trigger", "type": "n8n-nodes-base.scheduleTrigger", "typeVersion": 1.1, "position": [ 0, 0 ] }, { "parameters": { "url": "https://api.github.com/repos/ggml-org/llama.cpp/releases", "sendHeaders": true, "headerParameters": { "parameters": [ { "name": "User-Agent", "value": "n8n-workflow-automation" } ] }, "options": {} }, "id": "729fbd1f-98c5-4ed7-8285-f396c8413b5c", "name": "Fetch GitHub Releases", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.1, "position": [ 224, 0 ] }, { "parameters": { "jsCode": "// Get all items from the previous node\nconst items = $input.all();\nconst twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);\n\n// Safely extract the JSON data depending on how n8n parsed the HTTP response\nconst releases = items.length === 1 && Array.isArray(items[0].json) \n ? items[0].json \n : items.map(item => item.json);\n\n// Filter releases from the last 24 hours\nconst recentReleases = releases.filter(release => {\n // Use published_at if available, otherwise fallback to created_at\n const releaseDate = new Date(release.published_at || release.created_at);\n return releaseDate > twentyFourHoursAgo;\n});\n\n// If no new releases, return an empty array to stop the workflow\nif (recentReleases.length === 0) {\n return []; \n}\n\n// Combine all release notes into a single Markdown string\nlet combinedNotes = recentReleases.map(r => {\n const title = r.name || r.tag_name || 'Update';\n const body = r.body || 'No release notes provided.';\n return `## ${title}\\n${body}`;\n}).join('\\n\\n---\\n\\n');\n\n// Output the final combined notes and the count for t
