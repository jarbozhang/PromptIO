---
title: 'Show HN: Palmier Pro – Open-source macOS video editor built for AI'
url: 'https://github.com/palmier-io/palmier-pro'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-07-23T15:11:37.000Z'
fetched_at: '2026-07-25T11:01:36.527Z'
---
Hi HN, we are Marcos and Harrison, cofounders of Palmier (https://palmier.io). We are building Palmier Pro, an open source macOS video editor, with built-in AI generation and a local MCP server that connects to your agent. Here are a few demos:
- Making some AI transitions: https://www.youtube.com/watch?v=hbM_-eR1GX4
- Multicam editing with Codex: https://www.youtube.com/watch?v=SjS2q2LT1q8
- Cutting long form clips into shorts: https://www.youtube.com/watch?v=PR66eN2ouuQ
We built Palmier Pro as an internal tool when we were making AI launch videos for other startups. The main problem it solved in the beginning was the back-and-forth between AI generation platform and video editor. The iteration loop was awkward: AI videos → download → import to editor → edit → realize we need to change the AI video → repeat. So we built a minimal video editor where we could let Claude generate AI videos inside the editor.
As we gave more and more tools to the agent, we wanted to push to see what else agents can do in the video editing space. So today, your Claude/Codex can:
- Manage projects inside Palmier Pro
- Import media from a public URL or filesystem to the project, and organize them in folders
- Search media (by embedding footages using SigLIP2 running locally)
- Edit the timeline (tracks/clips/keyframes operations)
- Generate images, videos, sound effects, captions, music
- Export videos
There are two ways for LLMs to interact with the editor: by connecting to the local MCP server, or using the in-app chat. Both use the same tools and APIs exposed by the video editor.
We have seen people using MCP server to connect to their own workflow to automate massive-scale video editing (e.g. given this same podcast style, replicate it with other footages that I have). We have also seen people using the in-app chat where it lives closer to the editor UI, with lower latency for faster iteration.
We don't believe that AI is going to replace human creativity (nor should it), but where it
