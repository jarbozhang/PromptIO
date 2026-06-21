---
title: Hugging Face Agentic Resource Discovery, let agents search for tools and skills
url: 'https://huggingface.co/blog/agentic-resource-discovery-launch'
source: Hugging Face official blog
source_type: rss
language: en
published: '2026-06-17T00:00:00Z'
fetched_at: '2026-06-21T03:45:00Z'
---
Hugging Face introduced Agentic Resource Discovery, shortened as ARD, as a discovery layer for agent capabilities. The article says MCP gives agents a standard way to call tools, Skills give agents a way to consume instructions, and A2A gives agents a way to call other agents. All three still assume the user already knows which tool, instruction or agent is needed.

Official blog facts:

- ARD is described as a draft open specification developed by contributors from Microsoft, Google, GoDaddy, Hugging Face and others.
- It defines how agents and tools are cataloged, indexed and searched across federated registries.
- The goal is for an agent to find capabilities at runtime instead of needing them pre-installed.
- ARD is not positioned as a product or marketplace. The article presents it as a shared standard that companies can implement independently.
- The article names the current problem as install-first, use-later. Developers hardcode MCP server URLs or manually connect services.
- Another weak fallback is dumping every available tool description into the model context window, which is limited by context budget and weak descriptions.
- ARD moves selection outside the model. Registries can index capabilities with publisher identity, representative queries, compliance attestations and tags.
- The specification defines a static manifest format called `ai-catalog.json` hosted at a well-known URL.
- The specification also defines a dynamic registry API at `POST /search` for live ranked discovery.
- Hugging Face Discover Tool is presented as a reference implementation of ARD.
- Hugging Face implementation provides search access to Skills, ML applications and MCP servers, using Hub semantic search over Spaces and agent-oriented metadata.
- Supported response media types include `application/ai-skill`, `application/mcp-server+json` and `application/vnd.huggingface.space+json`.

The useful writing angle is that agent ecosystems are moving from “manually install a fixed tool list” to “search for the capability when the task needs it”. This is a good checklist topic for teams designing MCP, Skills, tool registries or internal agent platforms.
