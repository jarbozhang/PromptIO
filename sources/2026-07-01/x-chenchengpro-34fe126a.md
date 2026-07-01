---
title: >-
  cobi 这篇《Agents Need a Diary》点破了 agent memory 一个被低估的失败模式：问题很少是"agent
  忘了一切"那么戏剧化，而是工作脉络断了。context window 满了、你切去别的任务、忘了让它写
  handoff，几小时后工作还在，但线索没了，像翻开一本被撕掉三页的笔记本。 他的解法是把 agent memory 当
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2070140030585356725'
date: 'Thu Jun 25 13:40:19 +0000 2026'
likes: 52
reposts: 5
replies: 20
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-30T23:13:50.320Z'
---
cobi 这篇《Agents Need a Diary》点破了 agent memory 一个被低估的失败模式：问题很少是"agent 忘了一切"那么戏剧化，而是工作脉络断了。context window 满了、你切去别的任务、忘了让它写 handoff，几小时后工作还在，但线索没了，像翻开一本被撕掉三页的笔记本。

他的解法是把 agent memory 当日记，而不是大脑。核心命令 /prepforreset 在 reset 前让 agent 停下来写结构化笔记：发生了什么、做了哪些决策、否决了哪些选项、改了哪些文件、跑了什么命令、什么坏了、还剩什么，并且明确区分哪些是真的 next step、哪些只是推断。agent 特别爱把模糊残留包装成自信的 todo list，好笔记不该假装每个 loose end 都是承诺。

落地是两份写进 Obsidian 的笔记：Daily Log 是天级视图，Session Log 是工作块级深度页（goal/decisions/alternatives/gotchas/artifacts/blockers/next actions）。他刻意不做 transcript dump，40000 tokens 的工具输出和半成品推理对未来的你毫无用处，保存一切很容易，写出有用那一页才难。

我觉得最有意思的是夜间 wikijanitor cron：专治那些你忘了运行命令、乱收尾的 session，它审查近期 sessions 做一次 consolidation pass，找到 gap 就标记 gap，而不是事后幻觉一份完美记录，有点像睡觉时"做梦"整理记忆（呼应 Garry Tan 的 GStack/GBrain dreaming）。

已开源 Agent Memory Wiki，三件套：obsidian + prepforreset + wikijanitor，本质就是 Markdown 加纪律。最后一句建议很实在：别一上来就建巨型 memory system，先让 agent 在忘掉刚发生的事之前，写好一条日记。
