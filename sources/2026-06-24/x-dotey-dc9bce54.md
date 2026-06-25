---
title: >-
  今天发布了 Claude Tag，让 Claude 以同事的身份常驻 Slack 频道。团队成员在频道里 @Claude 就能分配任务，Claude
  会把任务拆成几个步骤，逐步完成后在 Slack 线程里交付结果。 目前以 research preview 形式提供，Claude Enterprise 和
  Team 客户可以使用。 跟之前 Slack 里给 
source: X @dotey
url: 'https://x.com/dotey/status/2069477417278730536'
date: 'Tue Jun 23 17:47:19 +0000 2026'
likes: 62
reposts: 6
replies: 26
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-24T01:30:02.656Z'
---
今天发布了 Claude Tag，让 Claude 以同事的身份常驻 Slack 频道。团队成员在频道里 @Claude 就能分配任务，Claude 会把任务拆成几个步骤，逐步完成后在 Slack 线程里交付结果。

目前以 research preview 形式提供，Claude Enterprise 和 Team 客户可以使用。

跟之前 Slack 里给 Claude 发私信或者在频道里临时呼叫不同，Claude Tag 有几个变化。

一是多人协作。

一个频道里只有一个 Claude 身份，所有人共享同一个对话上下文。你让 Claude 做了一半的事，同事可以接着往下聊，不用从头解释。

二是持续学习。

Claude 会持续关注频道里的对话，逐渐积累对团队工作的理解，不需要每次都重新交代背景。管理员可以授权它读取其他频道的信息，让它更快了解整个组织的情况。

三是主动干活。

开启 ambient 模式后，Claude 会主动推送它认为你需要知道的信息，跟进没人回复的线程，提醒被遗忘的任务。Anthropic Claude Code 产品负责人 Cat Wu 举了个例子：她把自己的 Claude Tag 连上了 Gmail，Claude 会自动读邮件，遇到重要邮件就在 Slack 里通知她。

权限控制方面，管理员可以精确指定每个频道的 Claude 能访问哪些工具和数据。法务频道的 Claude 不会把信息带到工程频道，也不会让工程师接触到法务数据。

Anthropic 自己已经是重度用户。目前产品团队 65% 的代码由内部版 Claude Tag 生成。用途也不限于写代码，团队还用它查产品数据、处理客服工单、排查疑难 bug。

Claude Tag 会替换现有的 Claude in Slack 应用，管理员有 30 天的迁移窗口。Anthropic 会给符合条件的企业和团队账户发放体验额度。底层模型用的是 Opus 4.8。
