---
title: >-
  The Mythos Preview "Safety" Gaslight: Anthropic is just hiding insane compute
  costs. Open models are already doing this.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgoy17/the_mythos_preview_safety_gaslight_anthropic_is/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T13:00:17.000Z'
fetched_at: '2026-04-10T00:43:27.393Z'
---
To save you from digging through their 244-page system card, I highly recommend checking out this video breakdown [Link:https://www.youtube.com/watch?v=PQsDXTPyxUg]—it perfectly breaks down why the "safety risk" excuse in my meme above is really just about astronomical compute costs.
 Anthropic is heavily pushing the narrative that Claude Mythos Preview is a god-tier model that is simply "too dangerous" to release because it can find zero-days in OpenBSD. But if you swipe to the second image (page 21 of their system doc), the illusion falls apart.
 They didn't just ask Mythos a question. They used uncensored checkpoints, stripped the guardrails, gave it extended thinking time, strapped it to domain-specific tools, and brute-forced it thousands of times at a massive compute cost (reportedly ~$50 per run). The single-shot probability of it finding a bug is likely fractions of a percent.
 This isn't a "dangerous" model; it's just an unscalable API cost wrapped in a PR campaign. We are already seeing this exact same agentic scaling in the open-source and local communities:
  
GLM-5.1: Z.ai’s latest open model is already pulling off 600+ iteration optimization loops locally via OpenClaw. It doesn't quit; it just keeps grinding.
 Kimi 2.5: Moonshot’s MoE model literally has an "agent swarm" mode that spins up 100 helper agents executing 1,500 parallel tool calls.
  
Even in the closed-source space, if you drop OpenAI's GPT-5.4 into the Codex app on the xhigh reasoning tier and let it run autonomously for 8+ hours with full codebase access, it is going to brute-force its way to 20 critical bugs while you sleep.
 Finding zero-days in 2026 is a factor of agentic tooling and massive compute budgets, not a magical leap in raw model intelligence. Don't let Anthropic's "extinction-level threat" marketing convince you that the open-source community is falling behind.
    submitted by    /u/GWGSYT  
 [link]   [comments]
