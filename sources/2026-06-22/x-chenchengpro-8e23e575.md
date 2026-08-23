---
title: >-
  AI 写代码比人审代码快太多，瓶颈早就从「produce diff」挪到了「validate diff」。no-mistakes 这个 Go
  工具的思路很巧：在你的仓库和真实远端之间塞一个本地裸仓库当「闸门」，你 push 到 no-mistakes 这个 remote 而不是
  origin（origin 永不被劫持，普通 push 照常），它就在一个一次性
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2063991395543859443'
date: 'Mon Jun 08 14:27:50 +0000 2026'
likes: 78
reposts: 14
replies: 45
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-06-22T04:16:31.212Z'
---
AI 写代码比人审代码快太多，瓶颈早就从「produce diff」挪到了「validate diff」。no-mistakes 这个 Go 工具的思路很巧：在你的仓库和真实远端之间塞一个本地裸仓库当「闸门」，你 push 到 no-mistakes 这个 remote 而不是 origin（origin 永不被劫持，普通 push 照常），它就在一个一次性 worktree 里跑一条固定九步流水线 intent→rebase→review→test→document→lint→push→pr→ci，全过了才转发上游并自动开干净 PR。

几个设计细节值得抄：push 全程不阻塞，hook 通知常驻 daemon 后立即退出，daemon 在隔离 worktree 里干活，完全不碰你的工作目录；顺序是刻意的——review 排在 test 前是为了让 agent 读没被改过的新代码，lint 压轴是免得对还会变的代码反复 churn。

最关键的是 finding 的三态 action：auto-fix 自动修、ask-user 暂停问人、no-op 仅提示；review 默认必须人工批准，其余默认允许 3 轮自动修。ask-user 专门留给「质疑你有意为之的设计选择」这种需要判断的事，而不是把删掉的逻辑硬塞回来。

还有三个入口同一条流水线：git push、TUI 向导、以及 /no-mistakes skill 让写代码的 agent 自己门控，底层都走输出 TOON 的非交互 axi 面。意图（intent）会从你本地 Claude Code/Codex/OpenCode 的 transcript 里推断，用来区分「有意为之」和「真 bug」降误报。Kill all the slop, raise clean PR——这句 slogan 配得上它的工程量。

https://t.co/I3Vwgq4ZLl
