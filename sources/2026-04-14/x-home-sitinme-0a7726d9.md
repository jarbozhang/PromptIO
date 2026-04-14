---
title: "Mac mini 真的很适合拿来当一个 24 小时在线的 AI 编程工作台。  我最近折腾了一个很顺手的方案：平时把 Claude Code 跑在家里的 Mac mini 上，出门之后直接用手机 SS"
source: "X home @sitinme"
url: "https://x.com/sitinme/status/2043531873381736805"
date: "Mon Apr 13 03:29:00 +0000 2026"
likes: 180
reposts: 34
replies: 13
---

Mac mini 真的很适合拿来当一个 24 小时在线的 AI 编程工作台。

我最近折腾了一个很顺手的方案：平时把 Claude Code 跑在家里的 Mac mini 上，出门之后直接用手机 SSH 连回去，接着原来的 session 继续干活。

这样就不是“回家再看”，而是真的随时随地都能给 AI 派活、看进度、补一句指令。

整套东西其实不复杂，核心就 3 个：SSH 终端、tmux、Tailscale。SSH 负责让手机连上 Mac，tmux 负责把会话保住，不怕断线，Tailscale 负责把手机和家里的电脑放进同一个私有网络里。这样哪怕人在外面，用 4G 也能直接连回自己的机器。

Mac 这边先把远程登录打开，再装个 tmux，开一个专门跑 Claude Code 的 session。

之后不管你手机断线、切后台，任务都还在 Mac mini 上继续跑。重新连上，tmux attach 一下就接回原来的进度，体验非常丝滑。

我自己用下来最大的感受就是：Mac mini 这种一直开机的小主机，真挺适合拿来当 AI 员工。你可以同时挂几个 session，分别跑不同项目，手机上随时看一眼，想到什么就补一句。以前“只能坐在电脑前写代码”，现在变成了“走到哪都能远程指挥 AI 干活”。

如果你手上刚好有一台 Mac mini，真的很值得试试这套玩法。成本不高，但一旦配好，会有一种自己的 AI 工作站终于真正跑起来了的感觉。
