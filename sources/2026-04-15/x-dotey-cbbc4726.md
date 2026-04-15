---
title: "Claude Code 新增 Routines 功能，把 AI 编程助手从“你问它答”升级成了“自动干活”。

简单说，Routines 就是一个预设好的 Claude Code 任务模板，你告诉它干"
source: "X @dotey"
url: "https://x.com/dotey/status/2044096713401778594"
date: "Tue Apr 14 16:53:28 +0000 2026"
likes: 97
reposts: 18
replies: 10
---

Claude Code 新增 Routines 功能，把 AI 编程助手从“你问它答”升级成了“自动干活”。

简单说，Routines 就是一个预设好的 Claude Code 任务模板，你告诉它干什么、给它接上代码仓库和外部工具，然后设定触发条件，它就能在 Anthropic 的云端自己跑起来，不需要你盯着电脑。

触发方式有三种。第一种是定时任务，比如每天早上九点自动整理 Issue 列表。第二种是 GitHub 事件触发，比如有人提了 PR 就自动跑一遍代码审查。第三种是 API 调用，你的监控系统报警了，直接把报警内容甩给它，它自己去查日志、定位问题、开修复 PR。

Anthropic 内部已经在用了。Claude Code 产品经理 Noah Zweben 说，他们团队用 GitHub 事件触发来做文档同步，每次代码合并到发布分支，Routines 自动生成对应的文档更新。

对开发者来说，这个功能的价值在于把那些重复性的工程杂活自动化了。以前你可能需要写 CI 脚本、配 GitHub Actions、再接个 Slack Bot，现在一个 Routine 就能串起来，而且它能调用你在 Claude 上连接的所有 MCP 服务，Slack、Linear、Google Drive 都行。

使用门槛不高，Pro、Max、Team、Enterprise 用户都能用。Routines 数量不限，但每天的运行次数有上限，超出后需要开启额外用量计费。

一个值得关注的细节：Routines 目前还在研究预览阶段（Research Preview），API 接口格式和限制随时可能调整。另外，Routine 执行的所有操作都以你的身份进行，提交代码用的是你的 GitHub 账号，发 Slack 消息用的也是你的账号，所以权限配置需要上点心。

对于已经在用 Claude Code 做日常开发的人，Routines 可能是目前最接近给自己配一个 AI 初级工程师的体验。你在写代码、开会、睡觉的时候，它在帮你做 Code Review、整理 Backlog、同步文档。
