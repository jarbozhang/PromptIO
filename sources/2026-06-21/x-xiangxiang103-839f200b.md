---
title: >-
  OpenAI Codex 的开发者 Guinness Chen 最近发了一条推，兴奋地宣布了 Codex 的一个超级实用新功能——线程无缝迁移（Thread
  Migration）。 简单说，现在你可以在笔记本电脑上用 Codex 写代码、调试、跑任务。工作到一半要出门，或者笔记本性能不够了，你只要告诉
  Codex：“帮我把当前会话移到远程服务器去。” Cod
source: X @xiangxiang103
url: 'https://x.com/xiangxiang103/status/2068111165113409888'
date: 'Fri Jun 19 23:18:20 +0000 2026'
likes: 286
reposts: 32
replies: 41
source_type: x
language: zh
account_name: xiangxiang103
fetched_at: '2026-06-21T03:20:30.458Z'
---
OpenAI Codex 的开发者 Guinness Chen 最近发了一条推，兴奋地宣布了 Codex 的一个超级实用新功能——线程无缝迁移（Thread Migration）。

简单说，现在你可以在笔记本电脑上用 Codex 写代码、调试、跑任务。工作到一半要出门，或者笔记本性能不够了，你只要告诉 Codex：“帮我把当前会话移到远程服务器去。”

Codex 就会自动把整个工作线程（包括代码、Git 状态、所有未提交的改动、甚至正在跑的进程）打包好，干净利落地搬到远程主机上继续运行。你完全不用手动拷贝文件、配置环境、git push/pull 这些麻烦事。
等你回家或者想换回本地时，再让 Codex 把线程“接回来”就行了，状态完全保持一致。

视频演示里能看到：Codex 自己创建独立的工作目录、复制文件、同步 Git、验证环境，整个过程几乎全自动，像有个 invisible 的 AI 助理在帮你搬家一样顺滑。

这个功能对经常在本地和服务器之间切换、或者通勤路上还想让代码继续跑的人来说，简直太香了。基本把远程开发的割裂感给抹平了。
