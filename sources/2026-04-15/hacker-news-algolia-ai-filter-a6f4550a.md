---
title: 'Show HN: Kontext CLI – Credential broker for AI coding agents in Go'
url: 'https://github.com/kontext-dev/kontext-cli'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-14T13:26:53.000Z'
fetched_at: '2026-04-15T02:21:19.779Z'
---
We built the Kontext CLI because AI coding agents need access to GitHub, Stripe, databases, and dozens of other services — and right now most teams handle this by copy-pasting long-lived API keys into .env files, or the actual chat interface, whilst hoping for the best.
The problem isn't just secret sprawl. It's that there's no lineage of access. You don't know which developer launched which agent, what it accessed, or whether it should have been allowed to. The moment you hand raw credentials to a process, you've lost the ability to enforce policy, audit access, or rotate without pain. The credential is the authorization, and that's fundamentally broken when autonomous agents are making hundreds of API calls per session.
Kontext takes a different approach. You declare what credentials a project needs in a .env.kontext file:
  GITHUB_TOKEN={{kontext:github}}
  STRIPE_KEY={{kontext:stripe}}
  LINEAR_TOKEN={{kontext:linear}}

The closest analogy is a Security Token Service (STS): you authenticate once, and the backend mints short-lived, scoped credentials on-the-fly — except unlike a classical STS, we hold the upstream secrets, so nothing long-lived ever reaches the agent. The backend holds your OAuth refresh tokens and API keys; the CLI never sees them. It gets back short-lived access tokens scoped to the session.
What the CLI captures for every tool call: what the agent tried to do, what happened, whether it was allowed, and who did it — attributed to a user, session, and org.
Install with one command: `brew install kontext-dev/tap/kontext`
The CLI is written in Go (~5ms hook overhead per tool call), uses ConnectRPC for backend communication, and stores auth in the system keyring. Works with Claude Code today, Codex support coming soon.
We're working on server-side policy enforcement next — the infrastructure for allow/deny decisions on every tool call is already wired, we just need to close the loop so tool calls can also be rejected.
We'd love feedback on the appr
