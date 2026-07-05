---
title: Using "applications" to make a smaller model more effective at bigger tasks.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unobl4/using_applications_to_make_a_smaller_model_more/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T00:26:43.000Z'
fetched_at: '2026-07-05T23:01:37.129Z'
---
deleted and reposted due to accidental inclusion of personal information in original post.
 Demo of an idea I had for my personal JARVIS, quickly put together with a vibe coded browser based display so I could easily see what the agent sees.
 Giving the agent a limited scope, a view similar to that of a dedicated application. It has a limited number of actions it can take inside of these applications, with a dedicated clipboard and scratch pad for carrying information between these views as they are removed from context (other than a reference to their existence and a tool to return to them) when they leave. So far I only have 2 of these applications made, one that is functionally a text-only web browser for the model, and the other which is an interface for controlling computer under the agent's system (like my PC).
 These applications (called workflows within the scripts) replace what used to be 20 different tools for the computer control app, and 3 tools for the web browsing app. The issue I was targeting with this was the tendency for the local models to fuck up URLs and other text that generally needs to be exact by creating menus that are navigated with a simple verb and a number (open 1, copy 2, etc).
 The agent can open as many as it needs, and each one holds a persistent state, so if it leaves one and comes back to it, it is left in exactly the state it left it in. It can leave these applications and return to a much more general mode where it has access to the remaining ~100 or so tools (not all available at once, requestable in groups).
 The task I gave it here was to find (what I expected to be) a rare part for my Project car the agent was designed to help me manage. It knows a good few sources for the harder to find parts from our past conversations, so it ended up picking one it knew likely had them for the search.
 This was designed specifically for use with gemma4 26b(unsloth QaT Q4_K_XL), but this test was run on gemma4 E4B(also unsloth QaT Q4_K_XL)
