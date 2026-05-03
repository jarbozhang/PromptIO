---
title: 'Show HN: Filling PDF forms with AI using client-side tool calling'
url: >-
  https://copilot.simplepdf.com/?share=a7d00ad073c75a75d493228e6ff7b11eb3f2d945b6175913e87898ec96ca8076&form=w9&lang=en
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-02T08:54:27.000Z'
fetched_at: '2026-05-03T12:56:06.234Z'
---
Hey HN!
I built SimplePDF Copilot: an AI assistant that can interact with the PDF editor. It fills fields, answers questions, focuses on a specific field, adds fields, deletes pages, and so on.
It's built on top of SimplePDF that I started 7 years ago, pioneering privacy-respecting client-side pdf editing, now used monthly by 200k+ people.
As for the privacy model: the PDF itself never leaves the browser. Parsing, rendering, and field detection all run client-side.
The text the model needs (and your messages) goes to whatever LLM you point at. By default that's our demo proxy (DeepSeek V4 Flash, rate-capped), but you can BYOK and point it at any cloud provider, or go fully local (I've been testing with LM Studio).
Unlike the existing "Chat with PDF" tools that only retrieve the text/OCR layer, Copilot can act on the PDF: filling fields, adding fields (detected client-side using CommonForms by Joe Barrow [1], jbarrow on HN with some post-processing heuristics I added on top), focusing on fields, deleting pages, and so on.
I built this because SimplePDF is mostly used by healthcare customers where document privacy is paramount, and I wanted an AI experience that didn't require shipping PII to a third party.
Stack is pretty standard:
- Tanstack Start
- AI SDK from Vercel
- Tailwind (I personally prefer CSS modules, I'm old-school but the goal since I open source it, I figured that Tailwind would be a better fit)
The more interesting part is the client-side tool calling: events are passed back and forth via iframe postMessage.
If you're not familiar with "tool calling" and "client-side tool calling", a quick primer:
Tool calling is what LLMs use to take actions. When Claude runs grep or ls, or hits an MCP server, those are tool calls.
Client-side tool calling means the intent to call a tool comes from the LLM, but the execution happens in the browser.
That matters for: speed, you can't go faster than client-to-client operations and also gives you the ability to limit th
