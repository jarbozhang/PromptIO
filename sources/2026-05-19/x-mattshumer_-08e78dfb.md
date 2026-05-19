---
title: "With a few prompt tweaks/strategies, and a switch to Codex 5.5 instead of Opus 4.7, you can get MUCH"
source: "X @mattshumer_"
url: "https://x.com/mattshumer_/status/2056466424940376111"
date: "Mon May 18 20:06:17 +0000 2026"
likes: 50
reposts: 5
replies: 6
---

With a few prompt tweaks/strategies, and a switch to Codex 5.5 instead of Opus 4.7, you can get MUCH closer to the SUPERHOT design style.

This was a one-shot output! https://t.co/fIEP3eWi6i

---

Quoted tweet:

Ever since we launched windsurf, one of my internal evals for coding agents has been recreating the game SUPERHOT, a puzzle/action game where time only moves when you move.

It's the perfect test of tricky game mechanics, simple but beautiful art style, and balancing level design.

I have a robust prompt instructing the agent to make SUPERCOLD, and attach a reference image, and also allow 3 follow-up prompts that points out any mechnical issues.

When Sonnet 3.5 came out, it could barely generate the world at all.  Sonnet 3.7 and you could move around in the world, but it was still hilariously unplayable. Now, Opus 4.7 and it's playable, but still doesn't look great.

What's needed to get all the way there?
1. Visual taste: Given a reference image, models should be able to discern whether their final output matches the reference image style. Shading, character design, etc, models should be unsatisfied with their current output
2.  Stronger computer use: Frontier models somewhat attempt this, but agent should be able to play the entire level themselves, and iterate from there
3. Systems design: Complex projects are not yet written with scalable systems design as an experienced engineer would write it. This hinders the ability to create complex projects with a lot of moving parts.

We're rapidly accelerating AI progress, let's see where we land in 3 months!
