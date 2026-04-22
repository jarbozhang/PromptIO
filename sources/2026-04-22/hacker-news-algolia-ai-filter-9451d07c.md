---
title: 'Show HN: Mediator.ai – Using Nash bargaining and LLMs to systematize fairness'
url: 'https://mediator.ai/'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-20T15:07:04.000Z'
fetched_at: '2026-04-22T08:06:37.490Z'
---
Eight years ago, my then-fiancée and I decided to get a prenup, so we hired a local mediator. The meetings were useful, but I felt there was no systematic process to produce a final agreement. So I started to think about this problem, and after a bit of research, I discovered the Nash bargaining solution.
Yet if John Nash had solved negotiation in the 1950s, why did it seem like nobody was using it today? The issue was that Nash's solution required that each party to the negotiation provide a "utility function", which could take a set of deal terms and produce a utility number. But even experts have trouble producing such functions for non-trivial negotiations.
A few years passed and LLMs appeared, and about a year ago I realized that while LLMs aren’t good at directly producing utility estimates, they are good at doing comparisons, and this can be used to estimate utilities of draft agreements.
This is the basis for Mediator.ai, which I soft-launched over the weekend. Be interviewed by an LLM to capture your preferences and then invite the other party or parties to do the same. These preferences are then used as the fitness function for a genetic algorithm to find an agreement all parties are likely to agree to.
An article with more technical detail: https://mediator.ai/blog/ai-negotiation-nash-bargaining/
Comments URL: https://news.ycombinator.com/item?id=47835411
Points: 147
# Comments: 74
