---
title: 'Show HN: OneCLI – OSS credential gateway that keeps secrets out of AI agents'
url: 'https://github.com/onecli/onecli'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-07-23T15:42:40.000Z'
fetched_at: '2026-07-25T11:01:36.527Z'
---
hey HN, Jonathan and Guy here, creators of OneCLI (https://onecli.sh/). OneCLI is an open source vault for AI Agents.
Traditional vaults are used to store your secrets and, on demand, provide them to you all in a secure way, trusting the person to keep them safe. We figured that in the agent's world, this is not the case, as you don't know what happens with the secret after it's delivered to the agent, or where it was saved. Or maybe someone even manipulated them to hand them over...
From that understanding, we decided to build a network gateway that sits between your AI agents and the services they call. OneCLI matches the request by host/path, verifies the agent should have access, swaps the placeholder for the real credential, and forwards the request. 
the secrets set inside the OneCLI vault, encrypted on rest, or could fetch in realtime from your bitwarden / 1password wallets.
Demo - https://www.youtube.com/watch?v=5e5pbPEzZfY.
We started working on this by accident, even though our careers were in the security space. We were working on a devtool called ChartDB, an open-source DB tool. When OpenClaw took off back in January, we started using it to orchestrate agents on top of ChartDB. We quickly understood there is a big issue around auth. Agents need credentials to do real work, but to give them those secrets would not be the best idea. they keep them in their memory and also write them down to local files and their sessions as plain text. And we knew that agents can easily be fooled into giving up those API keys/secrets. So we needed some way to control the agent and stop prompt injections from tricking it into using its services for an attacker's benefit. Not providing the keys to the agent + adding alerts or human-in-the-loop for sensitive operations, in case someone manipulates the agent, and access logs are being audited.
We use it ourselves daily. My OpenClaw runs my day across Attio, Gmail, and my calendar, with human-in-the-loop approval on sensitive a
