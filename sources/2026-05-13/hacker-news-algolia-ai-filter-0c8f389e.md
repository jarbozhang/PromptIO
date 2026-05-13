---
title: 'Launch HN: Voker (YC S24) – Analytics for AI Agents'
url: 'https://voker.ai'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-12T15:45:20.000Z'
fetched_at: '2026-05-13T10:19:12.989Z'
---
Hey HN, we're Alex and Tyler, co-founders of Voker.ai (https://voker.ai/), an agent analytics platform for AI product teams. Voker gives full visibility into what users are asking of your agents, and whether your agents are delivering, without having to dig through logs. Our main product is a lightweight SDK that is LLM stack agnostic and purpose-built for agent products. (https://app.voker.ai/docs)
Agent Engineers and AI product teams don’t have the right level of visibility into agent performance in production, which results in bad user experiences, churn, and hundreds of hours wasted with spot checks to find and debug issues with agent configurations.
Demo: https://www.tella.tv/video/vid_cmoukcsk1000i07jgb4j65u67/vie...
We recently conducted a survey of YC Founders and 90%+ of respondents said that the only way they know if their Agents are failing users in production is by hearing complaints from customers. They push a prompt change hoping that it fixes the problem and doesn’t break something somewhere else, and the cycle repeats.
We saw tons of observability and evals products popping up to try to address these problems, but we still felt like something was missing in the agent monitoring stack. Obs is good for individual trace debugging but is only accessible to engineers. Evals are good for testing known issues, but don't give insights into trends that teams don’t expect, so engineers are always playing catch up. Traditional product analytics tools do a good job tracking clicks and pageviews across your product surface but weren’t built ground up for agent products. Knowing what users want out of agents, and whether the agent delivered requires specific conversational intelligence / unstructured data processing techniques.
We came up with the agent analytics primitives of Intents, Corrections, and Resolutions to describe something pretty much all conversational agents had in common: a user will always come to an agent with an intent, the user might have to co
