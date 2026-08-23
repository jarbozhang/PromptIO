---
title: Vibe Coding / Agentic workflow
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uk57mi/vibe_coding_agentic_workflow/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T23:30:03.000Z'
fetched_at: '2026-07-01T23:02:00.949Z'
---
Hey folks. I know that vibe coding is frowned upon pretty solidly here, and I get that, but I’m not a programmer. I just don’t realistically have the time to learn python or C++ to the level I would need to to build some of the things I’d like to create.
 On a side note, I do believe that coding through natural language will be the inevitable outcome of AI adoption and through growth in the field as models get stronger.
 My question is, what sort of workflows can you use to successfully vibe-code, using something like Qwen 27B Q8_0 and 128k context? I’ve tried a lot of different things.
 My current workflow tends to be something like this: I give the LLM a plan, let’s say for example a three.js stack game. I create a very in-depth plan regarding the scope of the game, including structure, mechanics, scope. like a 6-8 paragraph document including lists and sub lists, just how I would organize a project myself. I let the LLM create a more granular version of the plan that includes the entire file and directory structure, technical details on how to achieve the plan’s goals, etc, and create a phase/task list that breaks down all the necessary building stages of the project.
 In my last example, I gave instructions to use config files with templates for game objects, that way the LLM could create the game code in a more horizontal way, where I can go behind and add depth with game objects through the configs. This has worked for me previously in a word-based TUI RPG I vibe coded. 
 As the workflow continues, I have the LLM complete the task list in pieces, with me baby sitting watching for loops, and prompting the model to update the task list and I start a new session once’s context starts getting too high.
 The issue is I’m getting really sub-par results. Like, in the initial first phase of a building, controls don’t work, and a couple sessions later the LLM can’t diagnose it’s own code to find the problem, for something in three.js. 
 I understand that some people wi
