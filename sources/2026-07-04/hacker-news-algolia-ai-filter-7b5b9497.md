---
title: AI coding is a nightmare. Am I the only one experiencing this?
url: 'https://news.ycombinator.com/item?id=48770319'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-07-03T03:18:42.000Z'
fetched_at: '2026-07-03T23:01:06.298Z'
---
Here are my biggest gripes with AI coding assistants right now:
Obsessed with reinventing the wheel. You'll often find it writing three duplicate functions for the exact same feature in a single file. Why? Because it's terrified of blowing up the context window, so it only reads a fraction of a large file and completely misses the existing functionality.
Why are files so bloated in the first place? Because AI prefers adding new code over modifying existing code, and it rarely deletes anything. After a few iterations, your codebase becomes a mountain of dead code.
Zero holistic awareness. It hyper-focuses on the current task and couldn't care less if its changes break other parts of the system. If you point out that the original logic is now broken, it treats it as a brand-new task. It’ll fix that specific bug, but whether its newly written code still works after the fix? "Not my problem."
The context window is painfully short. If you try to solve the issues above by dumping all the necessary context into the prompt, you'll hit the 200k token limit in no time. After just two more turns, it triggers auto-compacting, and suddenly it turns back into an idiot.
Long context = instant brain damage. Just when you've painstakingly stuffed the perfect amount of context into the window, the model completely loses its mind. The longer the context, the more incoherent its responses become.
Logical reasoning is practically non-existent. A simple feature that would take a human dev 3-5 lines of code to tweak in an existing function? The AI will insist on designing an entirely new system architecture for it.
The more you tune it, the dumber it gets. You burn through millions of tokens, and every time it replies with "I understand!" or "I've got it completely!", the code it spits out still refuses to run.
Comments URL: https://news.ycombinator.com/item?id=48770319
Points: 58
# Comments: 48
