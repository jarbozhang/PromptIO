---
title: >-
  Long Review: Qwen 3.8 27B is VERY good at tapping into it's real-world
  knowledge. It's "overthinking" brings it to Sonnet level performance with the
  potential for Opus level results.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vqm51f/long_review_qwen_38_27b_is_very_good_at_tapping/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-17T08:09:40.000Z'
fetched_at: '2026-08-17T11:01:38.922Z'
---
Hi all! I finally just got around to testing out Qwen 3.8 27b. I'm using Unsloth's UD-Q8_K_XL quant as a sit-in replacement to Qwen 3.6 27b, same quant size. Wow -- this thing isn't messing around.
 I have many baseline test prompts to gauge the 'intelligence' and usability of the model, but a go-to one is asking it to do a 1:1 recreation of classic arcade games (like Galaga, Donkey Kong, Pac-Man, etc). I do this to see what little details it gets correct.
 I've tested this process on pretty much every model I could fit on my machine. In total, I have 3x 3090's and 1 Tesla P40 at my disposal, with 128gb of system memory. I've also tested on frontier models both in the webUI and across multiple harnesses.
 I've been using Qwen 3.6 primarily, and occasionally switching to Deepseek V4 Flash. Now I'm starting to feel like the ladder is not longer necessary.
 Originally in these games/tests, Qwen 3.6 would get the basics down (maybe a few fancy effects and animations) but it always felt about 75% there. It rarely posed technical issues, but little features and tiny details were either missing or 'half-ass' implemented. I had no problem further instructing it to add these and doing some 'hand-holding' for it. Overall though Qwen 3.6 super comparable to other models in it's weight class, but ultimately the precision was the best in the frontier models' results. With extra prompting and multi-shot planning phases (via a custom harness I have with prompts to kinda prompt it to think about the little details, then injecting key elements into a fresh session's prompt) I've managed to milk out smaller details that the model clearly had in it's internal knowledge, but forgot about it entirely for the relevant prompt.
 Qwen 3.8 thinks a LOT, but it draws out those tiny details and absolutely nails it after the fact. It makes it worth the wait and context usage, and it helps close the gap between local and proprietary models a LOT.
 Here's an example:
 Prompt: "Create a single pag
