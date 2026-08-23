---
title: >-
  为了节约上下文 handoff 新开 Session，这在半年一年前是很好的实践，现在没太有必要，因为 codex 自己上下文压缩做的很好了，或者
  /compact 一下继续就足够了。 当然如果关系不大的任务，还是新开 Session 更好。 当然除此之外 handoff 还是适用于跨 Agent
  session 的，比如 Claude Code 里面没完成
source: X @dotey
url: 'https://x.com/dotey/status/2083620270959480931'
date: 'Sat Aug 01 18:25:59 +0000 2026'
likes: 88
reposts: 11
replies: 34
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-02T11:04:18.515Z'
---
为了节约上下文 handoff 新开 Session，这在半年一年前是很好的实践，现在没太有必要，因为 codex 自己上下文压缩做的很好了，或者 /compact 一下继续就足够了。

当然如果关系不大的任务，还是新开 Session 更好。

当然除此之外 handoff 还是适用于跨 Agent session 的，比如 Claude Code 里面没完成的 session 让 Codex 继续。

不过我更习惯于 Claude Code 里面用 Fable 5 写技术方案文档，然后反复 Review、修改后把文档交给 Codex，配合 /goal 让它按照文档执行推进。

当然设置好严格的验收标准也很有必要，否则它会偷懒。

之前一个迁移任务没有设置验收标准，它就给我交付了一个差强人意的，离我要求的还有比较大差距。（参考图1）

重新加上了验收标准：UI 界面像素要和原版完全一致，那么它每一步都会截图对比像素差异，直到完全一致（或者可以忽略的差异）
