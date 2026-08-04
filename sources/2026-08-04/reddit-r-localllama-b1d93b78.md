---
title: >-
  The Chinese labs everyone lumps together are making four pretty different
  bets. I work at one of them.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1veipya/the_chinese_labs_everyone_lumps_together_are/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T16:42:42.000Z'
fetched_at: '2026-08-04T11:01:38.796Z'
---
Every time a model drops from a Chinese lab the thread fills with people who already know who made it, and the guess is usually Alibaba. There was a thread here recently asking what separates the open source labs from the frontier labs. It ran to nearly sixty comments and hardly anyone in it separated out the labs on the open source side. They aren't one bloc and haven't been for a while.
 I work on the Ling models at Ant, so I'm one of the ones getting lumped in. Discount the paragraph about my own employer accordingly.
 Qwen's bet is distribution. Alibaba ships in every size class and every quantization with day one support in most runtimes, and the result is that a lot of the fine-tunes people build start from a Qwen base. DeepSeek is betting on architecture instead, publishing the paper and the weights the same day and letting the design do the arguing. Moonshot looks like it's playing a longer horizon, willing to look odd for a release cycle if the thing pays off two cycles later. (Zhipu, MiniMax and StepFun are each their own thing again, but four is enough to make the point.)
 Ant's bet, since I should be specific about my own: serving cost. Ant runs payments, and it's a separate company from Alibaba, which is the mix-up I see most often. The model I work on, Ling-3.0-flash, is 124B total parameters with roughly 5.1B active per token, KDA plus MLA hybrid attention, 262k context. That is a design for running a lot of long agent loops cheaply. It is not a design for topping a leaderboard, and I don't think we'd claim it is.
 The part of our own version I'd criticize is the release order. We announced first and are opening weights after. SGLang had support on day one, vLLM is waiting on the weights, llama.cpp is still an open PR. DeepSeek would have dropped the weights first and let the serving stack catch up. Ours is the safer sequencing for an infra team and it costs us the goodwill of exactly the people who would otherwise be running it at home.
 So the thing
