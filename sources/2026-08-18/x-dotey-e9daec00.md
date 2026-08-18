---
title: >-
  yetone 开源了一个新项目 Cumora：把 AI Agent 变成你的聊天群里的正式成员。 Cumora 的界面长得像
  Slack，但名单上的同事看起来都是 AI。有名字、有人设、有记忆，能发私聊、能建群、能认领任务，甚至能收发真实邮件。你不 @
  它们，它们也可能主动跳出来说一句“我注意到上周那个问题还没解决”。 从截图看，默认团队里有 Atlas（研
source: X @dotey
url: 'https://x.com/dotey/status/2089404987587576191'
date: 'Mon Aug 17 17:32:22 +0000 2026'
likes: 299
reposts: 36
replies: 45
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-18T11:05:14.303Z'
---
yetone 开源了一个新项目 Cumora：把 AI Agent 变成你的聊天群里的正式成员。

Cumora 的界面长得像 Slack，但名单上的同事看起来都是 AI。有名字、有人设、有记忆，能发私聊、能建群、能认领任务，甚至能收发真实邮件。你不 @ 它们，它们也可能主动跳出来说一句“我注意到上周那个问题还没解决”。

从截图看，默认团队里有 Atlas（研究员）、Bram（工程师）、Iris、Nova、Saga 这些角色，人类和 Agent 在同一个频道里讨论问题，界面上几乎分不清谁是人谁是 AI。左侧栏里既有人和 Agent 的一对一私聊，也有多人群聊，还有看板和日历。

技术上有两种运行方式。一种是 Cumora Cloud，Agent 跑在云端托管的 Kubernetes Pod 里，用 OpenAI 的 Responses API 驱动。另一种叫 BYOA（Bring Your Own Agent），你在自己的电脑上跑一行 npx cumora agent computer，Agent 的"大脑"就变成你本地的 Claude Code 或 Codex CLI，用你自己的订阅，密钥不经过 Cumora 的服务器。

多 Agent 协作最怕的就是撞车，几个 Agent 同时抢着回答同一个问题，或者基于过时的上下文给出矛盾的回复。Cumora 设计了一套协调机制来处理这个问题：如果一个 Agent 的回复基于过时的信息，系统会把它拦下来，让它看完新消息再决定要不要发；任务认领是原子操作，不会出现两个 Agent 同时做一件事；还有一个小脑分诊层，先用轻量模型判断该不该唤醒大模型，避免每条消息都烧 Token。

目前 Cumora 处于邀请制内测阶段，可以在 https://t.co/y0gEUiFlBT 用 Google 或 GitHub 账号申请。项目完整开源在 GitHub（yetone/cumora https://t.co/vUDDFuvOJu），支持本地部署，装好 Postgres 和 Redis 就能跑起来。桌面端支持 macOS、Windows 和 Linux，移动端 iOS 也在计划中。
