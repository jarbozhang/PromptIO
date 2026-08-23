---
title: Added SearXNG and I don't even know what to say anymore.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uyjdfg/added_searxng_and_i_dont_even_know_what_to_say/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-16T23:45:42.000Z'
fetched_at: '2026-07-17T23:00:59.686Z'
---
I just have to show someone other than the guys at work who think I'm crazy. I've been working on this app since about early June of 2025 and while it has come a long way in its workspace tools, I had always only had basic web capability. But I saw some posts yet again recently about SearXNG so I just dove in early this week and added it directly (yes with ai help obviously) and its so useful.
 It is implemented as a sub-agent where the orchestrator/chat model calls the agent in the wrapper of a specific tool WebResearch. That then starts a sub-agent role which is 3.5 9B running on secondary gpu and it has only WebSearch and WebFetch and no other tools and uses SearXNG.
 It has rules and directions to follow and produces a markdown report that feeds back to the chat model. This is the same pattern I use for the other main spawn_agent tool as well, which has different roles etc. but is only available in Workspace mode. The reason I had to make a wrapper for this role is that Chat mode doesn't have access to spawn_agent and I wanted Chat mode to still be able to use webresearch which could safely live in its tool list. Anyhow it worked out so far. I don't know why I am blabbing about these insignificant details.
 This sounds corny but I still think its just an amazing time to be alive and I hope the world stops burning even though I am contributing to it.
    submitted by    /u/ionizing  
 [link]   [comments]
